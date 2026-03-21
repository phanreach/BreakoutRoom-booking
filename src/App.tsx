import { Route, Routes } from "react-router-dom";
import Login from "./pages/auth/login";
import SignUp from "./pages/auth/signup";
import Layout from "./components/layout/layout";
import Booking from "./pages/booking";
import Dashboard from "./pages/dashboard";
import ProtectedRoute from "./components/protect-route";
import AdminDashboard from "./pages/admin/dashboard";
import AdminLayout from "./components/layout/admin-layout";
import Room from "./pages/admin/room";
import BookDetail from "./pages/book-detail";
import StudentBooking from "./pages/admin/student-booking";
import HistoryBook from "./components/history-book";
import UserManagement from "./pages/admin/user-management";

function App() {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<SignUp />} />

      <Route element={<ProtectedRoute allowedRoles={["ADMIN", "USER"]} />}>
        <Route element={<Layout />}>
          <Route path="/" element={<Dashboard />} />
          <Route path="/book-room/:roomId" element={<BookDetail />} />
          <Route path="/book-room" element={<Booking />} />
          <Route path="/my-bookings" element={<HistoryBook />} />
        </Route>
      </Route>

      <Route element={<ProtectedRoute allowedRoles={["ADMIN"]} />}>
        <Route element={<AdminLayout />}>
          <Route path="/admin/dashboard" element={<AdminDashboard />} />
          <Route path="/admin/room" element={<Room />} />
          <Route path="/admin/bookings" element={<StudentBooking />} />
          <Route path="/admin/user-management" element={<UserManagement />} />
        </Route>
      </Route>
    </Routes>
  );
}

export default App;
