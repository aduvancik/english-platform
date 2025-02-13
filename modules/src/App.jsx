import { BrowserRouter as Router } from "react-router-dom";
import AppRoutes from "./routes/AppRoutes";

function App() {
  return (
    <main className="bg-[#EDEDED] min-h-screen">
      <Router>
        <AppRoutes />
      </Router>
    </main>
  );
}

export default App;
