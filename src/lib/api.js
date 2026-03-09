import { getAuth } from "firebase/auth";

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:4000";

// Helper function to get Firebase token
export const getAuthToken = async () => {
  const auth = getAuth();
  const user = auth.currentUser;
  
  if (!user) {
    throw new Error("No authenticated user");
  }
  
  return await user.getIdToken();
};

// API client with automatic token injection
export const apiClient = async (endpoint, options = {}) => {
  try {
    const token = await getAuthToken();
    
    const config = {
      ...options,
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`,
        ...options.headers,
      },
    };

    const response = await fetch(`${API_BASE_URL}${endpoint}`, config);
    
    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.message || "API request failed");
    }
    
    return await response.json();
  } catch (error) {
    console.error("API Error:", error);
    throw error;
  }
};

// Public API client (no auth required)
export const publicApiClient = async (endpoint, options = {}) => {
  try {
    const config = {
      ...options,
      headers: {
        "Content-Type": "application/json",
        ...options.headers,
      },
    };

    const url = `${API_BASE_URL}${endpoint}`;
    console.log("Fetching from:", url);
    
    const response = await fetch(url, config);
    
    if (!response.ok) {
      // Try to get error message from response
      const contentType = response.headers.get("content-type");
      let errorMessage = `API request failed with status ${response.status}`;
      
      if (contentType && contentType.includes("application/json")) {
        const error = await response.json();
        errorMessage = error.message || errorMessage;
      } else {
        const text = await response.text();
        console.error("Non-JSON response:", text.substring(0, 200));
        errorMessage = `Backend returned HTML instead of JSON. Is the backend server running on ${API_BASE_URL}?`;
      }
      
      throw new Error(errorMessage);
    }
    
    return await response.json();
  } catch (error) {
    console.error("API Error:", error);
    throw error;
  }
};

// Asset API calls
export const assetAPI = {
  getAll: () => publicApiClient("/assets"),
  
  getById: (id) => publicApiClient(`/assets/${id}`),
  
  create: (data) => apiClient("/api/assets", {
    method: "POST",
    body: JSON.stringify(data),
  }),
  
  update: (id, data) => apiClient(`/api/assets/${id}`, {
    method: "PUT",
    body: JSON.stringify(data),
  }),
  
  delete: (id) => apiClient(`/api/assets/${id}`, {
    method: "DELETE",
  }),

  checkPurchase: (id) => apiClient(`/api/assets/${id}/check-purchase`),

  download: (id) => apiClient(`/api/assets/${id}/download`),
};

// User API calls
export const userAPI = {
  getAll: () => apiClient("/api/users"),
  
  getById: (id) => apiClient(`/api/users/${id}`),
  
  updateRole: (id, role) => apiClient(`/api/users/${id}/role`, {
    method: "PUT",
    body: JSON.stringify({ role }),
  }),
  
  getProfile: () => apiClient("/api/users/profile"),
};

// Order API calls
export const orderAPI = {
  getAll: () => apiClient("/api/orders"),
  
  getById: (id) => apiClient(`/api/orders/${id}`),
  
  create: (data) => apiClient("/api/orders", {
    method: "POST",
    body: JSON.stringify(data),
  }),
  
  getUserOrders: () => apiClient("/api/orders/user"),
};

// Analytics API calls
export const analyticsAPI = {
  getStats: () => apiClient("/api/analytics/stats"),
  
  getRevenue: (period) => apiClient(`/api/analytics/revenue?period=${period}`),
};
