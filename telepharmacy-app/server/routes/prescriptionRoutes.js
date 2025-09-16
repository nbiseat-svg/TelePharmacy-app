const express = require('express');
const {
  createPrescription,
  getPatientPrescriptions,
  getPharmacistPrescriptions,
  getPrescriptionById,
  updatePrescriptionStatus,
  requestPrescriptionRefill,
  updateRefillRequestStatus,
  addPharmacistNotes,
  markPrescriptionPickedUp
} = require('../controllers/prescriptionController');
const { protect, pharmacist, admin } = require('../utils/auth');

const router = express.Router();

router.route('/')
  .post(protect, pharmacist, createPrescription);

router.route('/patient/:id')
  .get(protect, getPatientPrescriptions);

router.route('/pharmacist/:id')
  .get(protect, pharmacist, getPharmacistPrescriptions);

router.route('/:id')
  .get(protect, getPrescriptionById);

router.route('/:id/status')
  .put(protect, pharmacist, updatePrescriptionStatus);

router.route('/:id/refill')
  .post(protect, requestPrescriptionRefill);

router.route('/:id/refill/:refillId')
  .put(protect, pharmacist, updateRefillRequestStatus);

router.route('/:id/notes')
  .put(protect, pharmacist, addPharmacistNotes);

router.route('/:id/pickup')
  .put(protect, pharmacist, markPrescriptionPickedUp);

module.exports = router;