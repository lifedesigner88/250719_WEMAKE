import React from 'react';
import { useParams, Link } from 'react-router';

export default function CategoryPage() {
  const { category } = useParams<{ category: string }>();
  
  // Helper function to get category display name
  const getCategoryDisplayName = (categoryId: string) => {
    const categories: Record<string, { name: string, icon: string }> = {
      'software': { name: 'Software', icon: '💻' },
      'hardware': { name: 'Hardware', icon: '🔌' },
      'design': { name: 'Design', icon: '🎨' },
      'productivity': { name: 'Productivity', icon: '⏱️' },
      'ai': { name: 'AI', icon: '🤖' },
      'mobile': { name: 'Mobile', icon: '📱' },
      'games': { name: 'Games', icon: '🎮' },
      'education': { name: 'Education', icon: '📚' },
      'health': { name: 'Health', icon: '🏥' },
      'finance': { name: 'Finance', icon: '💰' },
      'social': { name: 'Social', icon: '👥' },
      'developer-tools': { name: 'Developer Tools', icon: '🔧' },
    };
    
    return categories[categoryId] || { name: categoryId, icon: '📦' };
  };
  
  const categoryInfo = getCategoryDisplayName(category || '');
  
  // Mock data for demonstration
  const products = [
    { id: 1, name: `${categoryInfo.name} Product A`, votes: 425, description: 'A great product in this category' },
    { id: 2, name: `${categoryInfo.name} Product B`, votes: 382, description: 'Another excellent product for your needs' },
    { id: 3, name: `${categoryInfo.name} Product C`, votes: 279, description: 'Innovative solution for common problems' },
    { id: 4, name: `${categoryInfo.name} Product D`, votes: 254, description: 'Cutting-edge technology with great UX' },
    { id: 5, name: `${categoryInfo.name} Product E`, votes: 221, description: 'Simple yet powerful tool for everyone' },
    { id: 6, name: `${categoryInfo.name} Product F`, votes: 198, description: 'Advanced features for professionals' },
  ];

  return (
    <div className="container mx-auto py-8">
      <div className="flex items-center mb-6">
        <Link to="/products/categories" className="text-blue-600 hover:underline mr-4">
          ← Back to Categories
        </Link>
        <div className="flex items-center">
          <span className="text-4xl mr-3">{categoryInfo.icon}</span>
          <h1 className="text-3xl font-bold">{categoryInfo.name} Products</h1>
        </div>
      </div>
      
      <div className="mb-8">
        <p className="text-gray-700">
          Browse the top products in the {categoryInfo.name} category. 
          Vote for your favorites or submit your own product.
        </p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {products.map((product) => (
          <div key={product.id} className="border rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow">
            <div className="p-6">
              <h2 className="text-xl font-semibold mb-2">{product.name}</h2>
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
    </div>
  );
}