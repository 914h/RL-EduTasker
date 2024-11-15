import { createBrowserRouter } from "react-router-dom";
import Home from "../pages/Home.jsx";
import Login from "../pages/Login.jsx";
import Layout from "../layouts/Layout.jsx";
import NotFound from "../pages/NotFound.jsx";
import GuestLayout from "../layouts/GuestLayout.jsx";
import StudentLayout from "../layouts/Student/StudentLayout.jsx";
import StudentDashboard from "../layouts/Student/StudentDashboard.jsx";
import AdminLayout from "../layouts/Admin/AdminLayout.jsx";
import AdminDashboard from "../layouts/Admin/AdminDashboard.jsx";
import TeacherLayout from "../layouts/Teacher/TeacherLayout.jsx";
import TeacherDashboard from "../layouts/Teacher/TeacherDashboard.jsx";
import ParentsManagement from "../components/Manage Tables/Manage Parents/ParentsManagement.jsx";
import ParentLayout from "../layouts/ParentLayout.jsx";
import StudentsManagement from "../components/Manage Tables/Manage Students/StudentsManagement.jsx";
import DevoirManagement from "../components/Manage Tables/Manage Devoirs/DevoirManagement.jsx";

export const LOGIN_ROUTE = '/login';
const ADMIN_BASE_ROUTE = '/admin'

export const ADMIN_DASHBOARD_ROUTE = ADMIN_BASE_ROUTE + '/AdminDashboard';
export const ADMIN_MANAGE_PARENTS_ROUTE = ADMIN_BASE_ROUTE + '/manage-parents'
export const ADMIN_MANAGE_STUDENTS_ROUTE = ADMIN_BASE_ROUTE + '/manage-students'

export const TEACHER_DASHBOARD_ROUTE = '/Teacher/TeacherDashboard';
export const TEACHER_MANAGE_DEVOIRS_ROUTE= 'Teacher/manage-devoirs'

export const STUDENT_DASHBOARD_ROUTE = '/Student/StudentDashboard';
export const PARENT_DASHBOARD_ROUTE = '/Parent/ParentDashboard';

export const redirectToDashboard = (role) => {
  switch (role) {
      case 'student':
        return(STUDENT_DASHBOARD_ROUTE);
      case 'admin':
        return(ADMIN_DASHBOARD_ROUTE);
      case 'teacher':
        return(TEACHER_DASHBOARD_ROUTE);
      case 'parent':
        return(PARENT_DASHBOARD_ROUTE);
        case '':
          return (LOGIN_ROUTE);
        default:
          return (LOGIN_ROUTE);
} 
  }
export const router = createBrowserRouter([
  {
    element: <Layout />,  
    children: [
      {
        path: '/',
        element: <Home />
      },
      {
        path: '*',
        element: <NotFound />
      },
    ],
  },
  {
    element: <GuestLayout />,
    children: [
      {
        path: LOGIN_ROUTE,
        element: <Login />
      }
    ]
  },
  {
    element: <AdminLayout />,
    children: [
      {
        path: ADMIN_DASHBOARD_ROUTE,
        element: <AdminDashboard />
      },
      {
        path: ADMIN_MANAGE_PARENTS_ROUTE,
        element: <ParentsManagement />
      }
      ,
      {
        path: ADMIN_MANAGE_STUDENTS_ROUTE,
        element: <StudentsManagement />
      },
      
    ]
  },
  {
    element: <StudentLayout />,
    children: [
      {
        path: STUDENT_DASHBOARD_ROUTE,
        element: <StudentDashboard />
      }
    ]
  }
  ,
  {
    element: <TeacherLayout />,
    children: [
      {
        path: TEACHER_DASHBOARD_ROUTE,
        element: <TeacherDashboard />
      },{
        path: TEACHER_MANAGE_DEVOIRS_ROUTE,
        element: <DevoirManagement />
      },
    ]
  },
  {
    element: <ParentLayout />,
    children: [
      {
        path: PARENT_DASHBOARD_ROUTE,
        element: <TeacherDashboard />
      }
    ]
  }
]);
