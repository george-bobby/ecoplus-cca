"use client"; // ✅ Ensure it's a client component

import React, { useState } from 'react';
import { Search, Calendar } from 'lucide-react';
import { useRouter } from 'next/navigation'; // ✅ Use Next.js navigation

export function SearchBar() {
  const router = useRouter(); // ✅ Use Next.js `useRouter()`
  const [query, setQuery] = useState('');
  const [selectedDate, setSelectedDate] = useState('');
  const [selectedTime, setSelectedTime] = useState('');
  const [showDateTimePicker, setShowDateTimePicker] = useState(false);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (query.trim()) {
      const searchParams = new URLSearchParams();
      searchParams.set('location', query.trim());
      if (selectedDate) searchParams.set('date', selectedDate);
      if (selectedTime) searchParams.set('time', selectedTime);
      router.push(`/live?${searchParams.toString()}`); // ✅ Navigate using Next.js
    }
  };

  // Get today's date in YYYY-MM-DD format
  const today = new Date();
  const minDate = today.toISOString().split('T')[0];

  // Get date 1 year from now
  const maxDate = new Date();
  maxDate.setFullYear(maxDate.getFullYear() + 1);
  const maxDateString = maxDate.toISOString().split('T')[0];

  return (
    <form onSubmit={handleSearch} className="w-full max-w-2xl">
      <div className="space-y-2">
        <div className="relative">
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search climate data..."
            className="w-full px-6 py-4 rounded-lg bg-white bg-opacity-20 backdrop-blur-md text-white placeholder-gray-300 text-lg focus:outline-none focus:ring-2 focus:ring-green-500 pr-24"
          />
          <button
            type="button"
            onClick={() => setShowDateTimePicker(!showDateTimePicker)}
            className="absolute right-16 top-1/2 transform -translate-y-1/2 text-white p-3 hover:text-green-400 transition-colors"
          >
            <Calendar className="w-6 h-6" />
            <span className="sr-only">Toggle date and time</span>
          </button>
          <button
            type="submit"
            className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-green-500 text-white p-3 rounded-lg hover:bg-green-600 transition-colors"
          >
            <Search className="w-6 h-6" />
            <span className="sr-only">Search</span>
          </button>
        </div>

        {showDateTimePicker && (
          <div className="flex gap-2 animate-fadeIn">
            <div className="relative flex-1">
              <input
                type="date"
                value={selectedDate}
                onChange={(e) => setSelectedDate(e.target.value)}
                min={minDate}
                max={maxDateString}
                className="w-full px-4 py-2 rounded-lg bg-white bg-opacity-20 backdrop-blur-md text-white focus:outline-none focus:ring-2 focus:ring-green-500"
                style={{ colorScheme: 'dark' }}
              />
            </div>
            <div className="relative flex-1">
              <input
                type="time"
                value={selectedTime}
                onChange={(e) => setSelectedTime(e.target.value)}
                className="w-full px-4 py-2 rounded-lg bg-white bg-opacity-20 backdrop-blur-md text-white focus:outline-none focus:ring-2 focus:ring-green-500 dark-time-picker"
                style={{ colorScheme: 'dark' }}
              />
            </div>
          </div>
        )}
      </div>
    </form>
  );
}
