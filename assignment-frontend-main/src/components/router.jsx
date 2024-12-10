import { createBrowserRouter } from "react-router-dom";
import Login from "./Login";
import Signup from "./Signup";
import Sidebar from "./Sidebar";
import DashboardLayout from "./Layout";
import SpoofChecker from "./SpoofChecker";
import UserSettings from "./UserSettings";
import UserManagement from "./UserManagement";
import ProtectedRoute from "./ProtectedRoute";

const router = createBrowserRouter([
  {
    path: "/Signup",
    element: <Signup />,
  },
  {
    path: "/",
    element: <Login />,
  },
  {
    path: "/dashboard",
    element: (
      <ProtectedRoute>
        <DashboardLayout />
      </ProtectedRoute>
    ),
    children: [
      {
        path: "sidebar",
        element: <Sidebar />,
      },
      {
        path: "spoofchecker",
        element: <SpoofChecker />,
      },
      {
        path: "usersettings",
        element: <UserSettings />,
      },
      {
        path: "usermanagement",
        element: <UserManagement />,
      },
    ],
  },
]);

export default router;
