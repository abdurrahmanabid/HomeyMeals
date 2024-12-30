import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Swal from 'sweetalert2';

const ForgotPassword = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState("");

  const handleForgotPassword = async () => {
    if (!email) {
      Swal.fire({
        title: 'Warning',
        text: 'Please enter your email address',
        icon: 'warning',
        confirmButtonColor: '#6366F1'
      });
      return;
    }

    setLoading(true);
    try {
      const response = await axios.post("http://localhost:8000/api/auth/forgot-password", { email });
      setMessage(response.data.message);
      setStatus("success");
      
      // Show success message
      Swal.fire({
        title: 'Success!',
        text: 'Password reset link has been sent to your email',
        icon: 'success',
        timer: 2500,
        timerProgressBar: true,
        showConfirmButton: false,
        customClass: {
          popup: 'animate__animated animate__fadeInDown'
        }
      }).then(() => {
        setEmail("");
      });
    } catch (error) {
      Swal.fire({
        title: 'Error!',
        text: error.response?.data?.message || 'Error sending reset email. Please try again.',
        icon: 'error',
        confirmButtonColor: '#6366F1',
        customClass: {
          popup: 'animate__animated animate__fadeInDown'
        }
      });
      setMessage("Error sending reset email. Please try again.");
      setStatus("error");
    }
    setLoading(false);
  };

  // Handle enter key press
  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleForgotPassword();
    }
  };

  return (
    <div className="min-h-[70vh] flex items-center justify-center">
      <div className="bg-white p-8 rounded-lg shadow-2xl w-full max-w-md mx-4 relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-purple-500 to-blue-500"></div>
        
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold text-gray-800 mb-2">Forgot Password?</h2>
          <p className="text-gray-600">No worries! Enter your email below to reset your password.</p>
        </div>

        <div className="space-y-6">
          <div>
            <label className="block text-gray-700 text-sm font-semibold mb-2" htmlFor="email">
              Email Address
            </label>
            <input
              id="email"
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              onKeyPress={handleKeyPress}
              className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:border-purple-500 focus:ring-2 focus:ring-purple-200 outline-none transition-all"
            />
          </div>

          <button
            onClick={handleForgotPassword}
            disabled={loading}
            className="w-full bg-gradient-to-r from-purple-500 to-blue-500 hover:from-purple-600 hover:to-blue-600 text-white font-semibold py-3 px-6 rounded-lg transform transition-all duration-300 hover:shadow-lg disabled:opacity-70"
          >
            {loading ? (
              <span className="inline-flex items-center">
                <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Processing...
              </span>
            ) : (
              "Send Reset Link"
            )}
          </button>

          <div className="text-center mt-6">
            <a href="/login" className="text-purple-600 hover:text-purple-700 font-medium">
              Back to Login
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ForgotPassword;