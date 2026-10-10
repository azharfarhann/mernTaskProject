import { BrowserRouter, Routes, Route } from "react-router-dom";
import Register from "./pages/Register.jsx";
import Login from "./pages/Login.jsx";
import Users from "./pages/Users.jsx";

function App() {
  return (
    
    <BrowserRouter>
    <div className="min-h-screen bg-gray-200 p-4">
      <Routes>
        <Route path="/" element={<Register />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/users" element={<Users />} />
      </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
