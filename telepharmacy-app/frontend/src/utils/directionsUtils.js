/**
 * Utility functions for calculating directions between locations in Ethiopia
 */

/**
 * Calculate the distance between two points using the Haversine formula
 * @param {Object} point1 - {lat, lng} coordinates
 * @param {Object} point2 - {lat, lng} coordinates
 * @returns {number} Distance in kilometers
 */
export const calculateDistance = (point1, point2) => {
  const R = 6371; // Earth's radius in kilometers
  const dLat = toRadians(point2.lat - point1.lat);
  const dLon = toRadians(point2.lng - point1.lng);
  
  const a = 
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(toRadians(point1.lat)) * Math.cos(toRadians(point2.lat)) * 
    Math.sin(dLon / 2) * Math.sin(dLon / 2);
    
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return R * c;
};

/**
 * Convert degrees to radians
 * @param {number} degrees 
 * @returns {number} radians
 */
const toRadians = (degrees) => {
  return degrees * (Math.PI / 180);
};

/**
 * Generate mock turn-by-turn directions between two points
 * @param {Object} start - Starting point {lat, lng, name}
 * @param {Object} end - Ending point {lat, lng, name}
 * @returns {Object} Directions object with steps, distance, and duration
 */
export const generateDirections = (start, end) => {
  // Calculate distance
  const distance = calculateDistance(start, end);
  
  // Estimate travel time (assuming 30 km/h average speed)
  const durationHours = distance / 30;
  const durationMinutes = Math.round(durationHours * 60);
  
  // Format duration
  let durationText;
  if (durationMinutes < 60) {
    durationText = `${durationMinutes} min`;
  } else {
    const hours = Math.floor(durationMinutes / 60);
    const minutes = durationMinutes % 60;
    durationText = `${hours} hr ${minutes} min`;
  }
  
  // Generate mock steps based on distance
  const steps = generateMockSteps(start, end, distance);
  
  return {
    distance: `${distance.toFixed(1)} km`,
    duration: durationText,
    steps: steps
  };
};

/**
 * Generate mock turn-by-turn steps
 * @param {Object} start - Starting point
 * @param {Object} end - Ending point
 * @param {number} distance - Distance between points
 * @returns {Array} Array of step objects
 */
const generateMockSteps = (start, end, distance) => {
  // For simplicity, we'll generate 3-5 steps based on distance
  const stepCount = Math.max(3, Math.min(5, Math.floor(distance / 5)));
  
  const steps = [];
  
  // Start step
  steps.push({
    instruction: `Start from ${start.name}`,
    distance: "0 km"
  });
  
  // Intermediate steps
  for (let i = 1; i < stepCount - 1; i++) {
    const percentage = i / (stepCount - 1);
    const intermediateDistance = (distance * percentage).toFixed(1);
    
    // Generate different types of instructions
    const instructions = [
      `Continue straight for ${intermediateDistance} km`,
      `Turn left and continue for ${intermediateDistance} km`,
      `Turn right and continue for ${intermediateDistance} km`,
      `Take the roundabout and continue for ${intermediateDistance} km`,
      `Follow the main road for ${intermediateDistance} km`
    ];
    
    steps.push({
      instruction: instructions[Math.floor(Math.random() * instructions.length)],
      distance: `${intermediateDistance} km`
    });
  }
  
  // Final step
  steps.push({
    instruction: `Arrive at ${end.name}`,
    distance: `${distance.toFixed(1)} km`
  });
  
  return steps;
};

/**
 * Get major Ethiopian cities with coordinates
 * @returns {Array} Array of city objects
 */
export const getEthiopianCities = () => {
  return [
    { name: 'Addis Ababa', lat: 9.0300, lng: 38.7400 },
    { name: 'Hawassa', lat: 7.0500, lng: 38.4833 },
    { name: 'Mekelle', lat: 13.4933, lng: 39.4500 },
    { name: 'Dire Dawa', lat: 9.6000, lng: 41.8667 },
    { name: 'Bahir Dar', lat: 11.5900, lng: 37.3900 },
    { name: 'Adama', lat: 8.5400, lng: 39.2700 },
    { name: 'Gondar', lat: 12.6000, lng: 37.4667 },
    { name: 'Jimma', lat: 7.6733, lng: 36.8333 },
    { name: 'Dessie', lat: 11.1300, lng: 39.6300 },
    { name: 'Debre Markos', lat: 10.3500, lng: 37.7300 }
  ];
};

/**
 * Find the nearest major city to a given coordinate
 * @param {Object} coordinate - {lat, lng} coordinates
 * @returns {Object} Nearest city object
 */
export const findNearestCity = (coordinate) => {
  const cities = getEthiopianCities();
  let nearestCity = cities[0];
  let minDistance = calculateDistance(coordinate, cities[0]);
  
  for (let i = 1; i < cities.length; i++) {
    const distance = calculateDistance(coordinate, cities[i]);
    if (distance < minDistance) {
      minDistance = distance;
      nearestCity = cities[i];
    }
  }
  
  return nearestCity;
};