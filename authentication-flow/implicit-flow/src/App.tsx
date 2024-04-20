import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { Login } from './Login';
import { Logout } from './Logout';
import { Callback } from './Callback';
import { AuthProvider } from './AuthProvider';

const router = createBrowserRouter([
  {
    path: "login",
    element: <Login />
  },
  {
    path: "logout",
    element: <Logout />
  },
  {
    path: "admin",
    element: (
      <div>Admin</div>
    ),
  },
  {
    path: "callback",
    element: <Callback />,
  }
])

function App() {
  return (
    <AuthProvider>
      <RouterProvider router={router} />
    </AuthProvider>
  )
}

export default App

