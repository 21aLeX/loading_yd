import './App.css';
import {
  BrowserRouter,
  Routes,
  Route,
  useLocation,
  Navigate,
} from 'react-router-dom';
import FormUploader from './components/formUploader';
import useAuth from './hooks/useAuth.jsx';
import { routes } from './utils/routes.js';
import AuxiliaryPage from './components/auxiliaryPage';
import { AuthProvider, SpinerProvider } from './utils/providers.js';

const FormRoute = ({ children }) => {
  const location = useLocation();
  const auth = useAuth();
  if (auth.loggedIn) {
    return children;
  }
  return (
    <Navigate to={routes.auxiliary()} state={{ from: location }} />
  );
};
const App = () => (
  <AuthProvider>
    <SpinerProvider>
      <BrowserRouter>
        <div className="d-flex flex-column div">
          <Routes>
            <Route path={routes.auxiliary()} element={<AuxiliaryPage />} />
            <Route
              path={routes.home()}
              element={(
                <FormRoute>
                  <FormUploader />
                </FormRoute>
              )}
            />
          </Routes>
        </div>
      </BrowserRouter>
    </SpinerProvider>
  </AuthProvider>
);

export default App;
