const Medication = require('../models/Medication');
const asyncHandler = require('express-async-handler');

// @desc    Fetch all medications
// @route   GET /api/medications
// @access  Public
const getMedications = asyncHandler(async (req, res) => {
  const pageSize = 12;
  const page = Number(req.query.pageNumber) || 1;

  const keyword = req.query.keyword
    ? {
        name: {
          $regex: req.query.keyword,
          $options: 'i',
        },
      }
    : {};

  const category = req.query.category
    ? {
        category: {
          $regex: req.query.category,
          $options: 'i',
        },
      }
    : {};

  const matchCriteria = { ...keyword, ...category };

  const count = await Medication.countDocuments(matchCriteria);
  const medications = await Medication.find(matchCriteria)
    .limit(pageSize)
    .skip(pageSize * (page - 1));

  res.json({
    medications,
    page,
    pages: Math.ceil(count / pageSize),
  });
});

// @desc    Fetch single medication
// @route   GET /api/medications/:id
// @access  Public
const getMedicationById = asyncHandler(async (req, res) => {
  const medication = await Medication.findById(req.params.id);

  if (medication) {
    res.json(medication);
  } else {
    res.status(404);
    throw new Error('Medication not found');
  }
});

// @desc    Create a medication
// @route   POST /api/medications
// @access  Private/Admin
const createMedication = asyncHandler(async (req, res) => {
  const medication = new Medication({
    name: 'Sample name',
    price: 0,
    user: req.user._id,
    image: '/images/sample.jpg',
    category: 'Sample category',
    description: 'Sample description',
  });

  const createdMedication = await medication.save();
  res.status(201).json(createdMedication);
});

// @desc    Update a medication
// @route   PUT /api/medications/:id
// @access  Private/Admin
const updateMedication = asyncHandler(async (req, res) => {
  const { name, price, description, image, category } = req.body;

  const medication = await Medication.findById(req.params.id);

  if (medication) {
    medication.name = name;
    medication.price = price;
    medication.description = description;
    medication.image = image;
    medication.category = category;

    const updatedMedication = await medication.save();
    res.json(updatedMedication);
  } else {
    res.status(404);
    throw new Error('Medication not found');
  }
});

// @desc    Delete a medication
// @route   DELETE /api/medications/:id
// @access  Private/Admin
const deleteMedication = asyncHandler(async (req, res) => {
  const medication = await Medication.findById(req.params.id);

  if (medication) {
    await medication.remove();
    res.json({ message: 'Medication removed' });
  } else {
    res.status(404);
    throw new Error('Medication not found');
  }
});

// @desc    Search medications by location
// @route   GET /api/medications/search/location
// @access  Public
const searchMedicationsByLocation = asyncHandler(async (req, res) => {
  const { medicationName, latitude, longitude, radius } = req.query;

  // This would use geospatial queries in a real implementation
  // For now, we'll return a sample response
  const medications = await Medication.find({
    name: { $regex: medicationName, $options: 'i' },
    'pharmacyLocations.quantity': { $gt: 0 }
  });

  res.json({
    medications,
    location: { latitude, longitude },
    radius
  });
});

module.exports = {
  getMedications,
  getMedicationById,
  createMedication,
  updateMedication,
  deleteMedication,
  searchMedicationsByLocation,
};