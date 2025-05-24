import { Routes, Route, Navigate } from 'react-router-dom';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage'; // import your register page
import Dashboard from './pages/Dashboard';
import { useAppSelector } from './hooks/reduxHooks';

function App() {
    const token = useAppSelector((state) => state.auth.token);

    return (
        <Routes>
            <Route path="/" element={<Navigate to={token ? '/dashboard' : '/register'} />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/register" element={<RegisterPage />} />
            <Route path="/dashboard" element={token ? <Dashboard /> : <Navigate to="/login" />} />
        </Routes>
    );
}

export default App;
