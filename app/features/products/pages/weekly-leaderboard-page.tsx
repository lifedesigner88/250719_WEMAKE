import React from 'react';
import { useParams, Link } from 'react-router';

export default function WeeklyLeaderboardPage() {
  const { year, week } = useParams<{ year: string; week: string }>();
  const currentDate = new Date();
  const currentYear = currentDate.getFullYear();
  const currentWeek = Math.ceil(currentDate.getDate() / 7);
  
  // Mock data for demonstration
  const topProducts = [
    { id: 1, name: "Product A", votes: 225, category: "Software" },
    { id: 2, name: "Product B", votes: 198, category: "Hardware" },
    { id: 3, name: "Product C", votes: 179, category: "Design" },
    { id: 4, name: "Product D", votes: 154, category: "Productivity" },
    { id: 5, name: "Product E", votes: 142, category: "AI" },
  ];

  // Calculate previous and next week
  const getPreviousWeek = () => {
    let prevWeek = parseInt(week || '1') - 1;
    let prevYear = parseInt(year || '2023');
    
    if (prevWeek < 1) {
      prevWeek = 52; // Assuming 52 weeks in a year
      prevYear--;
    }
    
    return { week: prevWeek, year: prevYear };
  };
  
  const getNextWeek = () => {
    let nextWeek = parseInt(week || '1') + 1;
    let nextYear = parseInt(year || '2023');
    
    if (nextWeek > 52) { // Assuming 52 weeks in a year
      nextWeek = 1;
      nextYear++;
    }
    
    return { week: nextWeek, year: nextYear };
  };
  
  const prev = getPreviousWeek();
  const next = getNextWeek();
  
  // Check if next week is in the future
  const isNextWeekInFuture = 
    next.year > currentYear || 
    (next.year === currentYear && next.week > currentWeek);

  // Helper function to get the date range for the week
  const getWeekDateRange = (year: string, week: string) => {
    const yearNum = parseInt(year);
    const weekNum = parseInt(week);
    
    // Simple approximation - not accounting for exact ISO weeks
    const firstDayOfYear = new Date(yearNum, 0, 1);
    const dayOffset = (weekNum - 1) * 7;
    
    const startDate = new Date(yearNum, 0, 1 + dayOffset);
    const endDate = new Date(yearNum, 0, 7 + dayOffset);
    
    const formatDate = (date: Date) => {
      const month = date.toLocaleString('default', { month: 'short' });
      return `${month} ${date.getDate()}`;
    };
    
    return `${formatDate(startDate)} - ${formatDate(endDate)}`;
  };

  return (
    <div className="container mx-auto py-8">
      <div className="flex items-center mb-6">
        <Link to="/products/leaderboards" className="text-blue-600 hover:underline mr-4">
          ← Back to Leaderboards
        </Link>
        <h1 className="text-3xl font-bold">Weekly Leaderboard (Week {week}, {year})</h1>
      </div>
      
      <div className="text-gray-600 mb-4">
        {getWeekDateRange(year || '2023', week || '1')}
      </div>

      <div className="mb-6 flex space-x-4">
        <Link 
          to={`/products/leaderboards/weekly/${prev.year}/${prev.week}`}
          className="px-4 py-2 bg-gray-100 rounded hover:bg-gray-200"
        >
          Previous Week
        </Link>
        
        {!isNextWeekInFuture && (
          <Link 
            to={`/products/leaderboards/weekly/${next.year}/${next.week}`}
            className="px-4 py-2 bg-gray-100 rounded hover:bg-gray-200"
          >
            Next Week
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