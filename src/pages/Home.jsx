import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useBusinessContext } from "../context/BusinessContext";
import BusinessCard from "../components/BusinessCard";
import { categoryIcons } from "../utils/categoryIcons";
import PopularCategoriesModal from "../components/PopularCategoriesModal";
import { MdApps } from "react-icons/md";

const categories = [
  "Restaurant",
  "Hotels",
  "Beauty Spa",
  "Home Decor",
  "Wedding Planning",
  "Education",
  "Rent & Hire",
  "Hospitals",
  "Contractors",
  "Pet Shops",
  "PG/Hostels",
  "Estate Agent",
  "Dentists",
  "Gym",
  "Loans",
  "Event Organisers",
  "Driving Schools",
  "Packers & Movers",
  "Courier Service",
  "Electronics",
  "Salon",
  "Grocery",
  "Pharmacy",
  "Clothing",
];

const Home = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [location, setLocation] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const navigate = useNavigate();
  const { businesses, fetchBusinesses } = useBusinessContext();

  useEffect(() => {
    fetchBusinesses();
    // Try to get user's location
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setLocation("Thane, Mumbai"); // Default for demo
        },
        () => {
          setLocation("Enter your location");
        },
      );
    } else {
      setLocation("Enter your location");
    }
  }, []);

  const handleSearch = (e) => {
    e.preventDefault();
    const params = new URLSearchParams();
    if (searchTerm) params.append("q", searchTerm);
    navigate(`/search?${params.toString()}`);
  };

  // Group businesses by category
  const businessesByCategory = categories.reduce((acc, category) => {
    acc[category] = businesses
      .filter((b) => b.category === category)
      .slice(0, 4);
    return acc;
  }, {});

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section with JustDial-inspired design */}
      <div className="bg-gradient-to-r from-yellow-400 via-orange-500 to-red-500 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-4 drop-shadow-lg">
              India's No. 1 Local Search Engine
            </h1>
            <p className="text-xl md:text-2xl mb-8 text-yellow-50">
              Find the best businesses near you - Verified & Trusted
            </p>

            {/* Search Bar */}
            <form onSubmit={handleSearch} className="max-w-4xl mx-auto">
              <div className="bg-white rounded-lg shadow-2xl overflow-hidden flex flex-col sm:flex-row">
                {/* Location Input */}
                <div className="flex-1 flex items-center px-4 py-3 border-b sm:border-b-0 sm:border-r border-gray-200">
                  <svg
                    className="w-6 h-6 text-orange-500 mr-3 flex-shrink-0"
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
                  <input
                    type="text"
                    placeholder="Enter your location"
                    value={location}
                    onChange={(e) => setLocation(e.target.value)}
                    className="flex-1 py-2 text-gray-900 focus:outline-none placeholder-gray-500"
                  />
                </div>

                {/* Search Input */}
                <div className="flex-1 flex items-center px-4 py-3">
                  <svg
                    className="w-6 h-6 text-gray-400 mr-3 flex-shrink-0"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                    />
                  </svg>
                  <input
                    type="text"
                    placeholder="Search for restaurants, salons, gyms..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="flex-1 py-2 text-gray-900 focus:outline-none placeholder-gray-500"
                  />
                </div>

                {/* Search Button */}
                <button
                  type="submit"
                  className="bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 text-white px-8 py-4 font-bold text-lg transition flex items-center justify-center"
                >
                  <svg
                    className="w-6 h-6"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                    />
                  </svg>
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>

      {/* Category Browser Section */}
      <div className="bg-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-10 text-center">
            Browse Popular Categories
          </h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6">
            {categories.slice(0, 9).map((category) => (
              <Link
                key={category}
                to={`/search?category=${encodeURIComponent(category)}`}
                className="flex flex-col items-center p-6 bg-white rounded-2xl border border-gray-200 hover:border-orange-500 hover:shadow-xl transition-all group"
              >
                <div className="mb-4 text-5xl group-hover:scale-110 transition-transform">
                  {categoryIcons[category]}
                </div>
                <span className="text-sm font-medium text-gray-700 group-hover:text-orange-600 text-center leading-tight">
                  {category}
                </span>
              </Link>
            ))}
            {/* Popular Categories Button */}
            <button
              onClick={() => setIsModalOpen(true)}
              className="flex flex-col items-center p-6 bg-gradient-to-br from-orange-500 to-yellow-500 text-white rounded-2xl hover:shadow-xl transition-all group hover:from-orange-600 hover:to-yellow-600"
            >
              <div className="mb-4 text-5xl group-hover:scale-110 transition-transform">
                <MdApps />
              </div>
              <span className="text-sm font-bold text-center leading-tight">
                Popular Categories
              </span>
            </button>
          </div>
        </div>
      </div>

      {/* Featured Categories with Businesses */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {categories.map(
          (category) =>
            businessesByCategory[category]?.length > 0 && (
              <div key={category} className="mb-12">
                <div className="flex items-center justify-between mb-6">
                  <div className="flex items-center space-x-4">
                    <div className="w-12 h-12 flex items-center justify-center">
                      {categoryIcons[category]}
                    </div>
                    <h2 className="text-2xl font-bold text-gray-900">
                      {category}
                    </h2>
                  </div>
                  <Link
                    to={`/search?category=${category}`}
                    className="text-orange-600 hover:text-orange-700 font-semibold flex items-center space-x-2"
                  >
                    <span>View All</span>
                    <svg
                      className="w-5 h-5"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M9 5l7 7-7 7"
                      />
                    </svg>
                  </Link>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                  {businessesByCategory[category].map((business) => (
                    <BusinessCard key={business._id} business={business} />
                  ))}
                </div>
              </div>
            ),
        )}
      </div>

      {/* Stats Section */}
      <div className="bg-gradient-to-r from-orange-500 to-red-500 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 text-center">
            <div>
              <div className="text-5xl font-bold mb-2">
                {businesses.length}+
              </div>
              <div className="text-xl text-orange-100">Verified Businesses</div>
            </div>
            <div>
              <div className="text-5xl font-bold mb-2">50K+</div>
              <div className="text-xl text-orange-100">Happy Customers</div>
            </div>
            <div>
              <div className="text-5xl font-bold mb-2">10K+</div>
              <div className="text-xl text-orange-100">Daily Searches</div>
            </div>
            <div>
              <div className="text-5xl font-bold mb-2">24/7</div>
              <div className="text-xl text-orange-100">Customer Support</div>
            </div>
          </div>
        </div>
      </div>

      {/* Why Choose Us Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <h2 className="text-4xl font-bold text-gray-900 mb-12 text-center">
          Why Choose BizConnect?
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="bg-white p-8 rounded-xl shadow-lg hover:shadow-2xl transition">
            <div className="w-16 h-16 bg-gradient-to-br from-orange-400 to-red-500 rounded-full flex items-center justify-center mx-auto mb-6">
              <svg
                className="w-8 h-8 text-white"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
            </div>
            <h3 className="text-2xl font-bold text-gray-900 mb-3 text-center">
              Verified Listings
            </h3>
            <p className="text-gray-600 text-center">
              All businesses are verified and reviewed to ensure quality and
              authenticity. Trust only the best.
            </p>
          </div>

          <div className="bg-white p-8 rounded-xl shadow-lg hover:shadow-2xl transition">
            <div className="w-16 h-16 bg-gradient-to-br from-orange-400 to-red-500 rounded-full flex items-center justify-center mx-auto mb-6">
              <svg
                className="w-8 h-8 text-white"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M13 10V3L4 14h7v7l9-11h-7z"
                />
              </svg>
            </div>
            <h3 className="text-2xl font-bold text-gray-900 mb-3 text-center">
              Instant Connect
            </h3>
            <p className="text-gray-600 text-center">
              Connect with businesses instantly. Get quick responses and book
              services with ease.
            </p>
          </div>

          <div className="bg-white p-8 rounded-xl shadow-lg hover:shadow-2xl transition">
            <div className="w-16 h-16 bg-gradient-to-br from-orange-400 to-red-500 rounded-full flex items-center justify-center mx-auto mb-6">
              <svg
                className="w-8 h-8 text-white"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
            </div>
            <h3 className="text-2xl font-bold text-gray-900 mb-3 text-center">
              Best Deals
            </h3>
            <p className="text-gray-600 text-center">
              Get exclusive deals and offers from local businesses. Save money
              while shopping local.
            </p>
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="bg-gradient-to-r from-yellow-400 via-orange-500 to-red-500 py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl font-bold text-white mb-4 drop-shadow-lg">
            Ready to Grow Your Business?
          </h2>
          <p className="text-xl text-yellow-50 mb-8">
            Join thousands of businesses already growing with Helpify
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to="/pricing"
              className="inline-block bg-white text-orange-600 px-10 py-4 rounded-full font-bold text-lg hover:bg-gray-100 transition shadow-xl"
            >
              View Pricing Plans
            </Link>
            <Link
              to="/register"
              className="inline-block bg-gray-900 text-white px-10 py-4 rounded-full font-bold text-lg hover:bg-gray-800 transition shadow-xl"
            >
              Register Your Business
            </Link>
          </div>
        </div>
      </div>

      {/* Popular Categories Modal */}
      <PopularCategoriesModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
    </div>
  );
};

export default Home;
