import React from 'react';
import { useParams, Link } from 'react-router';

export default function MonthlyLeaderboardPage() {
  const { year, month } = useParams<{ year: string; month: string }>();
  const currentYear = new Date().getFullYear();
  const currentMonth = new Date().getMonth() + 1;
  
  const monthNames = [
    "January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"
  ];
  
  const monthName = monthNames[parseInt(month || '1') - 1];
  
  // Mock data for demonstration
  const topProducts = [
    { id: 1, name: "Product A", votes: 425, category: "Software" },
    { id: 2, name: "Product B", votes: 382, category: "Hardware" },
    { id: 3, name: "Product C", votes: 279, category: "Design" },
    { id: 4, name: "Product D", votes: 254, category: "Productivity" },
    { id: 5, name: "Product E", votes: 221, category: "AI" },
  ];

  // Calculate previous and next month/year
  const getPreviousMonth = () => {
    let prevMonth = parseInt(month || '1') - 1;
    let prevYear = parseInt(year || '2023');
    
    if (prevMonth < 1) {
      prevMonth = 12;
      prevYear--;
    }
    
    return { month: prevMonth, year: prevYear };
  };
  
  const getNextMonth = () => {
    let nextMonth = parseInt(month || '1') + 1;
    let nextYear = parseInt(year || '2023');
    
    if (nextMonth > 12) {
      nextMonth = 1;
      nextYear++;
    }
    
    return { month: nextMonth, year: nextYear };
  };
  
  const prev = getPreviousMonth();
  const next = getNextMonth();
  
  // Check if next month is in the future
  const isNextMonthInFuture = 
    next.year > currentYear || 
    (next.year === currentYear && next.month > currentMonth);

  return (
    <div className="container mx-auto py-8">
      <div className="flex items-center mb-6">
        <Link to="/products/leaderboards" className="text-blue-600 hover:underline mr-4">
          ← Back to Leaderboards
        </Link>
        <h1 className="text-3xl font-bold">Monthly Leaderboard ({monthName} {year})</h1>
      </div>

      <div className="mb-6 flex space-x-4">
        <Link 
          to={`/products/leaderboards/monthly/${prev.year}/${prev.month}`}
          className="px-4 py-2 bg-gray-100 rounded hover:bg-gray-200"
        >
          Previous Month
        </Link>
        
        {!isNextMonthInFuture && (
          <Link 
            to={`/products/leaderboards/monthly/${next.year}/${next.month}`}
            className="px-4 py-2 bg-gray-100 rounded hover:bg-gray-200"
          >
            Next Month
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