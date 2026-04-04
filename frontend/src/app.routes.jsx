import { createBrowserRouter } from "react-router";
import Login from "./features/auth/pages/Login";
import Register from "./features/auth/pages/Register";
import Protected from "./features/auth/components/Protected";
import Layout from "./components/Layout";
import LandingPage from "./pages/LandingPage";
import Dashboard from "./pages/Dashboard";
import JobMatch from "./features/interview/pages/JobMatch";
import InterviewPrep from "./features/interview/pages/InterviewPrep";
import ResumeLab from "./features/interview/pages/ResumeLab";

export const router = createBrowserRouter([
    {
        path: "/",
        element: <LandingPage />
    },
    {
        path: "/login",
        element: <Login />
    },
    {
        path: "/register",
        element: <Register />
    },
    {
        path: "/dashboard",
        element: <Protected><Layout><Dashboard /></Layout></Protected>
    },
    {
        path: "/job-match",
        element: <Protected><Layout><JobMatch /></Layout></Protected>
    },
    {
        path: "/interview-prep/:interviewId?",
        element: <Protected><Layout><InterviewPrep /></Layout></Protected>
    },
    {
        path: "/resume-lab",
        element: <Protected><Layout><ResumeLab /></Layout></Protected>
    }
]);