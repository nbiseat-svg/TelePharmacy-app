const express = require('express');
const {
  getMedications,
  getMedicationById,
  createMedication,
  updateMedication,
  deleteMedication,
  searchMedicationsByLocation
} = require('../controllers/medicationController');
const { protect, admin } = require('../utils/auth');

const router = express.Router();

router.route('/')
  .get(getMedications)
  .post(protect, admin, createMedication);

router.route('/search/location')
  .get(searchMedicationsByLocation);

router
  .route('/:id')
  .get(getMedicationById)
  .put(protect, admin, updateMedication)
  .delete(protect, admin, deleteMedication);

module.exports = router;