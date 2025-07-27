import React from 'react';
import { Link } from 'react-router';

export default function CategoriesPage() {
  // Mock data for demonstration
  const categories = [
    { id: 'software', name: 'Software', count: 245, icon: '💻' },
    { id: 'hardware', name: 'Hardware', count: 182, icon: '🔌' },
    { id: 'design', name: 'Design', count: 156, icon: '🎨' },
    { id: 'productivity', name: 'Productivity', count: 134, icon: '⏱️' },
    { id: 'ai', name: 'AI', count: 121, icon: '🤖' },
    { id: 'mobile', name: 'Mobile', count: 98, icon: '📱' },
    { id: 'games', name: 'Games', count: 87, icon: '🎮' },
    { id: 'education', name: 'Education', count: 76, icon: '📚' },
    { id: 'health', name: 'Health', count: 65, icon: '🏥' },
    { id: 'finance', name: 'Finance', count: 54, icon: '💰' },
    { id: 'social', name: 'Social', count: 43, icon: '👥' },
    { id: 'developer-tools', name: 'Developer Tools', count: 32, icon: '🔧' },
  ];

  return (
    <div className="container mx-auto py-8">
      <h1 className="text-3xl font-bold mb-6">Product Categories</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {categories.map((category) => (
          <Link 
            key={category.id}
            to={`/products/categories/${category.id}`}
            className="block p-6 border rounded-lg shadow-sm hover:shadow-md transition-shadow"
          >
            <div className="flex items-center">
              <span className="text-3xl mr-4">{category.icon}</span>
              <div>
                <h2 className="text-xl font-semibold">{category.name}</h2>
                <p className="text-gray-600">{category.count} products</p>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}