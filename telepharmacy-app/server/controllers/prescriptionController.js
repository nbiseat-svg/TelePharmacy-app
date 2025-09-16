const Prescription = require('../models/Prescription');
const User = require('../models/User');
const Medication = require('../models/Medication');
const asyncHandler = require('express-async-handler');

// @desc    Create new prescription
// @route   POST /api/prescriptions
// @access  Private/Pharmacist
const createPrescription = asyncHandler(async (req, res) => {
  const { patientId, medications, diagnosis, notes, prescriptionType, priority, patientNotes } = req.body;

  const patient = await User.findById(patientId);
  if (!patient) {
    res.status(404);
    throw new Error('Patient not found');
  }

  // Validate medications exist
  const medicationIds = medications.map(med => med.medication);
  const foundMedications = await Medication.find({
    '_id': { $in: medicationIds }
  });

  if (foundMedications.length !== medicationIds.length) {
    res.status(404);
    throw new Error('One or more medications not found');
  }

  const prescription = new Prescription({
    patient: patientId,
    pharmacist: req.user._id,
    medications,
    diagnosis,
    notes,
    prescriptionType,
    priority,
    patientNotes,
    expiryDate: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000) // 30 days from now
  });

  const createdPrescription = await prescription.save();
  
  // Populate references
  const populatedPrescription = await Prescription.findById(createdPrescription._id)
    .populate('patient', 'name email')
    .populate('pharmacist', 'name email')
    .populate('medications.medication', 'name description');

  res.status(201).json(populatedPrescription);
});

// @desc    Get prescriptions for a patient
// @route   GET /api/prescriptions/patient/:id
// @access  Private
const getPatientPrescriptions = asyncHandler(async (req, res) => {
  const prescriptions = await Prescription.find({ patient: req.params.id })
    .populate('patient', 'name email')
    .populate('pharmacist', 'name email')
    .populate('medications.medication', 'name description')
    .sort({ createdAt: -1 });

  res.json(prescriptions);
});

// @desc    Get prescriptions by pharmacist
// @route   GET /api/prescriptions/pharmacist/:id
// @access  Private
const getPharmacistPrescriptions = asyncHandler(async (req, res) => {
  const prescriptions = await Prescription.find({ pharmacist: req.params.id })
    .populate('patient', 'name email')
    .populate('pharmacist', 'name email')
    .populate('medications.medication', 'name description')
    .sort({ createdAt: -1 });

  res.json(prescriptions);
});

// @desc    Get prescription by ID
// @route   GET /api/prescriptions/:id
// @access  Private
const getPrescriptionById = asyncHandler(async (req, res) => {
  const prescription = await Prescription.findById(req.params.id)
    .populate('patient', 'name email')
    .populate('pharmacist', 'name email')
    .populate('medications.medication', 'name description');

  if (prescription) {
    // Check if user is authorized to view this prescription
    if (prescription.patient._id.toString() !== req.user._id.toString() && 
        prescription.pharmacist._id.toString() !== req.user._id.toString() &&
        req.user.role !== 'admin') {
      res.status(401);
      throw new Error('Not authorized to view this prescription');
    }

    res.json(prescription);
  } else {
    res.status(404);
    throw new Error('Prescription not found');
  }
});

// @desc    Update prescription status
// @route   PUT /api/prescriptions/:id/status
// @access  Private/Pharmacist
const updatePrescriptionStatus = asyncHandler(async (req, res) => {
  const { status } = req.body;

  const prescription = await Prescription.findById(req.params.id);

  if (prescription) {
    // Only pharmacists can update prescription status
    if (prescription.pharmacist.toString() !== req.user._id.toString()) {
      res.status(401);
      throw new Error('Not authorized to update this prescription');
    }

    // Update tracking timestamps
    if (status === 'filled' && !prescription.tracking.filledAt) {
      prescription.tracking.filledAt = Date.now();
    }

    prescription.status = status;
    prescription.tracking.updatedAt = Date.now();
    
    const updatedPrescription = await prescription.save();
    
    // Populate references
    const populatedPrescription = await Prescription.findById(updatedPrescription._id)
      .populate('patient', 'name email')
      .populate('pharmacist', 'name email')
      .populate('medications.medication', 'name description');

    res.json(populatedPrescription);
  } else {
    res.status(404);
    throw new Error('Prescription not found');
  }
});

// @desc    Request prescription refill
// @route   POST /api/prescriptions/:id/refill
// @access  Private/Patient
const requestPrescriptionRefill = asyncHandler(async (req, res) => {
  const prescription = await Prescription.findById(req.params.id);

  if (prescription) {
    // Only patients can request refills for their own prescriptions
    if (prescription.patient.toString() !== req.user._id.toString()) {
      res.status(401);
      throw new Error('Not authorized to request refill for this prescription');
    }

    // Check if prescription is eligible for refill
    if (prescription.status !== 'filled') {
      res.status(400);
      throw new Error('Prescription is not eligible for refill');
    }

    prescription.refillRequests.push({
      status: 'pending'
    });

    const updatedPrescription = await prescription.save();
    
    // Populate references
    const populatedPrescription = await Prescription.findById(updatedPrescription._id)
      .populate('patient', 'name email')
      .populate('pharmacist', 'name email')
      .populate('medications.medication', 'name description');

    res.json(populatedPrescription);
  } else {
    res.status(404);
    throw new Error('Prescription not found');
  }
});

// @desc    Update refill request status
// @route   PUT /api/prescriptions/:id/refill/:refillId
// @access  Private/Pharmacist
const updateRefillRequestStatus = asyncHandler(async (req, res) => {
  const { refillId } = req.params;
  const { status, pharmacistNotes } = req.body;

  const prescription = await Prescription.findById(req.params.id);

  if (prescription) {
    // Only pharmacists can update refill requests
    if (prescription.pharmacist.toString() !== req.user._id.toString()) {
      res.status(401);
      throw new Error('Not authorized to update this prescription');
    }

    // Find the refill request
    const refillRequest = prescription.refillRequests.id(refillId);
    if (!refillRequest) {
      res.status(404);
      throw new Error('Refill request not found');
    }

    // Update refill request
    refillRequest.status = status;
    if (pharmacistNotes) {
      refillRequest.pharmacistNotes = pharmacistNotes;
    }
    
    if (status === 'approved') {
      refillRequest.approvedAt = Date.now();
    } else if (status === 'rejected') {
      refillRequest.rejectedAt = Date.now();
    }

    const updatedPrescription = await prescription.save();
    
    // Populate references
    const populatedPrescription = await Prescription.findById(updatedPrescription._id)
      .populate('patient', 'name email')
      .populate('pharmacist', 'name email')
      .populate('medications.medication', 'name description');

    res.json(populatedPrescription);
  } else {
    res.status(404);
    throw new Error('Prescription not found');
  }
});

// @desc    Add pharmacist notes to prescription
// @route   PUT /api/prescriptions/:id/notes
// @access  Private/Pharmacist
const addPharmacistNotes = asyncHandler(async (req, res) => {
  const { pharmacistNotes } = req.body;

  const prescription = await Prescription.findById(req.params.id);

  if (prescription) {
    // Only pharmacists can add notes
    if (prescription.pharmacist.toString() !== req.user._id.toString()) {
      res.status(401);
      throw new Error('Not authorized to update this prescription');
    }

    prescription.pharmacistNotes = pharmacistNotes;
    prescription.tracking.updatedAt = Date.now();

    const updatedPrescription = await prescription.save();
    
    // Populate references
    const populatedPrescription = await Prescription.findById(updatedPrescription._id)
      .populate('patient', 'name email')
      .populate('pharmacist', 'name email')
      .populate('medications.medication', 'name description');

    res.json(populatedPrescription);
  } else {
    res.status(404);
    throw new Error('Prescription not found');
  }
});

// @desc    Mark prescription as picked up
// @route   PUT /api/prescriptions/:id/pickup
// @access  Private/Pharmacist
const markPrescriptionPickedUp = asyncHandler(async (req, res) => {
  const prescription = await Prescription.findById(req.params.id);

  if (prescription) {
    // Only pharmacists can mark as picked up
    if (prescription.pharmacist.toString() !== req.user._id.toString()) {
      res.status(401);
      throw new Error('Not authorized to update this prescription');
    }

    // Check if prescription is filled
    if (prescription.status !== 'filled') {
      res.status(400);
      throw new Error('Prescription must be filled before marking as picked up');
    }

    prescription.tracking.pickedUpAt = Date.now();
    prescription.status = 'completed';

    const updatedPrescription = await prescription.save();
    
    // Populate references
    const populatedPrescription = await Prescription.findById(updatedPrescription._id)
      .populate('patient', 'name email')
      .populate('pharmacist', 'name email')
      .populate('medications.medication', 'name description');

    res.json(populatedPrescription);
  } else {
    res.status(404);
    throw new Error('Prescription not found');
  }
});

module.exports = {
  createPrescription,
  getPatientPrescriptions,
  getPharmacistPrescriptions,
  getPrescriptionById,
  updatePrescriptionStatus,
  requestPrescriptionRefill,
  updateRefillRequestStatus,
  addPharmacistNotes,
  markPrescriptionPickedUp
};