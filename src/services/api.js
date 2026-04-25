const API_URL = import.meta.env.VITE_API_URL;

export async function fetchProducts() {

  try {

    // ✅ Check cache first
    const cached = localStorage.getItem("products");

    if (cached) {
      return JSON.parse(cached);
    }

    // ✅ Fetch from API (using .env)
    const response = await fetch(API_URL);

    if (!response.ok) {
      throw new Error("Failed to fetch products");
    }

    const data = await response.json();

    // ✅ Save to localStorage
    localStorage.setItem("products", JSON.stringify(data));

    return data;

  } catch (error) {

    console.error("API Error:", error);

    throw error; // important for UI error handling

  }

}