// Service to handle prescription API calls
import axios from 'axios';

const API_URL = '/api/prescriptions';

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

class PrescriptionService {
  // Create a new prescription
  static async createPrescription(prescriptionData) {
    try {
      const response = await api.post('/', prescriptionData);
      return response.data;
    } catch (error) {
      throw new Error(error.response?.data?.message || 'Error creating prescription');
    }
  }

  // Get prescriptions for a patient
  static async getPatientPrescriptions(patientId) {
    try {
      const response = await api.get(`/patient/${patientId}`);
      return response.data;
    } catch (error) {
      throw new Error(error.response?.data?.message || 'Error fetching prescriptions');
    }
  }

  // Get prescriptions for a pharmacist
  static async getPharmacistPrescriptions(pharmacistId) {
    try {
      const response = await api.get(`/pharmacist/${pharmacistId}`);
      return response.data;
    } catch (error) {
      throw new Error(error.response?.data?.message || 'Error fetching prescriptions');
    }
  }

  // Get prescription by ID
  static async getPrescriptionById(id) {
    try {
      const response = await api.get(`/${id}`);
      return response.data;
    } catch (error) {
      throw new Error(error.response?.data?.message || 'Error fetching prescription');
    }
  }

  // Update prescription status
  static async updatePrescriptionStatus(id, status) {
    try {
      const response = await api.put(`/${id}/status`, { status });
      return response.data;
    } catch (error) {
      throw new Error(error.response?.data?.message || 'Error updating prescription status');
    }
  }

  // Request prescription refill
  static async requestPrescriptionRefill(id) {
    try {
      const response = await api.post(`/${id}/refill`);
      return response.data;
    } catch (error) {
      throw new Error(error.response?.data?.message || 'Error requesting refill');
    }
  }

  // Update refill request status
  static async updateRefillRequestStatus(prescriptionId, refillId, status, pharmacistNotes) {
    try {
      const response = await api.put(`/${prescriptionId}/refill/${refillId}`, { 
        status, 
        pharmacistNotes 
      });
      return response.data;
    } catch (error) {
      throw new Error(error.response?.data?.message || 'Error updating refill request');
    }
  }

  // Add pharmacist notes to prescription
  static async addPharmacistNotes(id, pharmacistNotes) {
    try {
      const response = await api.put(`/${id}/notes`, { pharmacistNotes });
      return response.data;
    } catch (error) {
      throw new Error(error.response?.data?.message || 'Error adding pharmacist notes');
    }
  }

  // Mark prescription as picked up
  static async markPrescriptionPickedUp(id) {
    try {
      const response = await api.put(`/${id}/pickup`);
      return response.data;
    } catch (error) {
      throw new Error(error.response?.data?.message || 'Error marking prescription as picked up');
    }
  }

  // Format prescription date
  static formatPrescriptionDate(dateString) {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  }

  // Format prescription date with time
  static formatPrescriptionDateTime(dateString) {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
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
      'pending': 'Pending',
      'approved': 'Approved',
      'rejected': 'Rejected',
      'filled': 'Filled',
      'expired': 'Expired',
      'completed': 'Completed'
    };
    return statusMap[status] || status;
  }

  // Get status class for styling
  static getStatusClass(status) {
    const classMap = {
      'pending': 'status-pending',
      'approved': 'status-approved',
      'rejected': 'status-rejected',
      'filled': 'status-filled',
      'expired': 'status-expired',
      'completed': 'status-completed'
    };
    return classMap[status] || 'status-default';
  }

  // Get refill request status display text
  static getRefillStatusDisplayText(status) {
    const statusMap = {
      'pending': 'Pending Review',
      'approved': 'Approved',
      'rejected': 'Rejected'
    };
    return statusMap[status] || status;
  }

  // Get refill request status class for styling
  static getRefillStatusClass(status) {
    const classMap = {
      'pending': 'status-pending',
      'approved': 'status-approved',
      'rejected': 'status-rejected'
    };
    return classMap[status] || 'status-default';
  }

  // Check if prescription can be refilled
  static canRefill(prescription) {
    return prescription.status === 'filled' && 
           prescription.medications.some(med => med.refills > 0) &&
           (prescription.refillRequests.length === 0 || 
            prescription.refillRequests.every(req => req.status !== 'pending'));
  }

  // Get prescription priority display text
  static getPriorityDisplayText(priority) {
    const priorityMap = {
      'routine': 'Routine',
      'urgent': 'Urgent',
      'asap': 'ASAP'
    };
    return priorityMap[priority] || priority;
  }

  // Get prescription priority class for styling
  static getPriorityClass(priority) {
    const classMap = {
      'routine': 'priority-routine',
      'urgent': 'priority-urgent',
      'asap': 'priority-asap'
    };
    return classMap[priority] || 'priority-default';
  }
}

export default PrescriptionService;