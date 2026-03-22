'use client';

import { cn } from '@/lib/utils';
import { Search, X } from 'lucide-react';

interface SearchBarProps {
  placeholder?: string;
  value: string;
  onChange: (value: string) => void;
  onSearch?: (value: string) => void;
}

export default function SearchBar({
  placeholder = 'Search anime...',
  value,
  onChange,
  onSearch,
}: SearchBarProps) {
  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && onSearch) {
      onSearch(value);
    }
  };

  return (
    <div className="relative group">
      {/* Search icon */}
      <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[rgba(200,202,216,0.5)] group-focus-within:text-[var(--accent-blue)] transition-colors duration-200" />

      {/* Input */}
      <input
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        onKeyDown={handleKeyDown}
        placeholder={placeholder}
        aria-label="Search"
        className={cn(
          'w-full pl-10 pr-9 py-2.5',
          'glass-input',
          'focus:border-[#00F0FF] focus:shadow-[0_0_0_2px_rgba(0,240,255,0.1),0_0_16px_rgba(0,240,255,0.08)]'
        )}
      />

      {/* Clear button */}
      {value && (
        <button
          onClick={() => onChange('')}
          aria-label="Clear search"
          className="absolute right-2 top-1/2 -translate-y-1/2 w-11 h-11 p-1.5 rounded-full flex items-center justify-center bg-[var(--glass-medium)] hover:bg-[var(--glass-heavy)] text-[#9899A8] hover:text-[rgba(200,202,216,0.8)] transition-all duration-200"
        >
          <X className="w-3 h-3" />
        </button>
      )}
    </div>
  );
}
