import { Route, Routes } from "react-router-dom";
import Login from "./pages/auth/login";
import SignUp from "./pages/auth/signup";
import Layout from "./components/layout/layout";
import Booking from "./pages/booking";
import MyBooking from "./pages/my-booking";
import Dashboard from "./pages/dashboard";
import ProtectedRoute from "./components/protect-route";
import AdminDashboard from "./pages/admin/dashboard";

function App() {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<SignUp />} />

      <Route element={<ProtectedRoute allowedRoles={["ADMIN", "USER"]} />}>
        <Route element={<Layout />}>
          <Route path="/" element={<Dashboard />} />
          <Route path="/book-room" element={<Booking />} />
          <Route path="/my-bookings" element={<MyBooking />} />
        </Route>
      </Route>

      <Route element={<ProtectedRoute allowedRoles={["ADMIN"]} />}>
        <Route path="/admin/dashboard" element={<AdminDashboard />} />
      </Route>
    </Routes>
  );
}

export default App;
