const { useAppState } = require("context/manageState");
const { useEffect } = require("react");
const { useNavigate } = require("react-router-dom");
import PropTypes from "prop-types";

function ProtectedRoute({ children }) {
  const { isAuthenticated } = useAppState();
  const navigate = useNavigate();

  useEffect(
    function () {
      if (!isAuthenticated) {
        navigate("/");
      }
    },
    [isAuthenticated]
  );

  return isAuthenticated ? children : null;
}

export default ProtectedRoute;

ProtectedRoute.propTypes = {
  children: PropTypes.element,
};
