# TelePharmacy Application

A comprehensive telepharmacy application that enables remote pharmaceutical services. This application connects patients with pharmacists through a digital platform, allowing for remote consultations, prescription management, and medication delivery.

## Features

- **User Authentication**: Secure login and registration system with role-based access
- **Medication Catalog**: Comprehensive database of medications with detailed information
- **Shopping Cart & Orders**: Easy medication ordering with cart management
- **Pharmacy Finder**: Location-based pharmacy search with map integration
- **Payment Processing**: Secure payment handling with multiple payment options
- **Prescription Management**: Digital prescription creation and tracking
- **Teleconsultation**: Video, chat, and audio consultation with pharmacists
- **Delivery Tracking**: Real-time order tracking and delivery status updates
- **Multi-language Support**: English, Amharic, Tigrigna, and Oromo language support
- **Offline Functionality**: Progressive Web App features for offline access
- **Modern UI/UX**: Responsive design with smooth animations and professional styling

## Technology Stack

### Frontend
- React.js
- Vite
- Redux Toolkit
- React Router
- Framer Motion
- i18next (Internationalization)
- Axios

### Backend
- Node.js
- Express.js
- MongoDB (Mongoose)
- JWT Authentication
- bcryptjs
- Socket.io

## Prerequisites

- Node.js (v14 or higher)
- npm or yarn
- MongoDB database

## Installation

1. **Clone the repository:**
   ```bash
   git clone <repository-url>
   cd telepharmacy-app
   ```

2. **Install backend dependencies:**
   ```bash
   cd server
   npm install
   ```

3. **Install frontend dependencies:**
   ```bash
   cd ../frontend
   npm install
   ```

4. **Environment Setup:**
   - Create a `.env` file in the `server` directory
   - Add your MongoDB connection string and other environment variables

## Running the Application

### Development Mode

1. **Start the backend server:**
   ```bash
   cd server
   npm run dev
   ```

2. **Start the frontend development server:**
   ```bash
   cd frontend
   npm run dev
   ```

3. **Access the application:**
   Open your browser and navigate to `http://localhost:3000`

### Production Mode

1. **Build the frontend:**
   ```bash
   cd frontend
   npm run build
   ```

2. **Start the server:**
   ```bash
   cd server
   npm start
   ```

## Project Structure

```
telepharmacy-app/
├── frontend/              # React frontend application
│   ├── src/
│   │   ├── components/    # Reusable UI components
│   │   ├── pages/         # Page components
│   │   ├── services/      # API service files
│   │   ├── utils/         # Utility functions
│   │   ├── reducers/      # Redux reducers
│   │   ├── actions/       # Redux actions
│   │   ├── assets/        # Images and static assets
│   │   ├── App.jsx        # Main application component
│   │   ├── main.jsx       # Entry point
│   │   ├── store.js       # Redux store configuration
│   │   ├── i18n.js        # Internationalization setup
│   │   ├── serviceWorker.js # PWA service worker
│   │   ├── App.css        # Main application styles
│   │   ├── index.css      # Global styles
│   │   ├── animations.css # Animation styles
│   │   └── utils/
│   │       ├── animations.js # Animation utilities
│   │       └── networkOptimizer.js # Network optimization utilities
│   ├── index.html         # HTML template
│   ├── vite.config.js     # Vite configuration
│   └── package.json       # Frontend dependencies
├── server/                # Node.js backend server
│   ├── controllers/       # Request handlers
│   ├── models/            # Database models
│   ├── routes/            # API routes
│   ├── utils/             # Utility functions
│   ├── config/            # Configuration files
│   ├── server.js          # Main server file
│   ├── package.json       # Backend dependencies
│   └── .env               # Environment variables
├── README.md              # This file
├── FINAL_SUMMARY.md       # Implementation summary
├── ENHANCEMENT_PLAN.md    # Feature implementation plan
├── architecture.md        # System architecture
├── components.md          # Component documentation
└── SUMMARY.md             # Project summary
```

## Multi-language Support

The application supports multiple languages:
- English (default)
- Amharic (አማርኛ)
- Tigrigna (ትግርኛ)
- Oromo (Afaan Oromoo)

Users can switch languages using the language selector in the header.

## Progressive Web App (PWA) Features

The application includes PWA features for enhanced user experience:
- Offline functionality
- Installable on mobile devices
- Push notifications
- Fast loading with caching
- Responsive design for all devices

## API Endpoints

### Authentication
- `POST /api/users/login` - User login
- `POST /api/users` - User registration
- `GET /api/users/profile` - Get user profile
- `PUT /api/users/profile` - Update user profile

### Medications
- `GET /api/medications` - Get all medications
- `GET /api/medications/:id` - Get medication by ID
- `POST /api/medications` - Create new medication (admin)
- `PUT /api/medications/:id` - Update medication (admin)
- `DELETE /api/medications/:id` - Delete medication (admin)

### Orders
- `GET /api/orders` - Get user orders
- `GET /api/orders/:id` - Get order by ID
- `POST /api/orders` - Create new order
- `PUT /api/orders/:id/pay` - Update order payment status
- `PUT /api/orders/:id/deliver` - Update order delivery status

### Prescriptions
- `GET /api/prescriptions` - Get user prescriptions
- `GET /api/prescriptions/:id` - Get prescription by ID
- `POST /api/prescriptions` - Create new prescription
- `PUT /api/prescriptions/:id` - Update prescription
- `DELETE /api/prescriptions/:id` - Delete prescription

### Consultations
- `GET /api/consultations` - Get user consultations
- `GET /api/consultations/:id` - Get consultation by ID
- `POST /api/consultations` - Create new consultation
- `PUT /api/consultations/:id` - Update consultation

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a pull request

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Acknowledgments

- Thanks to all contributors who helped develop this application
- Special thanks to the open-source community for the libraries and tools used