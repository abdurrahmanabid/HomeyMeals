import { useLocation, useNavigate } from "react-router-dom";
import Taka from "../../components/Taka";

const CashMemo = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const checkoutData = location.state;

  if (!checkoutData) {
    navigate(-1); // Redirect back if no data is passed
    return null;
  }

  const { fullName, phoneNumber, shippingMethod, orderItems, totalPrice,price } =
    checkoutData;

  return (
    <div className="max-w-4xl mx-auto p-8 bg-gradient-to-br from-blue-50 to-white shadow-2xl rounded-2xl mt-10">
      <h1 className="text-3xl font-extrabold text-center mb-8 text-blue-600">
        Cash Memo
      </h1>

      {/* Customer Information */}
      <div className="mb-8">
        <h2 className="text-xl font-bold text-gray-800 mb-4">
          Customer Details
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          <p className="text-lg text-gray-700">
            <span className="font-medium text-gray-900">Name:</span> {fullName}
          </p>
          <p className="text-lg text-gray-700">
            <span className="font-medium text-gray-900">Phone:</span>{" "}
            {phoneNumber}
          </p>
          <p className="text-lg text-gray-700 col-span-full sm:col-span-1">
            <span className="font-medium text-gray-900">Shipping Method:</span>{" "}
            {shippingMethod}
          </p>
        </div>
      </div>

      {/* Order Items */}
      <div className="mb-8">
        <h2 className="text-xl font-bold text-gray-800 mb-4">Order Items</h2>
        <div className="space-y-4">
          {orderItems.map((item, index) => (
            <div
              key={item.id}
              className="flex items-center justify-between bg-white p-4 shadow-lg rounded-lg border border-gray-200"
            >
              <div className="flex items-start space-x-4">
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-20 h-20 object-cover rounded-lg border border-gray-200"
                />
                <div>
                  <p className="font-bold text-gray-900 text-lg">{item.name}</p>
                  <p className="text-gray-500 text-sm">{item.details}</p>
                  <p className="text-gray-600 text-sm">
                    <span className="font-medium">Category:</span>{" "}
                    {item.category}
                  </p>
                  <p className="text-gray-600 text-sm">
                    <span className="font-medium">Quantity:</span>{" "}
                    {item.quantity}
                  </p>
                </div>
              </div>
              <div>
              <p className="flex items-center text-lg font-semibold text-blue-600">
  <span className="text-sm font-normal"><Taka/></span>
  <span className="ml-1">{item.price}</span>
</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Total Price */}
      <div className="flex justify-between items-center border-t pt-6">
        <h3 className="text-2xl font-bold text-gray-800">Total:</h3>
        <p className="flex items-center text-2xl font-extrabold text-blue-600">
  <span className="text-base font-normal"><Taka/></span>
  <span className="ml-1">{totalPrice}</span>
</p>      </div>

      {/* Footer */}
      <div className="text-center mt-10">
        <p className="text-sm text-gray-500 italic">
          Thank you for choosing HomeyMeals!
        </p>
        <button
          onClick={() => navigate('/')}
          className="mt-4 px-6 py-2 bg-blue-600 text-white rounded-lg shadow-lg hover:bg-blue-700 transition"
        >
          Back to Home
        </button>
      </div>
    </div>
  );
};

export default CashMemo;
