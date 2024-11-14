import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { TaskPage } from "./pages/TaskPage";
import { TaskFormPage } from "./pages/TaskFormPage";
import { Navigation } from "./components/Navigation";
import { Toaster } from "react-hot-toast";

function App() {
  return (
    <BrowserRouter>
        <div className="container mx-auto">
            <Navigation/>
            <Routes>
                <Route path="/" element={<Navigate to="/task"/>}/>
                <Route path="/task" element={<TaskPage/>}/>
                <Route path="/task/:id" element={<TaskFormPage/>}/>
                <Route path="/task-create" element={<TaskFormPage/>}/>
            </Routes>
            <Toaster/>
        </div>
    </BrowserRouter>
  );
}

export default App;
