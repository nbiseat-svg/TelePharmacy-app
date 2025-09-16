const express = require('express');
const {
  createConsultation,
  getPatientConsultations,
  getPharmacistConsultations,
  getConsultationById,
  updateConsultationStatus,
  addConsultationFeedback
} = require('../controllers/consultationController');
const { protect, pharmacist, admin } = require('../utils/auth');

const router = express.Router();

router.route('/')
  .post(protect, createConsultation);

router.route('/patient/:id')
  .get(protect, getPatientConsultations);

router.route('/pharmacist/:id')
  .get(protect, pharmacist, getPharmacistConsultations);

router.route('/:id')
  .get(protect, getConsultationById);

router.route('/:id/status')
  .put(protect, updateConsultationStatus);

router.route('/:id/feedback')
  .put(protect, addConsultationFeedback);

module.exports = router;