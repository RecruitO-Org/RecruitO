import { Routes, Route } from "react-router-dom";
import Landing from "./pages/landing/Landing";
import Login from "./pages/auth/Login";
import Signup from "./pages/auth/Signup"; // ✅ add this

function App() {
  return (
    <Routes>
      <Route path="/" element={<Landing />} />
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<Signup />} /> {/* ✅ enable */}
    </Routes>
  );
}

export default App;