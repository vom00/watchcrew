export default function Loading() {
  return (
    <div className="min-h-[70vh] flex flex-col items-center justify-center">
      <div className="flex items-center gap-3">
        <div className="w-3 h-3 rounded-full bg-[#00F0FF] animate-pulse" />
        <div className="w-3 h-3 rounded-full bg-[#00F0FF] animate-pulse [animation-delay:150ms]" />
        <div className="w-3 h-3 rounded-full bg-[#00F0FF] animate-pulse [animation-delay:300ms]" />
      </div>
      <p className="text-sm text-[rgba(200,202,216,0.5)] mt-4 font-[family-name:'Rajdhani'] uppercase tracking-wider">
        Loading...
      </p>
    </div>
  );
}
