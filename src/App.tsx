import React from 'react';
import { 
  createBrowserRouter, 
  RouterProvider, 
  createRoutesFromElements, 
  Route,
  Outlet
} from 'react-router-dom';
import { ThemeProvider } from './context/ThemeContext';
import Layout from './components/layout/Layout';
import Home from './pages/Home';
import PatientIntake from './pages/PatientIntake';
import Chatbot from './pages/Chatbot';
import DrugDashboard from './pages/DrugDashboard';
import SimulationViewer from './pages/SimulationViewer';
import DoctorReview from './pages/DoctorReview';
import PatientHistory from './pages/PatientHistory';
import AppointmentScheduler from './pages/AppointmentScheduler';

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route element={<Layout><Outlet /></Layout>}>
      <Route path="/" element={<Home />} />
      <Route path="/patient-intake" element={<PatientIntake />} />
      <Route path="/chatbot" element={<Chatbot />} />
      <Route path="/drug-dashboard" element={<DrugDashboard />} />
      <Route path="/simulation-viewer" element={<SimulationViewer />} />
      <Route path="/simulation-viewer/:drugId" element={<SimulationViewer />} />
      <Route path="/doctor-review" element={<DoctorReview />} />
      <Route path="/patient/:id/history" element={<PatientHistory />} />
      <Route path="/appointments" element={<AppointmentScheduler />} />
    </Route>
  ),
  {
    future: {
      v7_relativeSplatPath: true
    }
  }
);

function App() {
  return (
    <ThemeProvider>
      <RouterProvider router={router} />
    </ThemeProvider>
  );
}

export default App;