import { useState } from "react";
import { MdClose, MdSearch } from "react-icons/md";
import { useNavigate } from "react-router-dom";
import { categoryIcons } from "../utils/categoryIcons";

const PopularCategoriesModal = ({ isOpen, onClose }) => {
  const [searchQuery, setSearchQuery] = useState("");
  const navigate = useNavigate();

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

  const filteredCategories = categories.filter((category) =>
    category.toLowerCase().includes(searchQuery.toLowerCase()),
  );

  const handleCategoryClick = (category) => {
    navigate(`/search?category=${encodeURIComponent(category)}`);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <>
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black bg-opacity-50 z-40 transition-opacity"
        onClick={onClose}
      />

      {/* Sidebar Modal */}
      <div className="fixed right-0 top-0 bottom-0 w-full md:w-[500px] bg-white z-50 shadow-2xl transform transition-transform duration-300 ease-in-out overflow-y-auto">
        {/* Header */}
        <div className="sticky top-0 bg-gradient-to-r from-orange-500 to-yellow-500 text-white p-6 shadow-md z-10">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-2xl font-bold">Popular Categories</h2>
            <button
              onClick={onClose}
              className="p-2 hover:bg-white/20 rounded-full transition-colors"
              aria-label="Close"
            >
              <MdClose className="w-6 h-6" />
            </button>
          </div>

          {/* Search Bar */}
          <div className="relative">
            <MdSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500 w-5 h-5" />
            <input
              type="text"
              placeholder="Search categories..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-3 rounded-lg text-gray-900 focus:outline-none focus:ring-2 focus:ring-orange-300"
            />
          </div>
        </div>

        {/* Categories Grid */}
        <div className="p-6">
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {filteredCategories.map((category) => (
              <button
                key={category}
                onClick={() => handleCategoryClick(category)}
                className="flex flex-col items-center justify-center p-4 bg-white border-2 border-gray-200 rounded-xl hover:border-orange-500 hover:shadow-lg transition-all duration-200 group"
              >
                <div className="text-4xl mb-2 transform group-hover:scale-110 transition-transform duration-200">
                  {categoryIcons[category]}
                </div>
                <span className="text-sm font-medium text-gray-700 text-center group-hover:text-orange-600 transition-colors">
                  {category}
                </span>
              </button>
            ))}
          </div>

          {filteredCategories.length === 0 && (
            <div className="text-center py-12">
              <p className="text-gray-500 text-lg">No categories found</p>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default PopularCategoriesModal;
