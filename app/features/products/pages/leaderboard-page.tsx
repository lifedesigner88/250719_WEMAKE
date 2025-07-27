import React from 'react';
import { Link } from 'react-router';

export default function LeaderboardPage() {
  const currentYear = new Date().getFullYear();
  const currentMonth = new Date().getMonth() + 1;
  const currentDay = new Date().getDate();
  const currentWeek = Math.ceil(new Date().getDate() / 7);

  return (
    <div className="container mx-auto py-8">
      <h1 className="text-3xl font-bold mb-6">Product Leaderboards</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        <div className="p-6 border rounded-lg shadow-sm">
          <h2 className="text-xl font-semibold mb-4">Time-based Leaderboards</h2>
          <ul className="space-y-2">
            <li>
              <Link to={`/products/leaderboards/yearly/${currentYear}`} className="text-blue-600 hover:underline">
                Yearly Leaderboard ({currentYear})
              </Link>
            </li>
            <li>
              <Link to={`/products/leaderboards/monthly/${currentYear}/${currentMonth}`} className="text-blue-600 hover:underline">
                Monthly Leaderboard ({currentMonth}/{currentYear})
              </Link>
            </li>
            <li>
              <Link to={`/products/leaderboards/weekly/${currentYear}/${currentWeek}`} className="text-blue-600 hover:underline">
                Weekly Leaderboard (Week {currentWeek}, {currentYear})
              </Link>
            </li>
            <li>
              <Link to={`/products/leaderboards/daily/${currentYear}/${currentMonth}/${currentDay}`} className="text-blue-600 hover:underline">
                Daily Leaderboard ({currentMonth}/{currentDay}/{currentYear})
              </Link>
            </li>
          </ul>
        </div>
        
        <div className="p-6 border rounded-lg shadow-sm">
          <h2 className="text-xl font-semibold mb-4">About Leaderboards</h2>
          <p className="text-gray-700">
            Our leaderboards showcase the most popular and trending products across different time periods.
            Products are ranked based on user engagement, votes, and other metrics.
          </p>
        </div>
      </div>
    </div>
  );
}