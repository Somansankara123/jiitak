
import React from 'react';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import './App.css';
import Login from './components/Login';
import Header from './components/Header';
import ResetPassword from './components/ResetPassword';
import UserList from './components/UserList';
import Register from './components/Register';
import Dashboard from './components/Dashboard';
import ForgotPassword from './components/Forgotpassword';
import Setting from './components/Setting';
import Winners from './components/Winners';
import { Outlet } from 'react-router-dom';
const Layout = () => (
  <>
    <Header />
    <div className="main-content">
      <Outlet /> 
    </div>
  </>
);


const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      { index:"/", element: <Login /> },
      { path: "/signup", element: <Register /> },
      { path: "/resetpassword", element: <ResetPassword /> },
      { path: "/userlist", element: <UserList /> },
      { path: "/dashboard", element: <Dashboard /> },
      { path: "/forgotpassword", element: <ForgotPassword /> },
      { path: "/settings", element: <Setting /> },
      { path: "/winners", element: <Winners /> },
    ]
  }
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
