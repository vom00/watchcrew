const { app, BrowserWindow, shell, dialog } = require('electron');
const { autoUpdater } = require('electron-updater');
const path = require('path');
const fs = require('fs');
const { fork } = require('child_process');
const http = require('http');

let mainWindow;
let serverProcess;
let splashWindow;
let updateWindow;
const PORT = 3000;
const isDev = !app.isPackaged;

// ---------------------------------------------------------------------------
// Load .env.local into process.env
// ---------------------------------------------------------------------------
function getAppRoot() {
  if (isDev) return path.join(__dirname, '..');
  // In production with asar, main.js is inside app.asar/electron/
  // so __dirname/.. = app.asar root (for reading files like .env.local)
  return path.join(__dirname, '..');
}

function getUnpackedRoot() {
  if (isDev) return path.join(__dirname, '..');
  // Unpacked files live in app.asar.unpacked/ (sibling of app.asar)
  const appRoot = path.join(__dirname, '..');
  return appRoot.replace('app.asar', 'app.asar.unpacked');
}

function loadEnvFile() {
  const appRoot = getAppRoot();
  // Check both app root and standalone dir for .env.local
  const envPath = fs.existsSync(path.join(appRoot, '.env.local'))
    ? path.join(appRoot, '.env.local')
    : path.join(appRoot, '.next', 'standalone', '.env.local');

  if (fs.existsSync(envPath)) {
    const content = fs.readFileSync(envPath, 'utf-8');
    for (const line of content.split('\n')) {
      const trimmed = line.trim();
      if (!trimmed || trimmed.startsWith('#')) continue;
      const eqIndex = trimmed.indexOf('=');
      if (eqIndex === -1) continue;
      const key = trimmed.slice(0, eqIndex).trim();
      const value = trimmed.slice(eqIndex + 1).trim();
      if (!process.env[key]) {
        process.env[key] = value;
      }
    }
    console.log('[WatchCrew] Loaded .env.local');
  } else {
    console.log('[WatchCrew] No .env.local found at', envPath);
  }
}

loadEnvFile();

// ---------------------------------------------------------------------------
// Splash / Loading Screen
// ---------------------------------------------------------------------------
function createSplashWindow() {
  splashWindow = new BrowserWindow({
    width: 400,
    height: 300,
    frame: false,
    transparent: true,
    resizable: false,
    alwaysOnTop: true,
    skipTaskbar: true,
    webPreferences: {
      nodeIntegration: false,
      contextIsolation: true,
    },
  });

  splashWindow.loadURL(`data:text/html;charset=utf-8,${encodeURIComponent(`
    <!DOCTYPE html>
    <html>
    <head>
      <style>
        * { margin: 0; padding: 0; box-sizing: border-box; }
        body {
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          height: 100vh;
          background: #06060B;
          border-radius: 16px;
          font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
          color: #ECEEF5;
          overflow: hidden;
          border: 1px solid rgba(255,255,255,0.06);
        }
        .title {
          font-size: 24px;
          font-weight: 700;
          letter-spacing: 3px;
          text-transform: uppercase;
          margin-bottom: 8px;
          color: #00F0FF;
        }
        .subtitle {
          font-size: 13px;
          color: #9899A8;
          margin-bottom: 30px;
        }
        .loader {
          width: 140px;
          height: 3px;
          background: rgba(255,255,255,0.06);
          border-radius: 3px;
          overflow: hidden;
        }
        .loader-bar {
          width: 40%;
          height: 100%;
          background: #00F0FF;
          border-radius: 3px;
          animation: loading 1.5s ease-in-out infinite;
        }
        @keyframes loading {
          0% { transform: translateX(-100%); }
          100% { transform: translateX(350%); }
        }
      </style>
    </head>
    <body>
      <div class="title">WatchCrew</div>
      <div class="subtitle">Starting up...</div>
      <div class="loader"><div class="loader-bar"></div></div>
    </body>
    </html>
  `)}`);
}

// ---------------------------------------------------------------------------
// Main Window
// ---------------------------------------------------------------------------
function createWindow() {
  const unpackedRoot = getUnpackedRoot();
  const iconPath = path.join(unpackedRoot, '.next', 'standalone', 'public', 'images', 'icon-512.png');

  mainWindow = new BrowserWindow({
    width: 1280,
    height: 800,
    minWidth: 900,
    minHeight: 600,
    title: 'WatchCrew',
    icon: iconPath,
    backgroundColor: '#06060B',
    titleBarStyle: process.platform === 'darwin' ? 'hiddenInset' : 'default',
    autoHideMenuBar: true,
    webPreferences: {
      nodeIntegration: false,
      contextIsolation: true,
    },
    show: false,
  });

  mainWindow.once('ready-to-show', () => {
    if (splashWindow && !splashWindow.isDestroyed()) {
      splashWindow.close();
      splashWindow = null;
    }
    mainWindow.show();
    mainWindow.focus();
  });

  // Allow Google OAuth popups inside the app window
  mainWindow.webContents.setWindowOpenHandler(({ url }) => {
    if (
      url.includes('accounts.google.com') ||
      url.includes('localhost') ||
      url.includes('127.0.0.1')
    ) {
      return { action: 'allow' };
    }
    if (url.startsWith('http')) {
      shell.openExternal(url);
    }
    return { action: 'deny' };
  });

  mainWindow.loadURL(`http://localhost:${PORT}`);

  mainWindow.webContents.on('did-fail-load', (_event, errorCode, _errorDesc, validatedURL) => {
    console.log(`[WatchCrew] Page failed to load: ${validatedURL} (code ${errorCode})`);
    setTimeout(() => {
      if (mainWindow && !mainWindow.isDestroyed()) {
        mainWindow.loadURL(`http://localhost:${PORT}`);
      }
    }, 2000);
  });

  // Auto-recover if a page loads without styles (broken state)
  mainWindow.webContents.on('did-finish-load', () => {
    if (mainWindow && !mainWindow.isDestroyed()) {
      mainWindow.webContents.executeJavaScript(`
        (function() {
          // Check if CSS loaded by looking for styled elements
          var body = document.body;
          var bg = window.getComputedStyle(body).backgroundColor;
          // If body has default white/transparent background, CSS didn't load
          if (bg === 'rgba(0, 0, 0, 0)' || bg === 'rgb(255, 255, 255)') {
            console.log('[WatchCrew] Detected unstyled page, reloading...');
            setTimeout(function() { window.location.reload(); }, 1000);
          }
        })();
      `).catch(() => {});
    }
  });

  mainWindow.on('closed', () => {
    mainWindow = null;
  });
}

// ---------------------------------------------------------------------------
// Wait for server to respond
// ---------------------------------------------------------------------------
function waitForServer(maxAttempts = 60) {
  return new Promise((resolve, reject) => {
    let attempts = 0;

    function check() {
      attempts++;
      const req = http.get(`http://localhost:${PORT}`, (res) => {
        resolve();
      });

      req.on('error', () => {
        if (attempts >= maxAttempts) {
          reject(new Error('Server did not start in time'));
          return;
        }
        setTimeout(check, 500);
      });

      req.end();
    }

    check();
  });
}

// ---------------------------------------------------------------------------
// Start Next.js Server
// ---------------------------------------------------------------------------
function startNextServer() {
  return new Promise((resolve, reject) => {
    if (isDev) {
      // Dev mode: assume `next dev` is already running
      waitForServer()
        .then(resolve)
        .catch(() => {
          console.error('Dev server not running. Start it with: npm run dev');
          reject(new Error('Dev server not running'));
        });
      return;
    }

    // Production: run the standalone server.js
    // With asar, standalone files are unpacked to app.asar.unpacked/
    const unpackedRoot = getUnpackedRoot();
    const standaloneDir = path.join(unpackedRoot, '.next', 'standalone');
    const serverScript = path.join(standaloneDir, 'server.js');

    console.log('[WatchCrew] Starting Next.js server...');
    console.log('[WatchCrew] Server script:', serverScript);
    console.log('[WatchCrew] Standalone dir:', standaloneDir);

    // Use fork() which spawns a new Node.js process
    // cwd must be the standalone dir where public/ and .next/static/ live
    serverProcess = fork(serverScript, [], {
      cwd: standaloneDir,
      env: {
        ...process.env,
        NODE_ENV: 'production',
        PORT: String(PORT),
        HOSTNAME: 'localhost',
      },
      stdio: 'pipe',
    });

    serverProcess.stdout.on('data', (data) => {
      console.log(`[Next.js] ${data}`);
    });

    serverProcess.stderr.on('data', (data) => {
      console.error(`[Next.js] ${data}`);
    });

    serverProcess.on('error', (err) => {
      console.error('[WatchCrew] Failed to start server:', err);
      reject(err);
    });

    serverProcess.on('exit', (code) => {
      if (code !== 0 && code !== null) {
        console.error(`[WatchCrew] Server exited with code ${code}`);
      }
    });

    // Wait for server to be ready
    waitForServer()
      .then(() => {
        console.log('[WatchCrew] Server is ready!');
        resolve();
      })
      .catch(reject);
  });
}

// ---------------------------------------------------------------------------
// App Lifecycle
// ---------------------------------------------------------------------------
app.whenReady().then(async () => {
  createSplashWindow();

  try {
    await startNextServer();
    createWindow();

    // Check for updates after window is shown (only in production)
    if (!isDev) {
      autoUpdater.autoDownload = false;
      autoUpdater.checkForUpdates().catch(() => {});

      autoUpdater.on('update-available', (info) => {
        dialog
          .showMessageBox(mainWindow, {
            type: 'info',
            title: 'Update Available',
            message: `WatchCrew v${info.version} is available. Download now?`,
            buttons: ['Download', 'Later'],
            defaultId: 0,
          })
          .then(({ response }) => {
            if (response === 0) {
              // Show progress window
              updateWindow = new BrowserWindow({
                width: 400,
                height: 180,
                frame: false,
                transparent: true,
                resizable: false,
                alwaysOnTop: true,
                parent: mainWindow,
                modal: true,
                webPreferences: {
                  nodeIntegration: false,
                  contextIsolation: true,
                },
              });

              updateWindow.loadURL(`data:text/html;charset=utf-8,${encodeURIComponent(`
                <!DOCTYPE html>
                <html>
                <head>
                  <style>
                    * { margin: 0; padding: 0; box-sizing: border-box; }
                    body {
                      display: flex;
                      flex-direction: column;
                      align-items: center;
                      justify-content: center;
                      height: 100vh;
                      background: #0C0C14;
                      border-radius: 16px;
                      font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
                      color: #ECEEF5;
                      overflow: hidden;
                      border: 1px solid rgba(255,255,255,0.06);
                      padding: 24px;
                    }
                    .title {
                      font-size: 16px;
                      font-weight: 600;
                      margin-bottom: 6px;
                      color: #00F0FF;
                    }
                    .status {
                      font-size: 12px;
                      color: #9899A8;
                      margin-bottom: 16px;
                    }
                    .progress-track {
                      width: 100%;
                      height: 6px;
                      background: rgba(255,255,255,0.06);
                      border-radius: 6px;
                      overflow: hidden;
                      margin-bottom: 10px;
                    }
                    .progress-bar {
                      height: 100%;
                      background: linear-gradient(90deg, #00F0FF, #8B5CF6);
                      border-radius: 6px;
                      width: 0%;
                      transition: width 0.3s ease;
                    }
                    .percent {
                      font-size: 13px;
                      font-weight: 600;
                      color: #ECEEF5;
                      font-variant-numeric: tabular-nums;
                    }
                  </style>
                </head>
                <body>
                  <div class="title">Updating WatchCrew</div>
                  <div class="status" id="status">Downloading update...</div>
                  <div class="progress-track">
                    <div class="progress-bar" id="bar"></div>
                  </div>
                  <div class="percent" id="percent">0%</div>
                </body>
                </html>
              `)}`);

              autoUpdater.downloadUpdate();
            }
          });
      });

      autoUpdater.on('download-progress', (progress) => {
        const percent = Math.round(progress.percent);
        if (updateWindow && !updateWindow.isDestroyed()) {
          updateWindow.webContents.executeJavaScript(`
            document.getElementById('bar').style.width = '${percent}%';
            document.getElementById('percent').textContent = '${percent}%';
            document.getElementById('status').textContent = 'Downloading update... (${Math.round(progress.transferred / 1024 / 1024)}MB / ${Math.round(progress.total / 1024 / 1024)}MB)';
          `).catch(() => {});
        }
      });

      autoUpdater.on('update-downloaded', () => {
        if (updateWindow && !updateWindow.isDestroyed()) {
          updateWindow.close();
          updateWindow = null;
        }

        dialog
          .showMessageBox(mainWindow, {
            type: 'info',
            title: 'Update Ready',
            message: 'Update downloaded. WatchCrew will restart to install it.',
            buttons: ['Restart Now'],
            defaultId: 0,
          })
          .then(() => {
            autoUpdater.quitAndInstall();
          });
      });
    }
  } catch (err) {
    console.error('[WatchCrew] Fatal error:', err);
    if (splashWindow && !splashWindow.isDestroyed()) {
      splashWindow.close();
    }
    app.quit();
  }

  app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) {
      createWindow();
    }
  });
});

app.on('window-all-closed', () => {
  if (serverProcess) {
    serverProcess.kill();
  }
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.on('before-quit', () => {
  if (serverProcess) {
    serverProcess.kill();
  }
});
