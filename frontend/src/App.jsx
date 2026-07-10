import { Navigate, Route, Routes } from "react-router-dom";

import { useAuth } from "./context/AuthContext";

import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import Applications from "./pages/Application";
import ApiKeys from "./pages/Apikeys";
import Metrics from "./pages/Metrics";

function ProtectedRoute({ children }) {
    const { isAuthenticated } = useAuth();

    if (!isAuthenticated) {
        return <Navigate to="/login" replace />;
    }

    return children;
}

function App() {
    return (
        <Routes>

            <Route
                path="/login"
                element={<Login />}
            />

            <Route
                path="/register"
                element={<Register />}
            />

            <Route
                path="/"
                element={
                    <ProtectedRoute>
                        <Dashboard />
                    </ProtectedRoute>
                }
            />

            <Route
                path="/applications"
                element={
                    <ProtectedRoute>
                        <Applications />
                    </ProtectedRoute>
                }
            />

            <Route
                path="/apikeys"
                element={
                    <ProtectedRoute>
                        <ApiKeys />
                    </ProtectedRoute>
                }
            />

            <Route
                path="/metrics"
                element={
                    <ProtectedRoute>
                        <Metrics />
                    </ProtectedRoute>
                }
            />

        </Routes>
    );
}

export default App;