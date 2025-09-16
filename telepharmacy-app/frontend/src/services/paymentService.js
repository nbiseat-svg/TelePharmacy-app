// Payment service to handle different payment methods
class PaymentService {
  // Simulate credit card payment processing
  static async processCreditCardPayment(cardData, amount) {
    return new Promise((resolve, reject) => {
      // Simulate API call delay
      setTimeout(() => {
        // In a real application, this would connect to a payment gateway like Stripe, PayPal, etc.
        // For demo purposes, we'll simulate success/failure based on card number
        if (cardData.cardNumber && cardData.cardNumber.startsWith('4')) {
          // Visa cards (starting with 4) are approved
          resolve({
            success: true,
            transactionId: 'txn_' + Date.now(),
            message: 'Payment processed successfully'
          });
        } else if (cardData.cardNumber && cardData.cardNumber.startsWith('5')) {
          // Mastercard (starting with 5) are approved
          resolve({
            success: true,
            transactionId: 'txn_' + Date.now(),
            message: 'Payment processed successfully'
          });
        } else {
          // Other cards are declined
          reject(new Error('Card declined. Please try another payment method.'));
        }
      }, 2000);
    });
  }

  // Simulate PayPal payment processing
  static async processPayPalPayment(paypalData, amount) {
    return new Promise((resolve, reject) => {
      // Simulate API call delay
      setTimeout(() => {
        // In a real application, this would connect to PayPal's API
        if (paypalData.email && paypalData.email.includes('@')) {
          resolve({
            success: true,
            transactionId: 'pp_' + Date.now(),
            message: 'PayPal payment processed successfully'
          });
        } else {
          reject(new Error('Invalid PayPal email address'));
        }
      }, 1500);
    });
  }

  // Simulate Mobile Money payment processing
  static async processMobileMoneyPayment(mobileData, amount) {
    return new Promise((resolve, reject) => {
      // Simulate API call delay
      setTimeout(() => {
        // In a real application, this would connect to a mobile money provider's API
        if (mobileData.phoneNumber && mobileData.phoneNumber.length >= 10) {
          resolve({
            success: true,
            transactionId: 'mm_' + Date.now(),
            message: 'Mobile money payment processed successfully'
          });
        } else {
          reject(new Error('Invalid phone number'));
        }
      }, 1800);
    });
  }

  // Simulate Bank Transfer payment processing
  static async processBankTransferPayment(bankData, amount) {
    return new Promise((resolve, reject) => {
      // Simulate API call delay
      setTimeout(() => {
        // In a real application, this would connect to a bank transfer API
        if (bankData.accountNumber && bankData.accountNumber.length >= 8 && bankData.bankName) {
          resolve({
            success: true,
            transactionId: 'bt_' + Date.now(),
            message: 'Bank transfer initiated successfully. Please complete the transfer within 24 hours.'
          });
        } else {
          reject(new Error('Invalid bank account information'));
        }
      }, 1600);
    });
  }

  // Simulate Cryptocurrency payment processing
  static async processCryptoPayment(cryptoData, amount) {
    return new Promise((resolve, reject) => {
      // Simulate API call delay
      setTimeout(() => {
        // In a real application, this would connect to a cryptocurrency payment gateway
        if (cryptoData.walletAddress && cryptoData.currency) {
          resolve({
            success: true,
            transactionId: 'crypto_' + Date.now(),
            message: 'Cryptocurrency payment initiated. Please send the required amount to the provided wallet address.',
            walletAddress: cryptoData.walletAddress,
            currency: cryptoData.currency,
            amount: amount
          });
        } else {
          reject(new Error('Invalid cryptocurrency wallet information'));
        }
      }, 1700);
    });
  }

  // Format currency
  static formatCurrency(amount, currency = 'USD') {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: currency
    }).format(amount);
  }

  // Validate credit card number using Luhn algorithm
  static validateCreditCardNumber(cardNumber) {
    const cleaned = cardNumber.replace(/\s+/g, '');
    let sum = 0;
    let isEven = false;

    // Loop through values starting from the rightmost side
    for (let i = cleaned.length - 1; i >= 0; i--) {
      let digit = parseInt(cleaned.charAt(i));

      if (isEven) {
        digit *= 2;
        if (digit > 9) {
          digit -= 9;
        }
      }

      sum += digit;
      isEven = !isEven;
    }

    return sum % 10 === 0;
  }

  // Get card type from number
  static getCardType(cardNumber) {
    const cleaned = cardNumber.replace(/\s+/g, '');
    
    if (/^4/.test(cleaned)) {
      return 'Visa';
    } else if (/^5[1-5]/.test(cleaned)) {
      return 'Mastercard';
    } else if (/^3[47]/.test(cleaned)) {
      return 'American Express';
    } else if (/^6(?:011|5)/.test(cleaned)) {
      return 'Discover';
    } else {
      return 'Unknown';
    }
  }

  // Get available payment methods
  static getPaymentMethods() {
    return [
      {
        id: 'credit-card',
        name: 'Credit/Debit Card',
        description: 'Pay with Visa, Mastercard, or other credit/debit cards',
        icon: '💳',
        available: true
      },
      {
        id: 'paypal',
        name: 'PayPal',
        description: 'Pay with your PayPal account',
        icon: '🅿️',
        available: true
      },
      {
        id: 'mobile-money',
        name: 'Mobile Money',
        description: 'Pay using your mobile money account',
        icon: '📱',
        available: true
      },
      {
        id: 'bank-transfer',
        name: 'Bank Transfer',
        description: 'Pay directly from your bank account',
        icon: '🏦',
        available: true
      },
      {
        id: 'cryptocurrency',
        name: 'Cryptocurrency',
        description: 'Pay with Bitcoin, Ethereum, or other cryptocurrencies',
        icon: '₿',
        available: true
      }
    ];
  }

  // Format phone number for better display
  static formatPhoneNumber(phoneNumber) {
    if (!phoneNumber) return '';
    
    // Remove all non-digit characters
    const cleaned = phoneNumber.replace(/\D/g, '');
    
    // Format as +XXX XXX XXX XXX
    if (cleaned.length >= 10) {
      return `+${cleaned.slice(0, 3)} ${cleaned.slice(3, 6)} ${cleaned.slice(6, 9)} ${cleaned.slice(9, 12)}`;
    }
    
    return phoneNumber;
  }

  // Format card number for better display
  static formatCardNumber(cardNumber) {
    if (!cardNumber) return '';
    
    // Remove all non-digit characters
    const cleaned = cardNumber.replace(/\D/g, '');
    
    // Format as XXXX XXXX XXXX XXXX
    return cleaned.replace(/(\d{4})/g, '$1 ').trim();
  }
}

export default PaymentService;