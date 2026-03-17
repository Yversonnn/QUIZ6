import './App.css';
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import PrivateRoute from './components/PrivateRoute';
import HomeScreen from './screens/HomeScreen';
import DetailScreen from './screens/DetailScreen';
import SignIn from './screens/SignIn';
import SignUp from './screens/SignUp';
import ApplySeller from './screens/ApplySeller';
import UserScreen from './screens/UserScreen';
import SellerDashboard from './screens/SellerDashboard';
import UserProfile from './screens/UserProfile';
import ChatbotScreen from './screens/ChatbotScreen';
import SubscriptionScreen from './screens/SubscriptionScreen';
import SubscriptionList from './screens/SubscriptionList';
import PayPal from './screens/PayPal';

function App() {
  return (
    <div className="app-shell">
      <BrowserRouter future={{ v7_startTransition: true, v7_relativeSplatPath: true }}>
        <Routes>
          <Route path="/signin" element={<SignIn />} />
          <Route path="/signup" element={<SignUp />} />
          <Route
            path="/"
            element={
              <PrivateRoute>
                <HomeScreen />
              </PrivateRoute>
            }
          />
          <Route
            path="/services/:serviceId"
            element={
              <PrivateRoute>
                <DetailScreen />
              </PrivateRoute>
            }
          />
          <Route
            path="/apply-seller"
            element={
              <PrivateRoute>
                <ApplySeller />
              </PrivateRoute>
            }
          />
          <Route
            path="/users"
            element={
              <PrivateRoute adminOnly>
                <UserScreen />
              </PrivateRoute>
            }
          />
          <Route
            path="/seller-dashboard"
            element={
              <PrivateRoute>
                <SellerDashboard />
              </PrivateRoute>
            }
          />
          <Route
            path="/user-profile"
            element={
              <PrivateRoute>
                <UserProfile />
              </PrivateRoute>
            }
          />
          <Route
            path="/chatbot"
            element={
              <PrivateRoute>
                <ChatbotScreen />
              </PrivateRoute>
            }
          />
          <Route
            path="/subscription"
            element={
              <PrivateRoute>
                <SubscriptionScreen />
              </PrivateRoute>
            }
          />
          <Route
            path="/subscription-list"
            element={
              <PrivateRoute adminOnly>
                <SubscriptionList />
              </PrivateRoute>
            }
          />
          <Route
            path="/paypal"
            element={
              <PrivateRoute>
                <PayPal />
              </PrivateRoute>
            }
          />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
