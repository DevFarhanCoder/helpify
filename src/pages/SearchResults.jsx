import { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { useBusinessContext } from "../context/BusinessContext";
import BusinessCard from "../components/BusinessCard";

const categories = [
  "All",
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

const SearchResults = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const { searchBusinesses } = useBusinessContext();

  const [searchTerm, setSearchTerm] = useState(searchParams.get("q") || "");
  const [selectedCategory, setSelectedCategory] = useState(
    searchParams.get("category") || "All",
  );
  const [results, setResults] = useState([]);

  useEffect(() => {
    const query = searchParams.get("q") || "";
    const category = searchParams.get("category") || "All";

    const fetchResults = async () => {
      const filteredResults = await searchBusinesses(query, category);
      setResults(filteredResults);
    };

    fetchResults();
  }, [searchParams, searchBusinesses]);

  const handleSearch = (e) => {
    e.preventDefault();
    const params = {};
    if (searchTerm) params.q = searchTerm;
    if (selectedCategory && selectedCategory !== "All")
      params.category = selectedCategory;
    setSearchParams(params);
  };

  const handleCategoryClick = (category) => {
    setSelectedCategory(category);
    const params = {};
    const searchTerm = searchParams.get("q");
    if (searchTerm) params.q = searchTerm;
    if (category && category !== "All") params.category = category;
    setSearchParams(params);
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Search Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-6">
            Search Results
          </h1>

          {/* Search Form */}
          <form
            onSubmit={handleSearch}
            className="bg-white rounded-lg shadow-md p-4"
          >
            <div className="flex flex-col sm:flex-row gap-3">
              <input
                type="text"
                placeholder="Search by name, description, or location..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <button
                type="submit"
                className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg font-semibold transition"
              >
                Search
              </button>
            </div>
          </form>
        </div>

        {/* Results */}
        <div>
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-semibold text-gray-900">
              {results.length}{" "}
              {results.length === 1 ? "Business" : "Businesses"} Found
            </h2>
          </div>

          {results.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {results.map((business) => (
                <BusinessCard key={business.id} business={business} />
              ))}
            </div>
          ) : (
            <div className="bg-white rounded-lg shadow-md p-12 text-center">
              <div className="text-6xl mb-4">🔍</div>
              <h3 className="text-2xl font-bold text-gray-900 mb-2">
                No businesses found
              </h3>
              <p className="text-gray-600 mb-6">
                Try adjusting your search criteria or browse all categories
              </p>
              <button
                onClick={() => {
                  setSearchTerm("");
                  setSelectedCategory("All");
                  setSearchParams({});
                }}
                className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-semibold transition"
              >
                Clear Filters
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default SearchResults;
