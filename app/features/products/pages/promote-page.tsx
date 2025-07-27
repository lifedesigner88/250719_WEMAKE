import React, { useState } from 'react';
import { Link } from 'react-router';

export default function PromotePage() {
  const [selectedPlan, setSelectedPlan] = useState<string | null>(null);
  const [formData, setFormData] = useState({
    productName: '',
    productUrl: '',
    email: '',
    companyName: '',
    message: '',
    termsAccepted: false
  });
  
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  
  // Promotion plans
  const plans = [
    {
      id: 'basic',
      name: 'Basic',
      price: '$99',
      duration: '1 week',
      features: [
        'Featured in the sidebar',
        'Social media mention',
        'Basic analytics'
      ]
    },
    {
      id: 'standard',
      name: 'Standard',
      price: '$299',
      duration: '2 weeks',
      features: [
        'Featured at the top of homepage',
        'Social media campaign',
        'Newsletter mention',
        'Detailed analytics'
      ],
      recommended: true
    },
    {
      id: 'premium',
      name: 'Premium',
      price: '$599',
      duration: '1 month',
      features: [
        'Featured at the top of homepage',
        'Dedicated social media campaign',
        'Featured in newsletter',
        'Interview with founders',
        'Comprehensive analytics',
        'Feedback from our community'
      ]
    }
  ];
  
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
    
    // Clear error when field is edited
    if (errors[name]) {
      setErrors({
        ...errors,
        [name]: ''
      });
    }
  };
  
  const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, checked } = e.target;
    setFormData({
      ...formData,
      [name]: checked
    });
    
    // Clear error when field is edited
    if (errors[name]) {
      setErrors({
        ...errors,
        [name]: ''
      });
    }
  };
  
  const validateForm = () => {
    const newErrors: Record<string, string> = {};
    
    if (!selectedPlan) {
      newErrors.plan = 'Please select a promotion plan';
    }
    
    if (!formData.productName.trim()) {
      newErrors.productName = 'Product name is required';
    }
    
    if (!formData.productUrl.trim()) {
      newErrors.productUrl = 'Product URL is required';
    } else if (!/^https?:\/\/.+/.test(formData.productUrl)) {
      newErrors.productUrl = 'Please enter a valid URL starting with http:// or https://';
    }
    
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email address';
    }
    
    if (!formData.termsAccepted) {
      newErrors.termsAccepted = 'You must accept the terms and conditions';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (validateForm()) {
      setIsSubmitting(true);
      
      // Simulate API call
      setTimeout(() => {
        setIsSubmitting(false);
        setIsSubmitted(true);
      }, 1500);
    }
  };

  return (
    <div className="container mx-auto py-8">
      <h1 className="text-3xl font-bold mb-2">Promote Your Product</h1>
      <p className="text-gray-600 mb-8">
        Get your product in front of thousands of potential users and customers.
        Choose a promotion plan that fits your needs and budget.
      </p>
      
      {isSubmitted ? (
        <div className="bg-green-50 border border-green-200 rounded-lg p-6 mb-8">
          <h2 className="text-xl font-semibold text-green-800 mb-2">Thank you for your promotion request!</h2>
          <p className="text-green-700 mb-4">
            We've received your request to promote {formData.productName}. 
            Our team will review your submission and contact you at {formData.email} with next steps.
          </p>
          <div className="flex gap-4">
            <Link to="/products" className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700">
              Browse Products
            </Link>
            <button 
              onClick={() => {
                setIsSubmitted(false);
                setSelectedPlan(null);
                setFormData({
                  productName: '',
                  productUrl: '',
                  email: '',
                  companyName: '',
                  message: '',
                  termsAccepted: false
                });
              }} 
              className="px-4 py-2 bg-gray-100 text-gray-700 rounded hover:bg-gray-200"
            >
              Submit Another Request
            </button>
          </div>
        </div>
      ) : (
        <>
          <div className="mb-8">
            <h2 className="text-2xl font-semibold mb-6">Choose a Promotion Plan</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {plans.map((plan) => (
                <div 
                  key={plan.id}
                  className={`border rounded-lg p-6 transition-all ${
                    plan.recommended ? 'border-blue-500 shadow-md' : 'border-gray-200'
                  } ${selectedPlan === plan.id ? 'ring-2 ring-blue-500' : ''}`}
                >
                  {plan.recommended && (
                    <div className="bg-blue-500 text-white text-xs font-semibold px-3 py-1 rounded-full inline-block mb-2">
                      RECOMMENDED
                    </div>
                  )}
                  <h3 className="text-xl font-bold">{plan.name}</h3>
                  <div className="text-3xl font-bold my-4">{plan.price}</div>
                  <p className="text-gray-600 mb-4">Duration: {plan.duration}</p>
                  
                  <ul className="mb-6 space-y-2">
                    {plan.features.map((feature, index) => (
                      <li key={index} className="flex items-start">
                        <svg className="h-5 w-5 text-green-500 mr-2 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>
                  
                  <button
                    type="button"
                    onClick={() => setSelectedPlan(plan.id)}
                    className={`w-full py-2 rounded-lg transition-colors ${
                      selectedPlan === plan.id
                        ? 'bg-blue-600 text-white'
                        : 'bg-gray-100 text-gray-800 hover:bg-gray-200'
                    }`}
                  >
                    {selectedPlan === plan.id ? 'Selected' : 'Select Plan'}
                  </button>
                </div>
              ))}
            </div>
            
            {errors.plan && (
              <p className="text-red-500 text-sm mt-2">{errors.plan}</p>
            )}
          </div>
          
          <form onSubmit={handleSubmit} className="bg-white shadow-md rounded-lg p-6">
            <h2 className="text-2xl font-semibold mb-6">Your Information</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
              <div>
                <label className="block text-gray-700 font-medium mb-2" htmlFor="productName">
                  Product Name *
                </label>
                <input
                  type="text"
                  id="productName"
                  name="productName"
                  value={formData.productName}
                  onChange={handleInputChange}
                  className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                    errors.productName ? 'border-red-500' : 'border-gray-300'
                  }`}
                  placeholder="Enter your product name"
                />
                {errors.productName && <p className="text-red-500 text-sm mt-1">{errors.productName}</p>}
              </div>
              
              <div>
                <label className="block text-gray-700 font-medium mb-2" htmlFor="productUrl">
                  Product URL *
                </label>
                <input
                  type="text"
                  id="productUrl"
                  name="productUrl"
                  value={formData.productUrl}
                  onChange={handleInputChange}
                  className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                    errors.productUrl ? 'border-red-500' : 'border-gray-300'
                  }`}
                  placeholder="https://yourproduct.com"
                />
                {errors.productUrl && <p className="text-red-500 text-sm mt-1">{errors.productUrl}</p>}
              </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
              <div>
                <label className="block text-gray-700 font-medium mb-2" htmlFor="email">
                  Contact Email *
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                    errors.email ? 'border-red-500' : 'border-gray-300'
                  }`}
                  placeholder="your@email.com"
                />
                {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email}</p>}
              </div>
              
              <div>
                <label className="block text-gray-700 font-medium mb-2" htmlFor="companyName">
                  Company Name
                </label>
                <input
                  type="text"
                  id="companyName"
                  name="companyName"
                  value={formData.companyName}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Your company name (optional)"
                />
              </div>
            </div>
            
            <div className="mb-6">
              <label className="block text-gray-700 font-medium mb-2" htmlFor="message">
                Additional Information
              </label>
              <textarea
                id="message"
                name="message"
                value={formData.message}
                onChange={handleInputChange}
                rows={4}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Any specific requirements or information about your product"
              />
            </div>
            
            <div className="mb-6">
              <div className="flex items-start">
                <input
                  type="checkbox"
                  id="termsAccepted"
                  name="termsAccepted"
                  checked={formData.termsAccepted}
                  onChange={handleCheckboxChange}
                  className={`mt-1 ${errors.termsAccepted ? 'border-red-500' : ''}`}
                />
                <label className="ml-2 text-gray-700" htmlFor="termsAccepted">
                  I agree to the <a href="#" className="text-blue-600 hover:underline">Promotion Terms</a> and <a href="#" className="text-blue-600 hover:underline">Privacy Policy</a> *
                </label>
              </div>
              {errors.termsAccepted && <p className="text-red-500 text-sm mt-1">{errors.termsAccepted}</p>}
            </div>
            
            <div className="flex justify-end">
              <button
                type="submit"
                disabled={isSubmitting}
                className={`px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                  isSubmitting ? 'opacity-70 cursor-not-allowed' : ''
                }`}
              >
                {isSubmitting ? 'Processing...' : 'Submit Promotion Request'}
              </button>
            </div>
          </form>
        </>
      )}
    </div>
  );
}