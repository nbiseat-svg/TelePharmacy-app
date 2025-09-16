import React, { Suspense, lazy } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Provider } from 'react-redux';
import { store } from './store';
import './App.css';
import './contexts/NotificationContext.css';

// Components
import Header from './components/Header';
import Footer from './components/Footer';
import ErrorBoundary from './components/ErrorBoundary';

// Contexts
import { NotificationProvider } from './contexts/NotificationContext';

// Lazy load pages for better performance
const Home = lazy(() => import('./pages/Home'));
const Login = lazy(() => import('./pages/Login'));
const Register = lazy(() => import('./pages/Register'));
const Profile = lazy(() => import('./pages/Profile'));
const MedicationCatalog = lazy(() => import('./pages/MedicationCatalog'));
const MedicationDetail = lazy(() => import('./pages/MedicationDetail'));
const Cart = lazy(() => import('./pages/Cart'));
const Checkout = lazy(() => import('./pages/Checkout'));
const PlaceOrder = lazy(() => import('./pages/PlaceOrder'));
const Payment = lazy(() => import('./pages/Payment'));
const Orders = lazy(() => import('./pages/Orders'));
const PrescriptionManagement = lazy(() => import('./pages/PrescriptionManagement'));
const ConsultationBooking = lazy(() => import('./pages/ConsultationBooking'));
const ConsultationRoom = lazy(() => import('./pages/ConsultationRoom'));
const PharmacyFinder = lazy(() => import('./pages/PharmacyFinder'));
const AdminDashboard = lazy(() => import('./pages/AdminDashboard'));
const DeliveryTracking = lazy(() => import('./pages/DeliveryTracking'));
const LanguageTest = lazy(() => import('./pages/LanguageTest'));
const TestAPI = lazy(() => import('./pages/TestAPI'));
const Debug = lazy(() => import('./pages/Debug'));
const SimpleHome = lazy(() => import('./pages/SimpleHome'));
const ApiTest = lazy(() => import('./pages/ApiTest'));
const BasicTest = lazy(() => import('./pages/BasicTest'));
const TestHome = lazy(() => import('./pages/TestHome'));
const BasicHome = lazy(() => import('./pages/BasicHome'));
const TestNotifications = lazy(() => import('./pages/TestNotifications'));
const NotificationTest = lazy(() => import('./pages/NotificationTest'));
const Diagnostics = lazy(() => import('./pages/Diagnostics'));
const SimpleTest = lazy(() => import('./pages/SimpleTest'));
const MinimalTest = lazy(() => import('./MinimalTest')); // Added MinimalTest

// Loading component for suspense fallback
const LoadingComponent = () => (
  <div className="loading-container">
    <div className="spinner"></div>
    <p>Loading...</p>
  </div>
);

function App() {
  return (
    <ErrorBoundary>
      <Provider store={store}>
        <NotificationProvider>
          <Router>
            <div className="App">
              <Header />
              <main className="app-main" id="main-content">
                <Suspense fallback={<LoadingComponent />}>
                  <Routes>
                    <Route path="/" element={<BasicHome />} />
                    <Route path="/debug" element={<Debug />} />
                    <Route path="/basic-test" element={<BasicTest />} />
                    <Route path="/simple-home" element={<SimpleHome />} />
                    <Route path="/home-original" element={<Home />} />
                    <Route path="/api-test" element={<ApiTest />} />
                    <Route path="/login" element={<Login />} />
                    <Route path="/register" element={<Register />} />
                    <Route path="/profile" element={<Profile />} />
                    <Route path="/medications" element={<MedicationCatalog />} />
                    <Route path="/medication/:id" element={<MedicationDetail />} />
                    <Route path="/cart" element={<Cart />} />
                    <Route path="/checkout" element={<Checkout />} />
                    <Route path="/placeorder" element={<PlaceOrder />} />
                    <Route path="/payment" element={<Payment />} />
                    <Route path="/orders" element={<Orders />} />
                    <Route path="/order/:id" element={<Orders />} />
                    <Route path="/delivery/:id" element={<DeliveryTracking />} />
                    <Route path="/prescriptions" element={<PrescriptionManagement />} />
                    <Route path="/consultation/book" element={<ConsultationBooking />} />
                    <Route path="/consultation/:id" element={<ConsultationRoom />} />
                    <Route path="/pharmacy-finder" element={<PharmacyFinder />} />
                    <Route path="/admin" element={<AdminDashboard />} />
                    <Route path="/language-test" element={<LanguageTest />} />
                    <Route path="/test-api" element={<TestAPI />} />
                    <Route path="/test-notifications" element={<TestNotifications />} />
                    <Route path="/notification-test" element={<NotificationTest />} />
                    <Route path="/diagnostics" element={<Diagnostics />} />
                    <Route path="/simple-test" element={<SimpleTest />} />
                    <Route path="/minimal-test" element={<MinimalTest />} /> {/* Added route */}
                  </Routes>
                </Suspense>
              </main>
              <Footer />
            </div>
          </Router>
        </NotificationProvider>
      </Provider>
    </ErrorBoundary>
  );
}

export default App;