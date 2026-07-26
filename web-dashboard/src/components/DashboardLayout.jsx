import { useLocation, Outlet } from "react-router-dom";
import Sidebar from "./Sidebar.jsx";
import AppHeader from "./AppHeader.jsx";


const pageInfo = {

  "/dashboard": {
    title: "Operational Dashboard",
    description: "Monitoring declarations, inspections and synchronization."
  },

  "/declarations": {
    title: "Declarations",
    description: "Customs declaration management."
  },

  "/reports": {
    title: "Reports & Statistics",
    description: "Operational reports and customs statistics."
  },

  "/audit-logs": {
    title: "Audit Logs",
    description: "System activity and security tracking."
  },

  "/statistics": {
    title: "Statistics",
    description: "Operational performance indicators."
  },

  "/inspections": {
    title: "Inspection Monitoring",
    description: "Monitoring completed inspections and reports."
  },

  "/synchronization": {
    title: "Synchronization",
    description: "CAMCIS synchronization monitoring."
  },

  "/users": {
    title: "User Administration",
    description: "Manage users, roles and permissions."
  },

  "/configuration": {
    title: "Configuration",
    description: "System and account settings."
  }

};


const DashboardLayout = () => {

  const location = useLocation();


  const currentPage =
    pageInfo[location.pathname] ||
    pageInfo["/dashboard"];


  return (

    <div className="dashboard-layout">

      <Sidebar />


      <main className="dashboard-content">

        <AppHeader
          title={currentPage.title}
          description={currentPage.description}
        />


        <Outlet />


      </main>


    </div>

  );

};


export default DashboardLayout;