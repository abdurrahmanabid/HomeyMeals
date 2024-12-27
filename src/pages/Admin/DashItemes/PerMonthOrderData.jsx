import React, { useState, useEffect } from 'react';

const PerMonthOrderData = () => {
  const [orderData, setOrderData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('http://localhost:8000/api/order/orders-by-month')
        const data = await response.json();
        setOrderData(data);
        setLoading(false);
      } catch (err) {
        setError('Failed to fetch data');
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) return (
    <div className="flex items-center justify-center p-8">
      <div className="text-lg text-gray-600">Loading...</div>
    </div>
  );

  if (error) return (
    <div className="flex items-center justify-center p-8">
      <div className="text-lg text-red-600">{error}</div>
    </div>
  );

  const maxOrders = Math.max(...orderData.map(item => item.totalOrders));
  const barHeight = 300; // Maximum height for bars in pixels

  return (
    <div className="w-full max-w-4xl mx-auto p-6">
      <div className="bg-white rounded-lg shadow-lg p-6">
        <h2 className="text-2xl font-bold mb-6 text-gray-800">Monthly Orders</h2>
        
        <div className="relative h-80">
          {/* Y-axis labels */}
          <div className="absolute left-0 h-full flex flex-col justify-between text-sm text-gray-600">
            {[...Array(6)].map((_, i) => (
              <span key={i} className="text-right w-8">
                {Math.round((maxOrders * (5 - i)) / 5)}
              </span>
            ))}
          </div>

          {/* Bars container */}
          <div className="ml-10 h-full flex items-end space-x-12">
            {orderData.map((item, index) => (
              <div key={index} className="flex flex-col items-center">
                <div 
                  className="w-16 bg-blue-500 hover:bg-blue-600 transition-all duration-300 rounded-t"
                  style={{
                    height: `${(item.totalOrders / maxOrders) * barHeight}px`,
                  }}
                >
                  <div className="text-white text-center -mt-6">
                    {item.totalOrders}
                  </div>
                </div>
                <div className="mt-2 text-sm text-gray-600">
                  {item.month}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default PerMonthOrderData;