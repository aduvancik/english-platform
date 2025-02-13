import "./App.css";
import { Dashboard } from "./components/Dashboard/";
import { StudentsList } from "./components/StudentsList";

function App() {
    return (
        <>
            <Dashboard>
                <StudentsList />
            </Dashboard>
        </>
    );
}

export default App;
