import { Link } from "react-router-dom";

const BusinessCard = ({ business }) => {
  const handleImageError = (e) => {
    e.target.src = `https://via.placeholder.com/400x300/f97316/ffffff?text=${encodeURIComponent(business.category)}`;
  };

  return (
    <Link
      to={`/business/${business._id}`}
      className="block bg-white rounded-lg shadow-md hover:shadow-xl transition-shadow duration-300 overflow-hidden"
    >
      <div className="h-48 overflow-hidden bg-gray-200">
        <img
          src={business.image}
          alt={business.name}
          onError={handleImageError}
          className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
        />
      </div>
      <div className="p-4">
        <div className="flex items-start justify-between mb-2">
          <h3 className="text-xl font-bold text-gray-900">{business.name}</h3>
          <span className="px-3 py-1 bg-blue-100 text-blue-600 text-xs font-medium rounded-full">
            {business.category}
          </span>
        </div>
        <p className="text-gray-600 text-sm mb-2 line-clamp-2">
          {business.description}
        </p>
        <div className="flex items-center text-gray-500 text-sm mt-3">
          <svg
            className="w-4 h-4 mr-1"
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
          <span className="line-clamp-1">{business.location}</span>
        </div>
      </div>
    </Link>
  );
};

export default BusinessCard;
