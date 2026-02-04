import { createContext, useState, useEffect, useContext } from "react";
import api from "../utils/api";

const BusinessContext = createContext();

export const useBusinessContext = () => {
  const context = useContext(BusinessContext);
  if (!context) {
    throw new Error("useBusinessContext must be used within BusinessProvider");
  }
  return context;
};

export const BusinessProvider = ({ children }) => {
  const [businesses, setBusinesses] = useState([]);
  const [leads, setLeads] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch businesses from API
  const fetchBusinesses = async (search = "", category = "") => {
    try {
      const params = new URLSearchParams();
      if (search) params.append("search", search);
      if (category && category !== "All") params.append("category", category);

      const response = await api.get(`/businesses?${params.toString()}`);
      setBusinesses(response.data);
      return response.data;
    } catch (error) {
      console.error("Error fetching businesses:", error);
      return [];
    }
  };

  // Fetch leads (admin only)
  const fetchLeads = async () => {
    try {
      const response = await api.get("/leads");
      setLeads(response.data);
      return response.data;
    } catch (error) {
      console.error("Error fetching leads:", error);
      return [];
    }
  };

  // Initial fetch
  useEffect(() => {
    fetchBusinesses().finally(() => setLoading(false));
  }, []);

  const addBusiness = async (businessData) => {
    try {
      const response = await api.post("/businesses", businessData);
      setBusinesses((prev) => [response.data, ...prev]);
      return { success: true, data: response.data };
    } catch (error) {
      return {
        success: false,
        message: error.response?.data?.message || "Failed to register business",
      };
    }
  };

  const addLead = async (leadData) => {
    try {
      const response = await api.post("/leads", leadData);
      return { success: true, data: response.data };
    } catch (error) {
      return {
        success: false,
        message: error.response?.data?.message || "Failed to submit lead",
      };
    }
  };

  const getBusinessById = (id) => {
    return businesses.find((business) => business._id === id);
  };

  const searchBusinesses = async (searchTerm, category) => {
    return await fetchBusinesses(searchTerm, category);
  };

  const value = {
    businesses,
    leads,
    loading,
    addBusiness,
    addLead,
    getBusinessById,
    searchBusinesses,
    fetchBusinesses,
    fetchLeads,
  };

  return (
    <BusinessContext.Provider value={value}>
      {children}
    </BusinessContext.Provider>
  );
};
