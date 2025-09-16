import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

// Translation resources
const resources = {
  en: {
    translation: {
      // Common
      "welcome": "Welcome to TelePharmacy",
      "login": "Login",
      "register": "Register",
      "logout": "Logout",
      "profile": "Profile",
      "dashboard": "Dashboard",
      "search": "Search",
      "cart": "Cart",
      "orders": "Orders",
      "prescriptions": "Prescriptions",
      "consultations": "Consultations",
      "pharmacyFinder": "Pharmacy Finder",
      "admin": "Admin",
      "save": "Save",
      "cancel": "Cancel",
      "delete": "Delete",
      "edit": "Edit",
      "view": "View",
      "add": "Add",
      "remove": "Remove",
      "update": "Update",
      "submit": "Submit",
      "loading": "Loading...",
      "error": "Error",
      "success": "Success",
      
      // Navigation
      "home": "Home",
      "medications": "Medications",
      "catalog": "Catalog",
      "checkout": "Checkout",
      "payment": "Payment",
      "delivery": "Delivery Tracking",
      
      // Authentication
      "email": "Email",
      "password": "Password",
      "name": "Name",
      "phone": "Phone",
      "address": "Address",
      "confirmPassword": "Confirm Password",
      "alreadyHaveAccount": "Already have an account? Login",
      "dontHaveAccount": "Don't have an account? Register",
      "forgotPassword": "Forgot Password?",
      
      // Profile
      "personalInfo": "Personal Information",
      "updateProfile": "Update Profile",
      "changePassword": "Change Password",
      
      // Medications
      "medicationCatalog": "Medication Catalog",
      "medicationDetail": "Medication Detail",
      "price": "Price",
      "description": "Description",
      "dosage": "Dosage",
      "sideEffects": "Side Effects",
      "contraindications": "Contraindications",
      "addToCart": "Add to Cart",
      
      // Cart
      "shoppingCart": "Shopping Cart",
      "item": "Item",
      "quantity": "Quantity",
      "total": "Total",
      "proceedToCheckout": "Proceed to Checkout",
      "continueShopping": "Continue Shopping",
      "emptyCart": "Your cart is empty",
      
      // Orders
      "orderHistory": "Order History",
      "orderDetails": "Order Details",
      "orderNumber": "Order Number",
      "orderDate": "Order Date",
      "orderStatus": "Order Status",
      "orderTotal": "Order Total",
      "placeOrder": "Place Order",
      
      // Prescriptions
      "prescriptionManagement": "Prescription Management",
      "prescriptionList": "Prescription List",
      "prescriptionDetail": "Prescription Detail",
      "prescriptionStatus": "Prescription Status",
      "refillRequest": "Refill Request",
      
      // Consultations
      "consultationBooking": "Consultation Booking",
      "consultationHistory": "Consultation History",
      "bookConsultation": "Book Consultation",
      "consultationType": "Consultation Type",
      "video": "Video",
      "chat": "Chat",
      "audio": "Audio",
      "schedule": "Schedule",
      
      // Pharmacy Finder
      "findPharmacy": "Find Pharmacy",
      "medicineSearch": "Medicine Search",
      "location": "Location",
      "distance": "Distance",
      "availability": "Availability",
      
      // Admin
      "adminDashboard": "Admin Dashboard",
      "manageUsers": "Manage Users",
      "manageMedications": "Manage Medications",
      "manageOrders": "Manage Orders",
      "managePrescriptions": "Manage Prescriptions",
      "reports": "Reports",
      
      // Delivery
      "deliveryTracking": "Delivery Tracking",
      "trackingNumber": "Tracking Number",
      "estimatedDelivery": "Estimated Delivery",
      "deliveryStatus": "Delivery Status",
      
      // Payment
      "paymentMethod": "Payment Method",
      "creditCard": "Credit Card",
      "mobileMoney": "Mobile Money",
      "cashOnDelivery": "Cash on Delivery",
      "payNow": "Pay Now",
      
      // Languages
      "english": "English",
      "amharic": "Amharic",
      "tigrigna": "Tigrigna",
      "oromo": "Oromo",
      "language": "Language"
    }
  },
  am: {
    translation: {
      // Common
      "welcome": "ቴሌፎርማሲ ወደ መለስ",
      "login": "ግባ",
      "register": "ተመዝገብ",
      "logout": "ውጣ",
      "profile": "መገለጫ",
      "dashboard": "ዳሽቦርድ",
      "search": "ፈልግ",
      "cart": "መያዣ",
      "orders": "ትዕዛዞች",
      "prescriptions": "የመድሃኒት ቅጾች",
      "consultations": "የማማከር ዕለት ተቀባይነት",
      "pharmacyFinder": "ፋርማሲ ፈላጊ",
      "admin": "አስተዳዳሪ",
      "save": "አስቀምጥ",
      "cancel": "ሰርዝ",
      "delete": "አጥፋ",
      "edit": "አርትዕ",
      "view": "ተመልከት",
      "add": "አክል",
      "remove": "አስወግድ",
      "update": "አዘምን",
      "submit": "አስገባ",
      "loading": "በመጫን ላይ...",
      "error": "ስህተት",
      "success": "ተሳክቷል",
      
      // Navigation
      "home": "መነሻ",
      "medications": "መድሃኒቶች",
      "catalog": "ካታሎግ",
      "checkout": "ክፍያ",
      "payment": "ክፍያ",
      "delivery": "የመላኪያ መከታተል",
      
      // Authentication
      "email": "ኢሜይል",
      "password": "የይለፍ ቃል",
      "name": "ስም",
      "phone": "ስልክ",
      "address": "አድራሻ",
      "confirmPassword": "የይለፍ ቃል ያረጋግጡ",
      "alreadyHaveAccount": "መለያ አለዎት? ግባ",
      "dontHaveAccount": "መለያ የለዎትም? ይመዝገቡ",
      "forgotPassword": "የይለፍ ቃል ተረሳዎት?",
      
      // Profile
      "personalInfo": "የግል መረጃ",
      "updateProfile": "መገለጫ ያዘምኑ",
      "changePassword": "የይለፍ ቃል ይቀይሩ",
      
      // Medications
      "medicationCatalog": "የመድሃኒት ካታሎግ",
      "medicationDetail": "የመድሃኒት ዝርዝር",
      "price": "ዋጋ",
      "description": "መግለጫ",
      "dosage": "መጠን",
      "sideEffects": "የተጋጋሚ ተጽእኖዎች",
      "contraindications": "የማይገባበት ሁኔታዎች",
      "addToCart": "ወደ መያዣ ያክሉ",
      
      // Cart
      "shoppingCart": "የግዢ መያዣ",
      "item": "እቃ",
      "quantity": "ብዛት",
      "total": "ጠቅላላ",
      "proceedToCheckout": "ወደ ክፍያ ይቀጥሉ",
      "continueShopping": "ግዢዎን ይቀጥሉ",
      "emptyCart": "መያዣዎ ባዶ ነው",
      
      // Orders
      "orderHistory": "የትዕዛዝ ታሪክ",
      "orderDetails": "የትዕዛዝ ዝርዝር",
      "orderNumber": "የትዕዛዝ ቁጥር",
      "orderDate": "የትዕዛዝ ቀን",
      "orderStatus": "የትዕዛዝ ሁኔታ",
      "orderTotal": "ጠቅላላ ዋጋ",
      "placeOrder": "ትዕዛዝ ያድርጉ",
      
      // Prescriptions
      "prescriptionManagement": "የመድሃኒት ቅጽ አስተዳደር",
      "prescriptionList": "የመድሃኒት ቅጾች ዝርዝር",
      "prescriptionDetail": "የመድሃኒት ቅጽ ዝርዝር",
      "prescriptionStatus": "የመድሃኒት ቅጽ ሁኔታ",
      "refillRequest": "እንደገና ማቅረብ ጥያቄ",
      
      // Consultations
      "consultationBooking": "የማማከር ዕለት ተቀባይነት",
      "consultationHistory": "የማማከር ታሪክ",
      "bookConsultation": "የማማከር ዕለት ያስቀምጡ",
      "consultationType": "የማማከር ዓይነት",
      "video": "ቪዲዮ",
      "chat": "ውይይት",
      "audio": "ድምፅ",
      "schedule": "የተቀመጠ",
      
      // Pharmacy Finder
      "findPharmacy": "ፋርማሲ ፈልግ",
      "medicineSearch": "መድሃኒት ፍለጋ",
      "location": "አካባቢ",
      "distance": "ርቀት",
      "availability": "ተገኝነት",
      
      // Admin
      "adminDashboard": "የአስተዳዳሪ ዳሽቦርድ",
      "manageUsers": "ተጠቃሚዎችን ያስተዳድሩ",
      "manageMedications": "መድሃኒቶችን ያስተዳድሩ",
      "manageOrders": "ትዕዛዞችን ያስተዳድሩ",
      "managePrescriptions": "የመድሃኒት ቅጾችን ያስተዳድሩ",
      "reports": "ሪፖርቶች",
      
      // Delivery
      "deliveryTracking": "የመላኪያ መከታተል",
      "trackingNumber": "የመከታተያ ቁጥር",
      "estimatedDelivery": "የተገመተ መላኪያ",
      "deliveryStatus": "የመላኪያ ሁኔታ",
      
      // Payment
      "paymentMethod": "የክፍያ ዘዴ",
      "creditCard": "ክሬዲት ካርድ",
      "mobileMoney": "ሞባይል ገንዘብ",
      "cashOnDelivery": "በመላኪያ ጊዜ የመክፈያ",
      "payNow": "አሁን ይክፈሉ",
      
      // Languages
      "english": "እንግሊዝኛ",
      "amharic": "አማርኛ",
      "tigrigna": "ትግርኛ",
      "oromo": "ኦሮሞኛ",
      "language": "ቋንቋ"
    }
  },
  ti: {
    translation: {
      // Common
      "welcome": "ናብ ቴሌፎርማሲ እንኳን ደህና መጻእኩም",
      "login": "መግቢት",
      "register": "ምዝገብ",
      "logout": "መውጻእ",
      "profile": "ፕሮፋይል",
      "dashboard": "ዳሽቦርድ",
      "search": "ፈልግ",
      "cart": "ካርት",
      "orders": "ኣዘጋጅ",
      "prescriptions": "ሪሴፕት",
      "consultations": "ኮንሰልቴሽን",
      "pharmacyFinder": "ፋርማሲ ክፈል",
      "admin": "አስተዳዳሪ",
      "save": "ኣቐምጥ",
      "cancel": "ሰርዝ",
      "delete": "ደምስ",
      "edit": "አርትዕ",
      "view": "ተመልከት",
      "add": "መጨናቕ",
      "remove": "ኣወግድ",
      "update": "ኣዘምን",
      "submit": "ኣስገባ",
      "loading": "እስካ በር ግበር...",
      "error": "ስህተት",
      "success": "ተሳክቷል",
      
      // Navigation
      "home": "መነሻ",
      "medications": "መድሃኒቶች",
      "catalog": "ካታሎግ",
      "checkout": "ክፍያ",
      "payment": "ክፍያ",
      "delivery": "የመላኪያ መከታተል",
      
      // Authentication
      "email": "ኢሜይል",
      "password": "የይለፍ ቃል",
      "name": "ስም",
      "phone": "ስልክ",
      "address": "አድራሻ",
      "confirmPassword": "የይለፍ ቃል ያረጋግጡ",
      "alreadyHaveAccount": "መለያ አለዎት? ግባ",
      "dontHaveAccount": "መለያ የለዎትም? ይመዝገቡ",
      "forgotPassword": "የይለፍ ቃል ተረሳዎት?",
      
      // Profile
      "personalInfo": "የግል መረጃ",
      "updateProfile": "መገለጫ ያዘምኑ",
      "changePassword": "የይለፍ ቃል ይቀይሩ",
      
      // Medications
      "medicationCatalog": "የመድሃኒት ካታሎግ",
      "medicationDetail": "የመድሃኒት ዝርዝር",
      "price": "ዋጋ",
      "description": "መግለጫ",
      "dosage": "መጠን",
      "sideEffects": "የተጋጋሚ ተጽእኖዎች",
      "contraindications": "የማይገባበት ሁኔታዎች",
      "addToCart": "ወደ መያዣ ያክሉ",
      
      // Cart
      "shoppingCart": "የግዢ መያዣ",
      "item": "እቃ",
      "quantity": "ብዛት",
      "total": "ጠቅላላ",
      "proceedToCheckout": "ወደ ክፍያ ይቀጥሉ",
      "continueShopping": "ግዢዎን ይቀጥሉ",
      "emptyCart": "መያዣዎ ባዶ ነው",
      
      // Orders
      "orderHistory": "የትዕዛዝ ታሪክ",
      "orderDetails": "የትዕዛዝ ዝርዝር",
      "orderNumber": "የትዕዛዝ ቁጥር",
      "orderDate": "የትዕዛዝ ቀን",
      "orderStatus": "የትዕዛዝ ሁኔታ",
      "orderTotal": "ጠቅላላ ዋጋ",
      "placeOrder": "ትዕዛዝ ያድርጉ",
      
      // Prescriptions
      "prescriptionManagement": "የመድሃኒት ቅጽ አስተዳደር",
      "prescriptionList": "የመድሃኒት ቅጾች ዝርዝር",
      "prescriptionDetail": "የመድሃኒት ቅጽ ዝርዝር",
      "prescriptionStatus": "የመድሃኒት ቅጽ ሁኔታ",
      "refillRequest": "እንደገና ማቅረብ ጥያቄ",
      
      // Consultations
      "consultationBooking": "የማማከር ዕለት ተቀባይነት",
      "consultationHistory": "የማማከር ታሪክ",
      "bookConsultation": "የማማከር ዕለት ያስቀምጡ",
      "consultationType": "የማማከር ዓይነት",
      "video": "ቪዲዮ",
      "chat": "ውይይት",
      "audio": "ድምፅ",
      "schedule": "የተቀመጠ",
      
      // Pharmacy Finder
      "findPharmacy": "ፋርማሲ ፈልግ",
      "medicineSearch": "መድሃኒት ፍለጋ",
      "location": "አካባቢ",
      "distance": "ርቀት",
      "availability": "ተገኝነት",
      
      // Admin
      "adminDashboard": "የአስተዳዳሪ ዳሽቦርድ",
      "manageUsers": "ተጠቃሚዎችን ያስተዳድሩ",
      "manageMedications": "መድሃኒቶችን ያስተዳድሩ",
      "manageOrders": "ትዕዛዞችን ያስተዳድሩ",
      "managePrescriptions": "የመድሃኒት ቅጾችን ያስተዳድሩ",
      "reports": "ሪፖርቶች",
      
      // Delivery
      "deliveryTracking": "የመላኪያ መከታተል",
      "trackingNumber": "የመከታተያ ቁጥር",
      "estimatedDelivery": "የተገመተ መላኪያ",
      "deliveryStatus": "የመላኪያ ሁኔታ",
      
      // Payment
      "paymentMethod": "የክፍያ ዘዴ",
      "creditCard": "ክሬዲት ካርድ",
      "mobileMoney": "ሞባይል ገንዘብ",
      "cashOnDelivery": "በመላኪያ ጊዜ የመክፈያ",
      "payNow": "አሁን ይክፈሉ",
      
      // Languages
      "english": "እንግሊዝኛ",
      "amharic": "አማርኛ",
      "tigrigna": "ትግርኛ",
      "oromo": "ኦሮሞኛ",
      "language": "ቋንቋ"
    }
  },
  om: {
    translation: {
      // Common
      "welcome": "TelePharmacy keessan dhufte",
      "login": "Seeni",
      "register": "Galmeessi",
      "logout": "Ba'i",
      "profile": "Profaayilii",
      "dashboard": "Daashiboodii",
      "search": "Barbaadi",
      "cart": "Kaartii",
      "orders": "Ajaja",
      "prescriptions": "Resipiiwwan",
      "consultations": "Konsultaashinii",
      "pharmacyFinder": "Phaarmaasii Barbaadi",
      "admin": "Admin",
      "save": "Olkaa'i",
      "cancel": "Dhiisi",
      "delete": "Balleessi",
      "edit": "Gulaali",
      "view": "Ilaali",
      "add": "Ida'i",
      "remove": "Buqqisi",
      "update": "Haaromsi",
      "submit": "Galchi",
      "loading": "Ho'aa jira...",
      "error": "Dogoggora",
      "success": "Milkii",
      
      // Navigation
      "home": "Mana",
      "medications": "Qorichoota",
      "catalog": "Kataaloogii",
      "checkout": "Kuusaa",
      "payment": "Kuusaa",
      "delivery": "Ergaa Irra Oola",
      
      // Authentication
      "email": "Imeelii",
      "password": "Jechi iccitii",
      "name": "Maqaa",
      "phone": "Bilbilaa",
      "address": "Teessoo",
      "confirmPassword": "Jechi iccitii mirkaneessi",
      "alreadyHaveAccount": "Akkaawuntii qabdu? Seeni",
      "dontHaveAccount": "Akkaawuntii hin qabdu? Galmeessi",
      "forgotPassword": "Jechi iccitii dhorkaa?",
      
      // Profile
      "personalInfo": "Odeeffannoo Matuu",
      "updateProfile": "Profaayilii Haaromsi",
      "changePassword": "Jechi iccitii Jijjiiri",
      
      // Medications
      "medicationCatalog": "Kataaloogii Qorichoota",
      "medicationDetail": "Bal'ina Qorichaa",
      "price": "Gatii",
      "description": "Ibsa",
      "dosage": "Hamma",
      "sideEffects": "Bu'aa Galan",
      "contraindications": "Haala Hin Gabbabu",
      "addToCart": "Kaartii Keessatti Ida'i",
      
      // Cart
      "shoppingCart": "Kaartii Tajaajilaa",
      "item": "Wantii",
      "quantity": "Hamma",
      "total": "Waliigalaa",
      "proceedToCheckout": "Kuusaa Irratti Deemi",
      "continueShopping": "Tajaajilaa Itti Fufi",
      "emptyCart": "Kaartiin keessan duwwaa dha",
      
      // Orders
      "orderHistory": "Seenaa Ajaja",
      "orderDetails": "Bal'ina Ajajaa",
      "orderNumber": "Lakkoofsa Ajajaa",
      "orderDate": "Guyyaa Ajajaa",
      "orderStatus": "Haala Ajajaa",
      "orderTotal": "Waliigalaa Gatii",
      "placeOrder": "Ajaja Galchi",
      
      // Prescriptions
      "prescriptionManagement": "Hojii Resipiiwwan",
      "prescriptionList": "Tarree Resipiiwwan",
      "prescriptionDetail": "Bal'ina Resipii",
      "prescriptionStatus": "Haala Resipii",
      "refillRequest": "Gaaffii Deebi'aa",
      
      // Consultations
      "consultationBooking": "Konsultaashinii Galmeessi",
      "consultationHistory": "Seenaa Konsultaashinii",
      "bookConsultation": "Konsultaashinii Galmeessi",
      "consultationType": "Gosa Konsultaashinii",
      "video": "Viidiyoo",
      "chat": "Haasaa",
      "audio": "Sagalee",
      "schedule": "Yeroo Galmaa'aa",
      
      // Pharmacy Finder
      "findPharmacy": "Phaarmaasii Barbaadi",
      "medicineSearch": "Barbaacha Qorichaa",
      "location": "Bakka",
      "distance": "Fageenya",
      "availability": "Jireenya",
      
      // Admin
      "adminDashboard": "Daashiboodii Admin",
      "manageUsers": "Fayyadamaa Hundaara",
      "manageMedications": "Qorichoota Hundaara",
      "manageOrders": "Ajaja Hundaara",
      "managePrescriptions": "Resipiiwwan Hundaara",
      "reports": "Gabaasa",
      
      // Delivery
      "deliveryTracking": "Ergaa Irra Oola",
      "trackingNumber": "Lakkoofsa Irra Oolaa",
      "estimatedDelivery": "Erga Eegamaa",
      "deliveryStatus": "Haala Ergaa",
      
      // Payment
      "paymentMethod": "Bu'aati Kuusaa",
      "creditCard": "Kaardii Kireeditii",
      "mobileMoney": "Mooneyii Moobaayilii",
      "cashOnDelivery": "Kuusaa Erga Irra Oolaa",
      "payNow": "Amma Kuusi",
      
      // Languages
      "english": "Afaan Ingilizii",
      "amharic": "Afaan Amharic",
      "tigrigna": "Afaan Tigrigna",
      "oromo": "Afaan Oromoo",
      "language": "Afaan"
    }
  }
};

i18n
  .use(initReactI18next)
  .init({
    resources,
    lng: 'en', // default language
    fallbackLng: 'en',
    interpolation: {
      escapeValue: false
    }
  });

export default i18n;