/**
 * Utility functions for currency formatting
 */

/**
 * Format price in Ethiopian Birr (ETB)
 * @param {number} amount - The amount to format
 * @returns {string} Formatted price with ETB currency
 */
export const formatPriceETB = (amount) => {
  return new Intl.NumberFormat('en-ET', {
    style: 'currency',
    currency: 'ETB',
    minimumFractionDigits: 2,
    maximumFractionDigits: 2
  }).format(amount);
};

/**
 * Convert USD to ETB (using approximate exchange rate)
 * @param {number} usdAmount - Amount in USD
 * @param {number} exchangeRate - Exchange rate (ETB per USD)
 * @returns {number} Amount in ETB
 */
export const convertToETB = (usdAmount, exchangeRate = 55) => {
  return usdAmount * exchangeRate;
};