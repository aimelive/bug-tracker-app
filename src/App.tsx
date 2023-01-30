import { Route, Routes, useLocation } from "react-router-dom";
import Login from "./components/auth/Login";
import SignUp from "./components/auth/SignUp";
import SideBar from "./components/layouts/Sidebar";
import Home from "./components/layouts/Home";
import TopNavBar from "./components/layouts/TopNavbar";
import NotFound from "./components/NotFound";
import Notifications from "./components/notification/Notifications";
import "./styles/app.css";
import ResolvedBugs from "./components/layouts/ResolvedBugs";
import RemovedBugs from "./components/layouts/RemovedBugs";
import { AnimatePresence } from "framer-motion";
import { useState } from "react";
import Modal from "./components/reusable/Modal";

function App() {
  const location = useLocation();
  const [showModal, setShowModal] = useState(false);

  return (
    <div className="App text-white font-body grid md:grid-cols-6">
      <SideBar />
      <main className="px-6 md:px-12 lg:px-16 py-6 md:col-span-5">
        <TopNavBar />
        <Modal showModal={showModal} setShowModal={setShowModal} />
        <AnimatePresence mode="wait" onExitComplete={() => setShowModal(false)}>
          <Routes location={location} key={location.key}>
            <Route path="/" element={<Home />} />
            <Route path="/notifications" element={<Notifications />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<SignUp />} />
            <Route path="/resolved" element={<ResolvedBugs />} />
            <Route
              path="/trash"
              element={<RemovedBugs setShowModal={setShowModal} />}
            />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </AnimatePresence>
      </main>
    </div>
  );
}

export default App;
