import { Routes, Route } from "react-router-dom";
import Landing from "./pages/landing/Landing";
import SignIn from "./pages/auth/SignIn";
import Signup from "./pages/auth/Signup"; // ✅ add this

function App() {
  return (
    <Routes>
      <Route path="/" element={<Landing />} />
      <Route path="/signin" element={<SignIn />} />
      <Route path="/signup" element={<Signup />} /> {/* ✅ enable */}
    </Routes>
  );
}

export default App;