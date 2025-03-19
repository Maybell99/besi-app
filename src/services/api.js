// Import environment variable from .env
const API_URL = import.meta.env.VITE_API_URL;

// Function to fetch data
export const fetchData = async (endpoint) => {
  try {
    const response = await fetch(`${API_URL}/${endpoint}`);
    if (!response.ok) {
      throw new Error("Failed to fetch data");
    }
    return await response.json();
  } catch (error) {
    console.error("API Error:", error);
    return null;
  }
};
