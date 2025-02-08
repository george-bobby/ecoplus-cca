"use client";

import React, { useState, useMemo } from "react";
import { Search } from "lucide-react";

const NewsPageClient = ({ initialFeeds }) => {
  const [activeTab, setActiveTab] = useState(0);
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 15; // Number of items per page

  // Combine all news items for global search
  const allNewsItems = useMemo(
    () =>
      initialFeeds.flatMap((feed) =>
        feed.items.map((item) => ({
          ...item,
          sourceName: feed.sourceName,
        }))
      ),
    [initialFeeds]
  );

  // Filter items based on search term
  const filteredItems = useMemo(() => {
    if (!searchTerm) return initialFeeds[activeTab].items;

    const lowercaseSearchTerm = searchTerm.toLowerCase();
    return initialFeeds[activeTab].items.filter(
      (item) =>
        item.title.toLowerCase().includes(lowercaseSearchTerm) ||
        (item.contentSnippet &&
          item.contentSnippet.toLowerCase().includes(lowercaseSearchTerm))
    );
  }, [searchTerm, activeTab, initialFeeds]);

  // Global search across all sources
  const globalFilteredItems = useMemo(() => {
    if (!searchTerm) return allNewsItems;

    const lowercaseSearchTerm = searchTerm.toLowerCase();
    return allNewsItems.filter(
      (item) =>
        item.title.toLowerCase().includes(lowercaseSearchTerm) ||
        (item.contentSnippet &&
          item.contentSnippet.toLowerCase().includes(lowercaseSearchTerm))
    );
  }, [searchTerm, allNewsItems]);

  // Pagination logic: slice the data for current page
  const paginatedItems = useMemo(() => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    return searchTerm
      ? globalFilteredItems.slice(startIndex, endIndex)
      : filteredItems.slice(startIndex, endIndex);
  }, [currentPage, searchTerm, globalFilteredItems, filteredItems]);

  // Handle empty or error cases for all sources
  if (initialFeeds.length === 0) {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center">
        <div className="w-full mx-4 my-8 p-6 bg-white rounded-lg shadow-lg">
          <h1 className="text-3xl font-bold text-center mb-4 text-white bg-green-800 rounded-md p-2">
            Climate Change & Carbon Footprint News
          </h1>
          <p className="text-center text-gray-600">
            No news available at the moment. Please try again later.
          </p>
        </div>
      </div>
    );
  }

  // Handle pagination controls
  const totalPages = Math.ceil(
    (searchTerm ? globalFilteredItems.length : filteredItems.length) /
      itemsPerPage
  );

  // Reset pagination when switching tabs or news sources
  const handleTabChange = (index) => {
    setActiveTab(index);
    setCurrentPage(1); // Reset pagination to the first page
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center">
      <div className="w-full mx-4 my-8 p-6 bg-white rounded-lg shadow-lg">
        <h1 className="text-3xl font-bold text-center mb-4 text-white bg-green-800 rounded-md p-2">
          Updates
        </h1>

        {/* Search Bar */}
        <div className="mb-6 relative">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <Search className="h-5 w-5 text-gray-400" />
          </div>
          <input
            type="text"
            placeholder="Search news across all sources..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
          />
        </div>

        {/* Tab Navigation with Horizontal Scrolling */}
        <div className="flex overflow-x-auto whitespace-nowrap bg-white p-2 border-b border-gray-300">
          {initialFeeds.map((feed, index) => (
            <button
              key={index}
              className={`px-4 py-2 whitespace-nowrap text-sm font-medium ${
                activeTab === index
                  ? "text-green-800 border-b-2 border-green-800"
                  : "text-gray-500 hover:text-gray-700"
              }`}
              onClick={() => handleTabChange(index)}
            >
              {feed.sourceName}
            </button>
          ))}
        </div>

        {/* Results Summary */}
        {searchTerm && (
          <div className="mb-4 text-gray-600">
            {globalFilteredItems.length} results found across all sources
          </div>
        )}

        {/* Tab Content */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {paginatedItems.map((item, index) => (
            <div
              key={index}
              className="bg-white rounded-lg shadow-xl overflow-hidden border border-gray-200 hover:shadow-2xl transform hover:scale-105 transition-all duration-300"
            >
              {item.enclosure?.url && (
                <img
                  src={item.enclosure.url}
                  alt={item.title}
                  className="w-full h-56 object-cover"
                />
              )}
              <div className="p-4">
                {searchTerm && (
                  <div className="text-xs text-gray-500 mb-1">
                    Source: {item.sourceName}
                  </div>
                )}
                <h2 className="text-xl font-semibold text-gray-800 mb-2">
                  {item.title}
                </h2>
                <p className="text-sm text-gray-600 mt-2">
                  {item.contentSnippet || "No description available."}
                </p>
                <a
                  href={item.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-block mt-4 text-sm text-green-800 hover:underline"
                >
                  Read More
                </a>
              </div>
            </div>
          ))}
        </div>

        {/* Pagination Controls */}
        <div className="mt-6 flex justify-between">
          <button
            onClick={() => setCurrentPage((page) => Math.max(page - 1, 1))}
            disabled={currentPage === 1}
            className="px-4 py-2 bg-green-800 text-white rounded-lg disabled:bg-gray-400"
          >
            Previous
          </button>
          <div className="text-sm text-gray-600">
            Page {currentPage} of {totalPages}
          </div>
          <button
            onClick={() =>
              setCurrentPage((page) => Math.min(page + 1, totalPages))
            }
            disabled={currentPage === totalPages}
            className="px-4 py-2 bg-green-800 text-white rounded-lg disabled:bg-gray-400"
          >
            Next
          </button>
        </div>

        {/* No Results State */}
        {searchTerm && globalFilteredItems.length === 0 && (
          <div className="text-center text-gray-600 mt-8">
            No news items found matching "{searchTerm}"
          </div>
        )}

        <div className="mt-8 text-center">
          <p className="text-sm text-gray-600">&copy; 2024 Climate News</p>
        </div>
      </div>
    </div>
  );
};

export default NewsPageClient;
