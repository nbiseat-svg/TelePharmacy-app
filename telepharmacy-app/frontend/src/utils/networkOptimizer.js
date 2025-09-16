// networkOptimizer.js
// Utility functions for optimizing network performance and offline functionality

class NetworkOptimizer {
  constructor() {
    this.cacheName = 'telepharmacy-cache-v1';
    this.cacheTimeout = 5 * 60 * 1000; // 5 minutes
    this.isOnline = navigator.onLine;
    
    // Listen for online/offline events
    window.addEventListener('online', () => {
      this.isOnline = true;
      console.log('Network connection restored');
    });
    
    window.addEventListener('offline', () => {
      this.isOnline = false;
      console.log('Network connection lost');
    });
  }
  
  // Check if we're online
  isNetworkAvailable() {
    return this.isOnline;
  }
  
  // Cache data with expiration
  async cacheData(key, data) {
    try {
      const cacheData = {
        data: data,
        timestamp: Date.now()
      };
      
      localStorage.setItem(key, JSON.stringify(cacheData));
      return true;
    } catch (error) {
      console.error('Error caching data:', error);
      return false;
    }
  }
  
  // Retrieve cached data with expiration check
  async getCachedData(key) {
    try {
      const cached = localStorage.getItem(key);
      if (!cached) return null;
      
      const parsed = JSON.parse(cached);
      const now = Date.now();
      
      // Check if cache is expired
      if (now - parsed.timestamp > this.cacheTimeout) {
        localStorage.removeItem(key);
        return null;
      }
      
      return parsed.data;
    } catch (error) {
      console.error('Error retrieving cached data:', error);
      return null;
    }
  }
  
  // Make an API request with caching
  async fetchWithCache(url, options = {}) {
    const cacheKey = `api_${url}`;
    
    // Try to get from cache first if offline or for performance
    if (!this.isOnline || options.useCache) {
      const cachedData = await this.getCachedData(cacheKey);
      if (cachedData) {
        console.log('Returning cached data for:', url);
        return cachedData;
      }
    }
    
    try {
      // Make the actual API request
      const response = await fetch(url, options);
      const data = await response.json();
      
      // Cache the response if successful
      if (response.ok) {
        await this.cacheData(cacheKey, data);
      }
      
      return data;
    } catch (error) {
      console.error('API request failed:', error);
      
      // If request fails, try to return cached data as fallback
      const cachedData = await this.getCachedData(cacheKey);
      if (cachedData) {
        console.log('Returning cached data as fallback for:', url);
        return cachedData;
      }
      
      throw error;
    }
  }
  
  // Optimize image loading
  optimizeImageLoading(imageUrl, maxWidth = 800) {
    // In a real implementation, this would use service workers or CDN optimization
    // For now, we'll just return the URL but this is where you'd implement:
    // 1. Responsive image loading
    // 2. Lazy loading
    // 3. Compression
    // 4. Format optimization (WebP, AVIF)
    return imageUrl;
  }
  
  // Implement data compression for large payloads
  compressData(data) {
    // Simple compression using JSON.stringify with minimal spacing
    return JSON.stringify(data, null, 0);
  }
  
  // Batch multiple requests
  async batchRequests(requests) {
    // For better performance on 4G, batch requests when possible
    const results = await Promise.allSettled(requests.map(req => 
      fetch(req.url, req.options)
        .then(response => response.json())
        .catch(error => ({ error: error.message }))
    ));
    
    return results.map((result, index) => ({
      url: requests[index].url,
      status: result.status,
      data: result.status === 'fulfilled' ? result.value : null,
      error: result.status === 'rejected' ? result.reason : null
    }));
  }
  
  // Prefetch critical resources
  async prefetchResources(urls) {
    const promises = urls.map(url => 
      fetch(url)
        .then(response => {
          if (response.ok) {
            console.log('Prefetched:', url);
          }
        })
        .catch(error => {
          console.warn('Failed to prefetch:', url, error);
        })
    );
    
    await Promise.all(promises);
  }
}

// Create a singleton instance
const networkOptimizer = new NetworkOptimizer();

export default networkOptimizer;