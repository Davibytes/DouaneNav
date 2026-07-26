import {
  Routes,
  Route,
  Navigate,
  Outlet
} from "react-router-dom";


import { useAuth } from "./context/AuthContext.jsx";

import SettingsPage from "./pages/SettingsPage.jsx";
import LoginPage from "./pages/LoginPage.jsx";

import DashboardPage from "./pages/DashboardPage.jsx";
import DeclarationsPage from "./pages/DeclarationsPage.jsx";
import ReportsPage from "./pages/ReportsPage.jsx";
import AuditLogsPage from "./pages/AuditLogsPage.jsx";
import StatisticsPage from "./pages/StatisticsPage.jsx";
import InspectionHistoryPage from "./pages/InspectionHistoryPage.jsx";
import SynchronizationPage from "./pages/SynchronizationPage.jsx";
import UsersPage from "./pages/UsersPage.jsx";
import ConfigurationPage from "./pages/ConfigurationPage.jsx";


import DashboardLayout from "./components/DashboardLayout.jsx";



const ProtectedRoute = ({ children }) => {

  const { user, loading } = useAuth();


  if (loading) {

    return (

      <div>
        Loading CustomsTrack AI...
      </div>

    );

  }


  if (!user) {

    return <Navigate to="/login" />;

  }


  return children;

};



const ProtectedLayout = () => {

  return (

    <ProtectedRoute>

      <DashboardLayout>

        <Outlet />

      </DashboardLayout>

    </ProtectedRoute>

  );

};



export default function App(){


  return (

      <Routes>


        <Route

          path="/login"

          element={<LoginPage />}

        />



        <Route

          element={<ProtectedLayout />}

        >


          <Route

            path="/dashboard"

            element={<DashboardPage />}

          />



          <Route

            path="/declarations"

            element={<DeclarationsPage />}

          />



          <Route

            path="/reports"

            element={<ReportsPage />}

          />



          <Route

            path="/audit-logs"

            element={<AuditLogsPage />}

          />



          <Route

            path="/statistics"

            element={<StatisticsPage />}

          />



          <Route

            path="/inspections"

            element={<InspectionHistoryPage />}

          />



          <Route

            path="/synchronization"

            element={<SynchronizationPage />}

          />



          <Route

            path="/users"

            element={<UsersPage />}

          />



          <Route

            path="/configuration"

            element={<ConfigurationPage />}

          />

        <Route

            path="/settings"

            element={<SettingsPage />}

        />


        </Route>



        <Route

          path="*"

          element={<Navigate to="/dashboard" />}

        />


      </Routes>

  );

}