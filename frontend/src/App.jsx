//App.jsx
import { createBrowserRouter, RouterProvider, Navigate } from 'react-router-dom';
import { useState } from 'react';
import StoryView from './pages/StoryView/StoryView';
import Profile from './pages/Profile/Profile';
import './App.css';
import { Outlet } from 'react-router-dom';
import Sidebar from '../src/components/Sidebar/Sidebar';
import Login from './pages/Login/Login';
import Signup from './pages/Signup/Signup';
import Home from './pages/Home/Home';
import Explore from './pages/Explore/Explore';
import Reels from './pages/Reels/Reels';
import Messages from './pages/Messages/Messages';
import Notification from "./components/Notification/Notification";
import MessagePop from "./components/MessagePop/MessagePop";
import Search from "./pages/Search/Search";
import { useContext } from "react";
import { ThemeContext } from "./context/ThemeContext";


import MessageWindow from '../src/components/MessageWindow/MessageWindow';

function Layout() {
  const [showMessages, setShowMessages] = useState(false);
  const user = JSON.parse(localStorage.getItem('user'));
  const [showNotifications, setShowNotifications] = useState(false);
  const { darkMode } = useContext(ThemeContext);

  if (!user) {
    return <Navigate to="/login" replace />;
  }
  return (

    <div className={darkMode ? "app dark" : "app"}>
    <div className="app-layout">
      <Sidebar
        onNotificationClick={() => setShowNotifications(prev => !prev)}
        notificationsOpen={showNotifications}
      />
      {showNotifications && (
        <Notification
          onClose={() => setShowNotifications(false)}
        />
      )}
      <main className="flex-grow-1">
        <Outlet />
      </main>
       <MessagePop onClick={() => setShowMessages(true)} />
      {showMessages && (
        <MessageWindow
          onClose={() => setShowMessages(false)}
        />
      )}
    </div>
    </div>

  );
}


const router = createBrowserRouter([
  {
    path: '/',
    element: <Layout />,
    children: [
      {
        index: true,
        element: <Home />,
      },
      {
        path: 'explore',
        element: <Explore />,
      },
      {
        path: 'reels',
        element: <Reels />,
      },
      {
        path: 'messages',
        element: <Messages />,
      }/* ,
      {
        path: 'notifications',
        element: <Notifications />,
      } */,
      {
        path: 'profile',
        element: <Profile />,
      },
      {
        path: 'search',
        element: <Search />,
      },
    ],
  },

  {
    path: '/story/:id',
    element: <StoryView />,
  },

  {
    path: '/login',
    element: <Login />,
  },

  {
    path: '/signup',
    element: <Signup />,
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;