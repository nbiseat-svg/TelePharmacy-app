// Service to handle medication API calls
import axios from 'axios';
import networkOptimizer from '../utils/networkOptimizer';
import { API_BASE_URL } from '../utils/apiConfig';

const API_URL = `${API_BASE_URL}/api/medications`;

// Create axios instance with default config
const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json'
  }
});

// Add auth token to requests
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

class MedicationService {
  // Get all medications with pagination and search
  static async getMedications(pageNumber = 1, keyword = '', category = '') {
    try {
      const params = new URLSearchParams();
      if (pageNumber) params.append('pageNumber', pageNumber);
      if (keyword) params.append('keyword', keyword);
      if (category) params.append('category', category);
      
      // Use network optimizer for better performance
      const url = `/?${params.toString()}`;
      const response = await networkOptimizer.fetchWithCache(`${API_URL}${url}`, {
        useCache: !keyword && !category // Use cache for general browsing
      });
      
      return response;
    } catch (error) {
      throw new Error(error.response?.data?.message || 'Error fetching medications');
    }
  }

  // Get medication by ID
  static async getMedicationById(id) {
    try {
      // Try to get from cache first for better performance
      const cached = await networkOptimizer.getCachedData(`medication_${id}`);
      if (cached && networkOptimizer.isNetworkAvailable()) {
        // If we have cached data and we're online, still fetch fresh data but return cached immediately
        networkOptimizer.fetchWithCache(`${API_URL}/${id}`)
          .then(freshData => {
            // Update cache with fresh data
            networkOptimizer.cacheData(`medication_${id}`, freshData);
          });
        return cached;
      }
      
      const response = await api.get(`/${id}`);
      
      // Cache the result for offline use
      await networkOptimizer.cacheData(`medication_${id}`, response.data);
      
      return response.data;
    } catch (error) {
      // If online request fails, try to return cached data
      const cached = await networkOptimizer.getCachedData(`medication_${id}`);
      if (cached) {
        return cached;
      }
      
      throw new Error(error.response?.data?.message || 'Error fetching medication');
    }
  }

  // Create a new medication (admin only)
  static async createMedication(medicationData) {
    try {
      const response = await api.post('/', medicationData);
      
      // Clear relevant caches
      localStorage.removeItem('medications_cache');
      
      return response.data;
    } catch (error) {
      throw new Error(error.response?.data?.message || 'Error creating medication');
    }
  }

  // Update a medication (admin only)
  static async updateMedication(id, medicationData) {
    try {
      const response = await api.put(`/${id}`, medicationData);
      
      // Clear relevant caches
      localStorage.removeItem(`medication_${id}`);
      localStorage.removeItem('medications_cache');
      
      return response.data;
    } catch (error) {
      throw new Error(error.response?.data?.message || 'Error updating medication');
    }
  }

  // Delete a medication (admin only)
  static async deleteMedication(id) {
    try {
      const response = await api.delete(`/${id}`);
      
      // Clear relevant caches
      localStorage.removeItem(`medication_${id}`);
      localStorage.removeItem('medications_cache');
      
      return response.data;
    } catch (error) {
      throw new Error(error.response?.data?.message || 'Error deleting medication');
    }
  }

  // Search medications by location
  static async searchMedicationsByLocation(medicationName, latitude, longitude, radius = 10) {
    try {
      const params = new URLSearchParams({
        medicationName,
        latitude,
        longitude,
        radius
      });
      
      const response = await api.get(`/search/location?${params.toString()}`);
      return response.data;
    } catch (error) {
      throw new Error(error.response?.data?.message || 'Error searching medications by location');
    }
  }

  // Format currency
  static formatCurrency(amount, currency = 'USD') {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: currency
    }).format(amount);
  }

  // Get category display text
  static getCategoryDisplayText(category) {
    const categoryMap = {
      'pain-relief': 'Pain Relief',
      'antibiotics': 'Antibiotics',
      'allergy': 'Allergy',
      'gastrointestinal': 'Gastrointestinal',
      'vitamins': 'Vitamins & Supplements',
      'cold-flu': 'Cold & Flu',
      'skin-care': 'Skin Care',
      'diabetes': 'Diabetes',
      'cardiovascular': 'Cardiovascular',
      'respiratory': 'Respiratory'
    };
    return categoryMap[category] || category;
  }

  // Get stock status
  static getStockStatus(stock) {
    if (stock > 10) {
      return 'In Stock';
    } else if (stock > 0) {
      return 'Low Stock';
    } else {
      return 'Out of Stock';
    }
  }

  // Get stock status class
  static getStockStatusClass(stock) {
    if (stock > 10) {
      return 'stock-in';
    } else if (stock > 0) {
      return 'stock-low';
    } else {
      return 'stock-out';
    }
  }
}

export default MedicationService;