const Consultation = require('../models/Consultation');
const User = require('../models/User');
const asyncHandler = require('express-async-handler');

// @desc    Create new consultation
// @route   POST /api/consultations
// @access  Private
const createConsultation = asyncHandler(async (req, res) => {
  const { pharmacistId, type, scheduledAt, duration, notes } = req.body;

  const pharmacist = await User.findById(pharmacistId);
  if (!pharmacist || pharmacist.role !== 'pharmacist') {
    res.status(404);
    throw new Error('Pharmacist not found');
  }

  // Check for scheduling conflicts
  const existingConsultations = await Consultation.find({
    pharmacist: pharmacistId,
    scheduledAt: {
      $gte: new Date(scheduledAt),
      $lt: new Date(new Date(scheduledAt).getTime() + duration * 60000)
    },
    status: { $in: ['scheduled', 'in-progress'] }
  });

  if (existingConsultations.length > 0) {
    res.status(400);
    throw new Error('Pharmacist is not available at the selected time');
  }

  const consultation = new Consultation({
    patient: req.user._id,
    pharmacist: pharmacistId,
    type,
    scheduledAt,
    duration,
    notes
  });

  const createdConsultation = await consultation.save();
  
  // Populate references
  const populatedConsultation = await Consultation.findById(createdConsultation._id)
    .populate('patient', 'name email')
    .populate('pharmacist', 'name email');

  res.status(201).json(populatedConsultation);
});

// @desc    Get consultations for a patient
// @route   GET /api/consultations/patient/:id
// @access  Private
const getPatientConsultations = asyncHandler(async (req, res) => {
  const consultations = await Consultation.find({ patient: req.params.id })
    .populate('patient', 'name email')
    .populate('pharmacist', 'name email')
    .sort({ scheduledAt: -1 });

  res.json(consultations);
});

// @desc    Get consultations by pharmacist
// @route   GET /api/consultations/pharmacist/:id
// @access  Private
const getPharmacistConsultations = asyncHandler(async (req, res) => {
  const consultations = await Consultation.find({ pharmacist: req.params.id })
    .populate('patient', 'name email')
    .populate('pharmacist', 'name email')
    .sort({ scheduledAt: -1 });

  res.json(consultations);
});

// @desc    Get consultation by ID
// @route   GET /api/consultations/:id
// @access  Private
const getConsultationById = asyncHandler(async (req, res) => {
  const consultation = await Consultation.findById(req.params.id)
    .populate('patient', 'name email')
    .populate('pharmacist', 'name email');

  if (consultation) {
    // Check if user is authorized to view this consultation
    if (consultation.patient._id.toString() !== req.user._id.toString() && 
        consultation.pharmacist._id.toString() !== req.user._id.toString() &&
        req.user.role !== 'admin') {
      res.status(401);
      throw new Error('Not authorized to view this consultation');
    }

    res.json(consultation);
  } else {
    res.status(404);
    throw new Error('Consultation not found');
  }
});

// @desc    Update consultation status
// @route   PUT /api/consultations/:id/status
// @access  Private
const updateConsultationStatus = asyncHandler(async (req, res) => {
  const { status } = req.body;

  const consultation = await Consultation.findById(req.params.id);

  if (consultation) {
    // Check if user is authorized to update this consultation
    if (consultation.patient._id.toString() !== req.user._id.toString() && 
        consultation.pharmacist._id.toString() !== req.user._id.toString() &&
        req.user.role !== 'admin') {
      res.status(401);
      throw new Error('Not authorized to update this consultation');
    }

    consultation.status = status;
    const updatedConsultation = await consultation.save();
    
    // Populate references
    const populatedConsultation = await Consultation.findById(updatedConsultation._id)
      .populate('patient', 'name email')
      .populate('pharmacist', 'name email');

    res.json(populatedConsultation);
  } else {
    res.status(404);
    throw new Error('Consultation not found');
  }
});

// @desc    Add feedback to consultation
// @route   PUT /api/consultations/:id/feedback
// @access  Private
const addConsultationFeedback = asyncHandler(async (req, res) => {
  const { rating, feedback } = req.body;

  const consultation = await Consultation.findById(req.params.id);

  if (consultation) {
    // Only patients can add feedback
    if (consultation.patient.toString() !== req.user._id.toString()) {
      res.status(401);
      throw new Error('Not authorized to add feedback for this consultation');
    }

    // Can only add feedback to completed consultations
    if (consultation.status !== 'completed') {
      res.status(400);
      throw new Error('Can only add feedback to completed consultations');
    }

    consultation.rating = rating;
    consultation.feedback = feedback;
    
    const updatedConsultation = await consultation.save();
    
    // Populate references
    const populatedConsultation = await Consultation.findById(updatedConsultation._id)
      .populate('patient', 'name email')
      .populate('pharmacist', 'name email');

    res.json(populatedConsultation);
  } else {
    res.status(404);
    throw new Error('Consultation not found');
  }
});

module.exports = {
  createConsultation,
  getPatientConsultations,
  getPharmacistConsultations,
  getConsultationById,
  updateConsultationStatus,
  addConsultationFeedback,
};