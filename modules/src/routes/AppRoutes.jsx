import { Routes, Route } from "react-router-dom";
import Login from "../pages/Login";
import Register from "../pages/Register";
import PrivateRoute from "../components/PrivateRoute";
import LandingPage from "../pages/LandingPage";
import { Dashboard } from "../components/Dashboard";
import { StudentsList } from "../components/StudentsList/StudentsList";

const AppRoutes = () => {
  return (
    <Routes>
      {/* Публічні маршрути */}
      <Route path="/" element={<LandingPage />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route
        path="/list"
        element={
          <Dashboard>
            <StudentsList />
          </Dashboard>
        }
      />
      {/* Приватні маршрути */}
      <Route element={<PrivateRoute />}>
      </Route>
    </Routes>
  );
};

export default AppRoutes;
