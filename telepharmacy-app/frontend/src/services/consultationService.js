// Service to handle consultation API calls
import axios from 'axios';

const API_URL = '/api/consultations';

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

class ConsultationService {
  // Create a new consultation
  static async createConsultation(consultationData) {
    try {
      const response = await api.post('/', consultationData);
      return response.data;
    } catch (error) {
      throw new Error(error.response?.data?.message || 'Error creating consultation');
    }
  }

  // Get consultations for a patient
  static async getPatientConsultations(patientId) {
    try {
      const response = await api.get(`/patient/${patientId}`);
      return response.data;
    } catch (error) {
      throw new Error(error.response?.data?.message || 'Error fetching consultations');
    }
  }

  // Get consultations for a pharmacist
  static async getPharmacistConsultations(pharmacistId) {
    try {
      const response = await api.get(`/pharmacist/${pharmacistId}`);
      return response.data;
    } catch (error) {
      throw new Error(error.response?.data?.message || 'Error fetching consultations');
    }
  }

  // Get consultation by ID
  static async getConsultationById(id) {
    try {
      const response = await api.get(`/${id}`);
      return response.data;
    } catch (error) {
      throw new Error(error.response?.data?.message || 'Error fetching consultation');
    }
  }

  // Update consultation status
  static async updateConsultationStatus(id, status) {
    try {
      const response = await api.put(`/${id}/status`, { status });
      return response.data;
    } catch (error) {
      throw new Error(error.response?.data?.message || 'Error updating consultation status');
    }
  }

  // Add feedback to consultation
  static async addConsultationFeedback(id, feedbackData) {
    try {
      const response = await api.put(`/${id}/feedback`, feedbackData);
      return response.data;
    } catch (error) {
      throw new Error(error.response?.data?.message || 'Error adding feedback');
    }
  }

  // Format consultation date
  static formatConsultationDate(dateString) {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  }

  // Get status display text
  static getStatusDisplayText(status) {
    const statusMap = {
      'scheduled': 'Scheduled',
      'in-progress': 'In Progress',
      'completed': 'Completed',
      'cancelled': 'Cancelled'
    };
    return statusMap[status] || status;
  }

  // Get status class for styling
  static getStatusClass(status) {
    const classMap = {
      'scheduled': 'status-scheduled',
      'in-progress': 'status-in-progress',
      'completed': 'status-completed',
      'cancelled': 'status-cancelled'
    };
    return classMap[status] || 'status-default';
  }
}

export default ConsultationService;