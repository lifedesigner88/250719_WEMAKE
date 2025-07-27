import React from 'react';

export default function ProductsPage() {
  return (
    <div className="container mx-auto py-8">
      <h1 className="text-3xl font-bold mb-6">Products</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {/* Product listings will go here */}
        <p className="text-gray-500">Product listings will be displayed here</p>
      </div>
    </div>
  );
}