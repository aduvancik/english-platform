import { Routes, Route } from "react-router-dom";

import LandingPage from "../pages/LandingPage";
import Login from "../pages/Login";
import Register from "../pages/Register";
import PrivateRoute from "../components/PrivateRoute";
import { Dashboard } from "../components/Dashboard";
import { StudentsList } from "../components/StudentsList/StudentsList";
import { ProfilePage } from "../components/Profile";
import { Support } from "../components/Support";
import Schedule from "../components/Schedule/Schedule";

const AppRoutes = () => {
  return (
    <Routes>
      {/* Публічні маршрути */}
      <Route path="/" element={<LandingPage />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />

      {/* Приватні маршрути */}
      <Route path="/dashboard" element={<Dashboard />}>
        <Route path="groups" element={<StudentsList />} />
        <Route path="schedule" element={<Schedule />} />
        <Route path="profile" element={<ProfilePage />} />
        <Route path="support" element={<Support />} />
      </Route>
      <Route element={<PrivateRoute />}></Route>
    </Routes>
  );
};

export default AppRoutes;
