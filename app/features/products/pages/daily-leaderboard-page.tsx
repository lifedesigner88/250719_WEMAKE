import React from 'react';
import { useParams, Link } from 'react-router';

export default function DailyLeaderboardPage() {
  const { year, month, day } = useParams<{ year: string; month: string; day: string }>();
  const currentDate = new Date();
  const currentYear = currentDate.getFullYear();
  const currentMonth = currentDate.getMonth() + 1;
  const currentDay = currentDate.getDate();
  
  const monthNames = [
    "January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"
  ];
  
  const monthName = monthNames[parseInt(month || '1') - 1];
  
  // Mock data for demonstration
  const topProducts = [
    { id: 1, name: "Product A", votes: 125, category: "Software" },
    { id: 2, name: "Product B", votes: 98, category: "Hardware" },
    { id: 3, name: "Product C", votes: 79, category: "Design" },
    { id: 4, name: "Product D", votes: 54, category: "Productivity" },
    { id: 5, name: "Product E", votes: 42, category: "AI" },
  ];

  // Calculate previous and next day
  const getPreviousDay = () => {
    const date = new Date(parseInt(year || '2023'), parseInt(month || '1') - 1, parseInt(day || '1'));
    date.setDate(date.getDate() - 1);
    return {
      year: date.getFullYear(),
      month: date.getMonth() + 1,
      day: date.getDate()
    };
  };
  
  const getNextDay = () => {
    const date = new Date(parseInt(year || '2023'), parseInt(month || '1') - 1, parseInt(day || '1'));
    date.setDate(date.getDate() + 1);
    return {
      year: date.getFullYear(),
      month: date.getMonth() + 1,
      day: date.getDate()
    };
  };
  
  const prev = getPreviousDay();
  const next = getNextDay();
  
  // Check if next day is in the future
  const isNextDayInFuture = 
    next.year > currentYear || 
    (next.year === currentYear && next.month > currentMonth) ||
    (next.year === currentYear && next.month === currentMonth && next.day > currentDay);

  return (
    <div className="container mx-auto py-8">
      <div className="flex items-center mb-6">
        <Link to="/products/leaderboards" className="text-blue-600 hover:underline mr-4">
          ← Back to Leaderboards
        </Link>
        <h1 className="text-3xl font-bold">Daily Leaderboard ({monthName} {day}, {year})</h1>
      </div>

      <div className="mb-6 flex space-x-4">
        <Link 
          to={`/products/leaderboards/daily/${prev.year}/${prev.month}/${prev.day}`}
          className="px-4 py-2 bg-gray-100 rounded hover:bg-gray-200"
        >
          Previous Day
        </Link>
        
        {!isNextDayInFuture && (
          <Link 
            to={`/products/leaderboards/daily/${next.year}/${next.month}/${next.day}`}
            className="px-4 py-2 bg-gray-100 rounded hover:bg-gray-200"
          >
            Next Day
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