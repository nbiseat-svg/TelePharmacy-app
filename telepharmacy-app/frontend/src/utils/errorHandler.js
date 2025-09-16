// errorHandler.js
class ErrorHandler {
  // Handle API errors
  static handleApiError(error) {
    console.error('API Error:', error);
    
    if (error.response) {
      // Server responded with error status
      const { status, data } = error.response;
      
      switch (status) {
        case 400:
          return {
            type: 'validation',
            message: data.message || 'Invalid request data',
            details: data.errors || []
          };
        case 401:
          return {
            type: 'authentication',
            message: 'You need to log in to perform this action',
            redirectTo: '/login'
          };
        case 403:
          return {
            type: 'authorization',
            message: 'You do not have permission to perform this action'
          };
        case 404:
          return {
            type: 'not_found',
            message: 'The requested resource was not found'
          };
        case 500:
          return {
            type: 'server',
            message: 'Server error. Please try again later'
          };
        default:
          return {
            type: 'unknown',
            message: data.message || 'An unexpected error occurred'
          };
      }
    } else if (error.request) {
      // Network error
      return {
        type: 'network',
        message: 'Network error. Please check your connection and try again'
      };
    } else {
      // Other error
      return {
        type: 'unknown',
        message: error.message || 'An unexpected error occurred'
      };
    }
  }

  // Handle form validation errors
  static handleFormErrors(errors) {
    const errorMessages = {};
    
    if (errors && typeof errors === 'object') {
      Object.keys(errors).forEach(field => {
        if (Array.isArray(errors[field])) {
          errorMessages[field] = errors[field][0]; // Take first error message
        } else {
          errorMessages[field] = errors[field];
        }
      });
    }
    
    return errorMessages;
  }

  // Create user-friendly error message
  static createUserMessage(error) {
    if (typeof error === 'string') {
      return error;
    }
    
    if (error && error.message) {
      return error.message;
    }
    
    return 'An unexpected error occurred. Please try again.';
  }

  // Log error for debugging
  static logError(error, context = '') {
    console.error(`Error ${context}:`, error);
    
    // In production, you might want to send this to an error tracking service
    if (process.env.NODE_ENV === 'production') {
      // Example: Sentry.captureException(error);
    }
  }
}

export default ErrorHandler;