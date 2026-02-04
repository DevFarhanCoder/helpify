import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useBusinessContext } from "../context/BusinessContext";

const BusinessProfile = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { getBusinessById, addLead } = useBusinessContext();

  const business = getBusinessById(id);
  const [showLeadForm, setShowLeadForm] = useState(false);
  const [leadData, setLeadData] = useState({
    customerName: "",
    customerPhone: "",
    customerEmail: "",
    message: "",
  });
  const [errors, setErrors] = useState({});

  if (!business) {
    return (
      <div className="min-h-screen bg-gray-50 py-12">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="text-6xl mb-4">❌</div>
          <h1 className="text-3xl font-bold text-gray-900 mb-4">
            Business Not Found
          </h1>
          <p className="text-gray-600 mb-6">
            The business you're looking for doesn't exist.
          </p>
          <button
            onClick={() => navigate("/search")}
            className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-semibold transition"
          >
            Back to Search
          </button>
        </div>
      </div>
    );
  }

  const handleLeadChange = (e) => {
    const { name, value } = e.target;
    setLeadData((prev) => ({
      ...prev,
      [name]: value,
    }));
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: "" }));
    }
  };

  const validateLeadForm = () => {
    const newErrors = {};

    if (!leadData.customerName.trim()) {
      newErrors.customerName = "Name is required";
    }

    if (!leadData.customerPhone.trim()) {
      newErrors.customerPhone = "Phone number is required";
    } else if (!/^[+]?[\d\s-]{10,}$/.test(leadData.customerPhone)) {
      newErrors.customerPhone = "Please enter a valid phone number";
    }

    if (
      leadData.customerEmail &&
      !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(leadData.customerEmail)
    ) {
      newErrors.customerEmail = "Please enter a valid email";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleLeadSubmit = async (e) => {
    e.preventDefault();

    if (validateLeadForm()) {
      const result = await addLead({
        ...leadData,
        businessId: business._id,
      });

      if (result.success) {
        alert(
          "✅ Contact request submitted successfully! The business owner will contact you soon.",
        );
        setShowLeadForm(false);
        setLeadData({
          customerName: "",
          customerPhone: "",
          customerEmail: "",
          message: "",
        });
      } else {
        alert(`Error: ${result.message}`);
      }
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Back Button */}
        <button
          onClick={() => navigate(-1)}
          className="flex items-center text-gray-600 hover:text-gray-900 mb-6 transition"
        >
          <svg
            className="w-5 h-5 mr-2"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M15 19l-7-7 7-7"
            />
          </svg>
          Back
        </button>

        {/* Business Profile Card */}
        <div className="bg-white rounded-lg shadow-md overflow-hidden">
          {/* Business Image */}
          <div className="h-64 md:h-96 overflow-hidden bg-gray-200">
            <img
              src={business.image}
              alt={business.name}
              className="w-full h-full object-cover"
            />
          </div>

          {/* Business Details */}
          <div className="p-6 md:p-8">
            <div className="flex flex-wrap items-start justify-between mb-4">
              <div>
                <h1 className="text-3xl font-bold text-gray-900 mb-2">
                  {business.name}
                </h1>
                <p className="text-gray-600 text-lg">by {business.ownerName}</p>
              </div>
              <span className="px-4 py-2 bg-blue-100 text-blue-600 font-medium rounded-full">
                {business.category}
              </span>
            </div>

            {/* Description */}
            <div className="mb-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-3">
                About
              </h2>
              <p className="text-gray-700 leading-relaxed">
                {business.description}
              </p>
            </div>

            {/* Contact Information */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
              <div className="flex items-start">
                <svg
                  className="w-6 h-6 text-blue-600 mr-3 mt-1"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                  />
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                  />
                </svg>
                <div>
                  <h3 className="font-semibold text-gray-900">Location</h3>
                  <p className="text-gray-600">{business.location}</p>
                </div>
              </div>

              <div className="flex items-start">
                <svg
                  className="w-6 h-6 text-blue-600 mr-3 mt-1"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                  />
                </svg>
                <div>
                  <h3 className="font-semibold text-gray-900">Phone</h3>
                  <p className="text-gray-600">{business.phone}</p>
                </div>
              </div>
            </div>

            {/* Request Contact Button */}
            {!showLeadForm ? (
              <button
                onClick={() => setShowLeadForm(true)}
                className="w-full bg-blue-600 hover:bg-blue-700 text-white py-4 rounded-lg font-semibold text-lg transition"
              >
                Request Contact
              </button>
            ) : (
              <div className="border-t pt-6">
                <h2 className="text-xl font-semibold text-gray-900 mb-4">
                  Request Contact
                </h2>
                <form onSubmit={handleLeadSubmit} className="space-y-4">
                  <div>
                    <label
                      htmlFor="customerName"
                      className="block text-sm font-medium text-gray-700 mb-1"
                    >
                      Your Name *
                    </label>
                    <input
                      type="text"
                      id="customerName"
                      name="customerName"
                      value={leadData.customerName}
                      onChange={handleLeadChange}
                      className={`w-full px-4 py-2 border ${errors.customerName ? "border-red-500" : "border-gray-300"} rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500`}
                      placeholder="Enter your name"
                    />
                    {errors.customerName && (
                      <p className="mt-1 text-sm text-red-600">
                        {errors.customerName}
                      </p>
                    )}
                  </div>

                  <div>
                    <label
                      htmlFor="customerPhone"
                      className="block text-sm font-medium text-gray-700 mb-1"
                    >
                      Your Phone *
                    </label>
                    <input
                      type="tel"
                      id="customerPhone"
                      name="customerPhone"
                      value={leadData.customerPhone}
                      onChange={handleLeadChange}
                      className={`w-full px-4 py-2 border ${errors.customerPhone ? "border-red-500" : "border-gray-300"} rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500`}
                      placeholder="+91 9876543210"
                    />
                    {errors.customerPhone && (
                      <p className="mt-1 text-sm text-red-600">
                        {errors.customerPhone}
                      </p>
                    )}
                  </div>

                  <div>
                    <label
                      htmlFor="customerEmail"
                      className="block text-sm font-medium text-gray-700 mb-1"
                    >
                      Your Email (Optional)
                    </label>
                    <input
                      type="email"
                      id="customerEmail"
                      name="customerEmail"
                      value={leadData.customerEmail}
                      onChange={handleLeadChange}
                      className={`w-full px-4 py-2 border ${errors.customerEmail ? "border-red-500" : "border-gray-300"} rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500`}
                      placeholder="your@email.com"
                    />
                    {errors.customerEmail && (
                      <p className="mt-1 text-sm text-red-600">
                        {errors.customerEmail}
                      </p>
                    )}
                  </div>

                  <div>
                    <label
                      htmlFor="message"
                      className="block text-sm font-medium text-gray-700 mb-1"
                    >
                      Message (Optional)
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      value={leadData.message}
                      onChange={handleLeadChange}
                      rows="3"
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                      placeholder="Tell them what you're interested in..."
                    />
                  </div>

                  <div className="flex gap-3">
                    <button
                      type="submit"
                      className="flex-1 bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-lg font-semibold transition"
                    >
                      Submit Request
                    </button>
                    <button
                      type="button"
                      onClick={() => setShowLeadForm(false)}
                      className="px-6 bg-gray-200 hover:bg-gray-300 text-gray-700 py-3 rounded-lg font-semibold transition"
                    >
                      Cancel
                    </button>
                  </div>
                </form>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default BusinessProfile;
