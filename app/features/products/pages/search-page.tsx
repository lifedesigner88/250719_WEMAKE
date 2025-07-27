import React, { useState } from 'react';
import { useSearchParams } from 'react-router';

export default function SearchPage() {
  const [searchParams, setSearchParams] = useSearchParams();
  const initialQuery = searchParams.get('q') || '';
  
  const [searchQuery, setSearchQuery] = useState(initialQuery);
  const [category, setCategory] = useState('all');
  const [sortBy, setSortBy] = useState('relevance');
  
  // Mock data for demonstration
  const categories = [
    { id: 'all', name: 'All Categories' },
    { id: 'software', name: 'Software' },
    { id: 'hardware', name: 'Hardware' },
    { id: 'design', name: 'Design' },
    { id: 'productivity', name: 'Productivity' },
    { id: 'ai', name: 'AI' },
  ];
  
  // Mock search results
  const searchResults = initialQuery ? [
    { id: 1, name: `Product with ${initialQuery}`, category: 'Software', votes: 425, description: `This product matches your search for "${initialQuery}"` },
    { id: 2, name: `${initialQuery} Tool`, category: 'Productivity', votes: 382, description: 'A powerful tool that matches your search criteria' },
    { id: 3, name: `${initialQuery} Solution`, category: 'AI', votes: 279, description: 'Innovative solution using the latest technology' },
    { id: 4, name: `${initialQuery} App`, category: 'Mobile', votes: 254, description: 'Mobile application with great features' },
    { id: 5, name: `${initialQuery} Platform`, category: 'Software', votes: 221, description: 'Comprehensive platform for all your needs' },
  ] : [];
  
  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    setSearchParams({ q: searchQuery });
  };

  return (
    <div className="container mx-auto py-8">
      <h1 className="text-3xl font-bold mb-6">Search Products</h1>
      
      <div className="mb-8">
        <form onSubmit={handleSearch} className="flex flex-col md:flex-row gap-4">
          <div className="flex-grow">
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search for products..."
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div className="flex gap-2">
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              {categories.map((cat) => (
                <option key={cat.id} value={cat.id}>{cat.name}</option>
              ))}
            </select>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="relevance">Relevance</option>
              <option value="newest">Newest</option>
              <option value="votes">Most Votes</option>
            </select>
            <button
              type="submit"
              className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              Search
            </button>
          </div>
        </form>
      </div>
      
      {initialQuery && (
        <div className="mb-4">
          <p className="text-gray-600">
            Showing results for "{initialQuery}" ({searchResults.length} results)
          </p>
        </div>
      )}
      
      {searchResults.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {searchResults.map((product) => (
            <div key={product.id} className="border rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow">
              <div className="p-6">
                <div className="flex justify-between items-start mb-2">
                  <h2 className="text-xl font-semibold">{product.name}</h2>
                  <span className="px-2 py-1 bg-gray-100 text-xs rounded">{product.category}</span>
                </div>
                <p className="text-gray-600 mb-4">{product.description}</p>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-500">{product.votes} votes</span>
                  <button className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700">
                    View Details
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : initialQuery ? (
        <div className="text-center py-12">
          <p className="text-xl text-gray-600">No results found for "{initialQuery}"</p>
          <p className="text-gray-500 mt-2">Try different keywords or browse categories instead</p>
        </div>
      ) : (
        <div className="text-center py-12">
          <p className="text-xl text-gray-600">Enter a search term to find products</p>
        </div>
      )}
    </div>
  );
}