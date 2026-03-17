import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';

const PrivateRoute = ({ children, adminOnly = false }) => {
  const { isAuthenticated, userInfo } = useSelector((state) => state.userAuth);

  if (!isAuthenticated) {
    return <Navigate to="/signin" replace />;
  }

  if (adminOnly && userInfo?.userType !== 'Admin') {
    return <Navigate to="/" replace />;
  }

  return children;
};

export default PrivateRoute;