import React from 'react';
import { useParams, Link } from 'react-router';

export default function YearlyLeaderboardPage() {
  const { year } = useParams<{ year: string }>();
  const currentYear = new Date().getFullYear();
  
  // Mock data for demonstration
  const topProducts = [
    { id: 1, name: "Product A", votes: 1245, category: "Software" },
    { id: 2, name: "Product B", votes: 982, category: "Hardware" },
    { id: 3, name: "Product C", votes: 879, category: "Design" },
    { id: 4, name: "Product D", votes: 754, category: "Productivity" },
    { id: 5, name: "Product E", votes: 621, category: "AI" },
  ];

  return (
    <div className="container mx-auto py-8">
      <div className="flex items-center mb-6">
        <Link to="/products/leaderboards" className="text-blue-600 hover:underline mr-4">
          ← Back to Leaderboards
        </Link>
        <h1 className="text-3xl font-bold">Yearly Leaderboard ({year})</h1>
      </div>

      <div className="mb-6 flex space-x-4">
        {parseInt(year || '0') > 2020 && (
          <Link 
            to={`/products/leaderboards/yearly/${parseInt(year || '0') - 1}`}
            className="px-4 py-2 bg-gray-100 rounded hover:bg-gray-200"
          >
            Previous Year
          </Link>
        )}
        
        {parseInt(year || '0') < currentYear && (
          <Link 
            to={`/products/leaderboards/yearly/${parseInt(year || '0') + 1}`}
            className="px-4 py-2 bg-gray-100 rounded hover:bg-gray-200"
          >
            Next Year
          </Link>
        )}
      </div>

      <div className="bg-white shadow-md rounded-lg overflow-hidden">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Rank</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Product</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Category</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Votes</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {topProducts.map((product, index) => (
              <tr key={product.id}>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{index + 1}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{product.name}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{product.category}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{product.votes}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}