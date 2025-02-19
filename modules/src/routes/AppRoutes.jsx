import { Routes, Route, Navigate } from "react-router-dom";
import Login from "../pages/Login";
import Register from "../pages/Register";
import PrivateRoute from "../components/PrivateRoute";
import LandingPage from "../pages/LandingPage";
import { Dashboard } from "../components/Dashboard";
import { StudentsList } from "../components/StudentsList/StudentsList";
import { ProfilePage } from "../components/Profile";
import { Support } from "../components/Support";
import Schedule from "../components/Schedule/Schedule";

const AppRoutes = () => {
    return (
        <Routes>
            <Route path="/" element={<LandingPage />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />

            <Route element={<PrivateRoute />}>
                <Route path="/dashboard" element={<Dashboard />}>
                    <Route index element={<Navigate to="groups" replace />} />
                    <Route path="groups" element={<StudentsList />} />
                    <Route path="schedule" element={<Schedule />} />
                    <Route path="profile" element={<ProfilePage />} />
                    <Route path="support" element={<Support />} />
                </Route>
            </Route>
        </Routes>
    );
};

export default AppRoutes;
