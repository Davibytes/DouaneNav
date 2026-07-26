import { NavLink, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext.jsx";

const Sidebar = () => {

  const { logout } = useAuth();

  const navigate = useNavigate();

  const menus = [

    {
      name: "Dashboard",
      path: "/dashboard"
    },

    {
      name: "Declarations",
      path: "/declarations"
    },

    {
      name: "Reports",
      path: "/reports"
    },

    {
      name: "Inspection Monitoring",
      path: "/inspections"
    },

    {
      name: "Synchronization",
      path: "/synchronization"
    },

    {
      name: "Users",
      path: "/users"
    },

    {
      name: "Configuration",
      path: "/configuration"
    },

    {
      name: "Audit Logs",
      path: "/audit-logs"
    }

  ];

  const handleLogout = async () => {

    await logout();

    navigate("/login");

  };

  return (

    <aside className="sidebar">

      <h2 className="sidebar-title">
        CustomsTrack AI
      </h2>

      <div className="language-toggle">

        <button>
          FR
        </button>

        <button>
          EN
        </button>

      </div>

      <nav>

        {
          menus.map((menu) => (

            <NavLink

              key={menu.path}

              to={menu.path}

              className={({ isActive }) =>

                isActive

                  ?

                  "sidebar-link active"

                  :

                  "sidebar-link"

              }

            >

              {menu.name}

            </NavLink>

          ))
        }

      </nav>

      <div className="sidebar-bottom">

        <button

          className="settings-link"

          onClick={() => navigate("/settings")}

        >

          <i className="fa-solid fa-gear"></i>

        </button>

        <button

          className="logout-button"

          onClick={handleLogout}

        >

          Logout

        </button>

      </div>

    </aside>

  );

};

export default Sidebar;