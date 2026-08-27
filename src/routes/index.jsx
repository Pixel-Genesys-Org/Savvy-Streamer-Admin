import { lazy } from "react";

const ComingSoon = lazy(() => import("../pages/ComingSoon"));

const Login = lazy(() => import("../pages/Auth/Login"));
const ForgotPassword = lazy(() => import("../pages/Auth/ForgotPassword"));
const VerifyCode = lazy(() => import("../pages/Auth/VerifyCode"));
const ResetPassword = lazy(() => import("../pages/Auth/ResetPassword"));

const Dashboard = lazy(() => import("../pages/Dashboard"));
const ViewEmployees = lazy(() => import("../pages/Employees/View"));
const ViewManagersDetails = lazy(() => import("../pages/Managers/ViewDetails"));
const ViewFeedbacks = lazy(() => import("../pages/Feedbacks/View"));
const ViewFeedbacksDetails = lazy(() => import("../pages/Feedbacks/ViewDetails"));
const SearchMonitoring = lazy(() => import("../pages/SearchMonitoring/View"));

const ViewNotifications = lazy(() => import("../pages/Notifications"));

const ManageContent = lazy(() => import("../pages/Content/Manage"));

export const ROUTES = [
  {
    path: "/",
    element: <Login />,
    private: false,
    layout: false
  },
  {
    path: "/coming-soon",
    element: <ComingSoon />,
    private: true,
    layout: true
  },
  {
    path: "/login",
    element: <Login />,
    private: false,
    layout: false
  },
  {
    path: "/forgot-password",
    element: <ForgotPassword />,
    private: false,
    layout: false
  },
  {
    path: "/verify",
    element: <VerifyCode />,
    private: false,
    layout: false
  },
  {
    path: "/reset-password",
    element: <ResetPassword />,
    private: false,
    layout: false
  },
  {
    path: "/dashboard",
    element: <Dashboard />,
    private: true,
    layout: true
  },
  {
    path: "/users",
    element: <ViewEmployees />,
    private: true,
    layout: true
  },
  {
    path: "/users/:id",
    element: <ViewManagersDetails />,
    private: true,
    layout: true
  },
  {
    path: "/queries",
    element: <ViewFeedbacks />,
    private: true,
    layout: true
  },
  {
    path: "/queries/:id",
    element: <ViewFeedbacksDetails />,
    private: true,
    layout: true
  },
  {
    path: "/search",
    element: <SearchMonitoring />,
    private: true,
    layout: true
  },
  {
    path: "/notification",
    element: <ViewNotifications />,
    private: true,
    layout: true
  },
  {
    path: "/content",
    element: <ManageContent />,
    private: true,
    layout: true
  },
];
