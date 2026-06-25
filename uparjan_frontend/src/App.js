import { BrowserRouter, Routes, Route } from "react-router-dom";

import Dashboard from "./dashboard/pages/Dashboard";

import FarmerRegistration from "./modules/farmer/pages/FarmerRegistration";

import FarmerLogin from "./auth/pages/FarmerLogin";

import OfficerLogin from "./auth/pages/OfficerLogin";

import MspLogin from "./auth/pages/MspLogin";

import MillerLogin from "./auth/pages/MillerLogin";

import FarmerDetails from "./modules/farmer/pages/FarmerDetails";

import FarmerLandDetails from "./modules/farmer/pages/FarmerLandDetails";

<Toaster position="top-right" />;
function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Dashboard />} />

        <Route path="/farmer-registration" element={<FarmerRegistration />} />
        <Route path="/farmer/details" element={<FarmerDetails />} />
        <Route path="/farmer/land-details" element={<FarmerLandDetails />} />

        <Route path="/farmer/login" element={<FarmerLogin />} />

        <Route path="/officer/login" element={<OfficerLogin />} />

        <Route path="/msp/login" element={<MspLogin />} />

        <Route path="/miller/login" element={<MillerLogin />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
