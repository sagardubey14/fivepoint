import { Route, Routes } from "react-router-dom";
import LandingPage from "./Components/LandinPage";
import Navbar from "./Components/Navbar";
import Dashboard from "./Components/Dashboard";
import UserDetail from "./Components/UserDetail";
import Users from "./Components/Users";
import Stores from "./Components/Stores";
import { UserProvider } from "./context/UserContext";
import AuthToggle from "./Components/AuthToggle";

function App() {
  return (
    <UserProvider>
      <Navbar />
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/about" element={<div>About</div>} />
        <Route path="/auth" element={<AuthToggle />} />

        <Route path="/admin" element={<Dashboard />}>
          <Route index element={<Users />} /> {/* Matches /admin */}
          <Route path="users" element={<Users />} />
          <Route path="users/:id" element={<UserDetail />} />
          <Route path="stores" element={<Stores />} />
        </Route>

        <Route path="*" element={<div>NotFound</div>} />
      </Routes>
    </UserProvider>
  );
}

export default App;
