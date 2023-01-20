import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Login from "./components/auth/Login";
import SignUp from "./components/auth/SignUp";
import Footer from "./components/layouts/Footer";
import SideBar from "./components/layouts/Sidebar";
import Home from "./components/layouts/Home";
import TopNavBar from "./components/layouts/TopNavbar";
import NotFound from "./components/NotFound";
import Notifications from "./components/Notifications";
import "./styles/app.css";
import ResolvedBugs from "./components/layouts/ResolvedBugs";

function App() {
  return (
    <Router>
      <div className="App text-white font-body grid md:grid-cols-6">
        <SideBar />
        <main className="px-6 md:px-12 lg:px-16 py-6 md:col-span-5">
          <Routes>
            <Route
              path="/"
              element={
                <>
                  <TopNavBar />
                  <Home />
                  <Footer />
                </>
              }
            />
            <Route path="/notifications" element={<Notifications />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<SignUp />} />
            <Route path="/resolved" element={<ResolvedBugs />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;
