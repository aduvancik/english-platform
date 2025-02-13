import React from "react";
import "./App.css";
import { Dashboard } from "./components/Dashboard/";
import { StudentsList } from "./components/StudentsList";
import LandingPage from "./pages/LandingPage";
import { Route, Routes } from "react-router";

function App() {
  return (
    <>
      <Routes>
        {/* Публічні маршрути */}
        <Route path="/" element={<LandingPage />} />
        {/* <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} /> */}

        <Route
          path="/list"
          element={
            <Dashboard>
              <StudentsList />
            </Dashboard>
          }
        />
        {/* Приватні маршрути */}
        {/* <Route element={<PrivateRoute />}></Route> */}
      </Routes>

      {/* <Dashboard>
        <StudentsList />
      </Dashboard> */}
    </>
  );
}

export default App;
