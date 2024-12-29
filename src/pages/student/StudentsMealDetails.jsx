import axios from "axios";
import { Alert, Badge, Button, Card, Spinner } from "flowbite-react";
import {
  Calendar,
  Info,
  Mail,
  MapPin,
  Minus,
  MoveDiagonal,
  Phone,
  Plus,
  Shield,
  ShoppingCart,
  Soup,
  Star,
  Timer,
  Truck,
  User,
} from "lucide-react";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Swal from "sweetalert2";
import HomeyMealsLoader from "../../components/HomeyMealsLoader";
import Taka from "../../components/Taka";
import { calculateDistance } from "../../functions/calculateDistance";
import calculateDistanceInTime from "../../functions/calculateDistanceInTime";
import useAuth from "../../utils/useAuth";

const Section = ({ title, icon: Icon, children }) => (
  <Card className="overflow-hidden">
    <div className="p-6">
      <div className="flex items-center gap-3 mb-6">
        <div className="p-2 bg-blue-50 rounded-lg">
          <Icon className="w-6 h-6 text-blue-600" />
        </div>
        <h2 className="text-2xl font-bold text-gray-900">{title}</h2>
      </div>
      {children}
    </div>
  </Card>
);

const InfoItem = ({ icon: Icon, label, value }) => (
  <div className="flex items-center gap-3 text-gray-600">
    <Icon className="w-5 h-5 text-blue-600" />
    <div>
      <div className="text-sm text-gray-500">{label}</div>
      <div className="font-medium text-gray-900">{value}</div>
    </div>
  </div>
);

const StudentMealDetails = () => {
  const navigate = useNavigate(); // Use React Router's navigation hook
  const { mealId } = useParams();
  const [meal, setMeal] = useState(null);
  const [loading, setLoading] = useState(true);
  const [loadingR, setLoadingR] = useState(true);
  const [error, setError] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [addingToCart, setAddingToCart] = useState(false);
  const [userProfile, setUserProfile] = useState(null);
  const [review, setReview] = useState();
  const user = useAuth();

  useEffect(() => {
    const fetchMeal = async () => {
      try {
        setLoading(true);
        const response = await axios.get(
          `http://localhost:8000/api/item/get-item/${mealId}`
        );

        setMeal(response.data);
        console.log("🚀 ~ fetchMeal ~ response.data:", response.data);
      } catch (err) {
        setError(err.response?.data?.message || "Failed to load meal details");
      } finally {
        setLoading(false);
      }
    };

    fetchMeal();
  }, [mealId]);

  useEffect(() => {
    const fetchMeal = async () => {
      try {
        setLoadingR(true);
        const reviewResponse = await axios.get(
          `http://localhost:8000/api/rating/item/${mealId}`
        );
        console.log(
          "🚀 ~ fetchMeal ~ reviewResponse.data:",
          reviewResponse.data.ratings
        );
        setReview(reviewResponse.data.ratings);
      } catch (err) {
        console.log("🚀 ~ fetchMeal ~ err:", err)
      } finally {
        setLoadingR(false);
      }
    };

    fetchMeal();
  }, [mealId]);
  useEffect(() => {
    const fetchUser = async () => {
      try {
        setLoading(true);
        const response = await axios.get(
          `http://localhost:8000/api/profile/get/${user.id}`
        );
        setUserProfile(response.data);
        console.log("🚀 ~ fetchUser ~ response.data:", response.data);
      } catch (err) {
        console.log(err);
      } finally {
      }
    };

    fetchUser();
  }, []);

  const calculatePrice = () => {
    if (!meal) return { final: 0, original: 0, discount: 0, saved: 0 };
    const final = meal.discountPrice || meal.price;
    const discount = meal.discountPrice
      ? (((meal.price - meal.discountPrice) / meal.price) * 100).toFixed(0)
      : 0;
    const saved = meal.discountPrice
      ? (meal.price - meal.discountPrice) * quantity
      : 0;
    return {
      final: final * quantity,
      original: meal.price * quantity,
      discount,
      saved,
    };
  };

  const handleAddToCart = () => {
    if (!userProfile?.profile.lat || !userProfile || !userProfile?.profile) {
      Swal.fire({
        title: "Profile Required",
        text: user
          ? "You need to complete your profile to add items to the cart."
          : "You need to login to add items to the cart.",
        icon: "warning",
        showCancelButton: true,
        confirmButtonText: user ? "Go to Profile" : "Login",
        cancelButtonText: "Cancel",
      }).then((result) => {
        if (result.isConfirmed) {
          user ? navigate("../profile") : navigate("/login");
        }
      });
      return;
    }

    setAddingToCart(true);
    try {
      const { final } = calculatePrice();
      new Promise((resolve) => setTimeout(resolve, 800));
      const cart = {
        mealId: mealId,
        userId: user.id,
        quantity,
        totalPrice: final,
      };
      console.log("Added to cart:", cart);
      const response = axios.post("http://localhost:8000/api/cart/add", cart);

      // Show success message
      Swal.fire({
        title: "Success",
        text: "Item has been added to the cart successfully!",
        icon: "success",
        confirmButtonText: "OK",
      });
    } catch (err) {
      setError("Failed to add item to cart");
    } finally {
      setAddingToCart(false);
    }
  };

  if (loading || loadingR) {
    return <HomeyMealsLoader />;
  }

  if (error) {
    return (
      <div className="min-h-screen p-4 flex items-center justify-center">
        <Alert color="failure" className="max-w-2xl">
          <div className="flex items-center gap-3">
            <Info className="w-6 h-6" />
            <span className="font-medium text-lg">{error}</span>
          </div>
        </Alert>
      </div>
    );
  }

  const { final, original, discount, saved } = calculatePrice();

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <div className="relative h-[40vh] overflow-hidden">
        <img
          src={meal?.imageBase64}
          alt={meal.itemName}
          className="w-full h-full object-cover transform hover:scale-105 transition-transform duration-700"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent" />
        <div className="absolute bottom-0 left-0 right-0 p-8 text-white">
          <div className="max-w-7xl mx-auto">
            <h1 className="text-5xl font-bold mb-4">{meal.itemName}</h1>
            {discount > 0 && (
              <Badge color="red" size="xl">
                {discount}% OFF
              </Badge>
            )}
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Left Column - Details */}
          <div className="lg:col-span-2 space-y-8">
            {/* Delivery Information */}
            <Section title="Delivery Information" icon={Truck}>
              <div className="space-y-4">
                {userProfile && userProfile.profile.lat ? (
                  <>
                    <InfoItem
                      icon={MoveDiagonal}
                      label={`Distance`}
                      value={
                        `Distance From You is ${calculateDistance(
                          userProfile.profile.lat,
                          userProfile.profile.lng,
                          meal.user.lat,
                          meal.user.lng
                        ).toFixed(3)}` + " km"
                      }
                    />
                    <InfoItem
                      icon={Timer}
                      label={`Delivery Time`}
                      value={calculateDistanceInTime(
                        calculateDistance(
                          userProfile.profile.lat,
                          userProfile.profile.lng,
                          meal.user.lat,
                          meal.user.lng
                        )
                      )}
                    />
                  </>
                ) : null}
                <InfoItem
                  icon={Shield}
                  label="Guarantee"
                  value="100% Satisfaction Guaranteed"
                />
                <InfoItem
                  icon={MapPin}
                  label="Delivery Area"
                  value={`${meal.user.upazilla}, ${meal.user.district}`}
                />
              </div>
            </Section>

            {/* Seller Information */}
            <Section title="Seller Information" icon={User}>
              <div className="space-y-6">
                <div className="flex items-center gap-4">
                  <div>
                    <h3 className="text-xl font-semibold">
                      {meal.user.fullName}
                    </h3>
                    <p className="text-gray-600">{meal.user.description}</p>
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-4">
                  <InfoItem
                    icon={Phone}
                    label="Contact"
                    value={meal.user.phone}
                  />
                  <InfoItem icon={Mail} label="Email" value={meal.user.email} />
                  <InfoItem
                    icon={MapPin}
                    label="Location"
                    value={`${meal.user.upazilla}, ${meal.user.district}`}
                  />
                  <InfoItem
                    icon={Calendar}
                    label="Member Since"
                    value={new Date(meal.user.createDate).toLocaleDateString(
                      "en-US",
                      {
                        month: "long",
                        year: "numeric",
                      }
                    )}
                  />
                </div>
              </div>
            </Section>
            <Section title="Product Rating" icon={Soup}>
              {review?.length > 0 ? (
                <div className="space-y-4">
                  {review.map((reviewItem) => (
                    <div
                      key={reviewItem._id}
                      className="flex items-start gap-4 p-4 border rounded-lg shadow-md bg-gray-50"
                    >
                      {/* Avatar Placeholder */}
                      <div className="flex-shrink-0 w-12 h-12 bg-green-100 rounded-full flex items-center justify-center text-green-600 font-bold uppercase">
                        {reviewItem.studentId.fullName.charAt(0)}
                      </div>

                      {/* Review Details */}
                      <div className="flex-1">
                        <div className="flex items-center justify-between">
                          <h3 className="text-lg font-semibold text-gray-800">
                            {reviewItem.studentId.fullName}
                          </h3>
                          {/* Star Rating */}
                          <div className="flex items-center gap-1 text-yellow-500">
                            {Array.from({ length: 5 }, (_, index) => (
                              <Star
                                key={index}
                                size={16}
                                fill={
                                  index < reviewItem.star
                                    ? "currentColor"
                                    : "none"
                                }
                                stroke="currentColor"
                              />
                            ))}
                          </div>
                        </div>
                        <p className="text-sm text-gray-600 mt-1">
                          {reviewItem.review}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="flex flex-col items-center justify-center text-center p-6 bg-gray-50 border rounded-lg shadow-md">
                  <Info size={32} className="text-gray-400 mb-2" />
                  <h3 className="text-lg font-semibold text-gray-700">
                    No Reviews Yet
                  </h3>
                  <p className="text-sm text-gray-500">
                    Be the first to leave a review and share your experience!
                  </p>
                </div>
              )}
            </Section>
          </div>

          {/* Right Column - Order Panel */}
          <div>
            <Card className="sticky top-4">
              <div className="p-6 space-y-6">
                {/* Price Section */}
                <div>
                  <div className="flex items-center gap-3 mb-2">
                    <span className="text-4xl font-bold flex items-center ">
                      <Taka />
                      {final}
                    </span>
                    {discount > 0 && (
                      <span className="text-xl text-gray-500 line-through flex items-center gap-2">
                        <Taka />
                        {original}
                      </span>
                    )}
                  </div>
                  {saved > 0 && (
                    <Badge
                      color="success"
                      className="mt-2 flex items-center gap-2"
                    >
                      <p>You save </p>
                      <Taka />
                      <p>{saved}</p>
                    </Badge>
                  )}
                </div>

                {/* Quantity Selector */}
                {user && user.role === "Student" ? (
                  <>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Quantity
                      </label>
                      <div className="flex items-center border border-gray-200 rounded-lg w-fit">
                        <button
                          onClick={() =>
                            quantity > 1 && setQuantity((q) => q - 1)
                          }
                          className="p-2 text-gray-600 hover:bg-gray-100 rounded-l-lg transition-colors"
                        >
                          <Minus className="w-5 h-5" />
                        </button>
                        <span className="w-16 text-center font-medium py-2">
                          {quantity}
                        </span>
                        <button
                          onClick={() => setQuantity((q) => q + 1)}
                          className="p-2 text-gray-600 hover:bg-gray-100 rounded-r-lg transition-colors"
                        >
                          <Plus className="w-5 h-5" />
                        </button>
                      </div>
                    </div>
                    {/* Add to Cart Button */}
                    <Button
                      gradientDuoTone="purpleToBlue"
                      size="xl"
                      className="w-full"
                      onClick={handleAddToCart}
                      disabled={addingToCart}
                    >
                      {addingToCart ? (
                        <div className="flex items-center gap-3">
                          <Spinner size="sm" light={true} />
                          <span>Adding to Cart...</span>
                        </div>
                      ) : (
                        <div className="flex items-center gap-3">
                          <ShoppingCart className="w-5 h-5" />
                          <span>Add to Cart</span>
                        </div>
                      )}
                    </Button>{" "}
                  </>
                ) : user?.role ? (
                  <div className="flex items-center gap-3">
                    <Alert color="failure" className="max-w-2xl">
                      <div className="flex items-center gap-3">
                        <Info className="w-6 h-6" />
                        <span className="font-medium text-lg">
                          You are a {user.role}. You can't order this meal.
                        </span>
                      </div>
                    </Alert>
                  </div>
                ) : (
                  <div className="flex items-center gap-3">
                    <Alert color="failure" className="max-w-2xl">
                      <div className="flex items-center gap-3">
                        <Info className="w-6 h-6" />
                        <span className="font-medium text-lg">
                          You are not logged in. Please login to order this
                          meal.
                        </span>
                      </div>
                    </Alert>
                  </div>
                )}
              </div>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StudentMealDetails;
