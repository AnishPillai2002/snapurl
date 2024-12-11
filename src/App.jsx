import { createBrowserRouter, RouterProvider } from "react-router-dom"

import "./App.css";
import AppLayout  from "./layouts/app-layout";
import LandingPage from "./pages/landing-page";
import DashboardPage from "./pages/dashboard-page";
import AuthPage from "./pages/auth-page";
import RedirectLinkPage from "./pages/redirect-link-page";
import LinkPage from "./pages/link-page";

const router=createBrowserRouter([
  {
    element:<AppLayout/>,
    children:[
      {
        path:'/',
        element:<LandingPage/>
      },
      {
        path:'/dashboard',
        element:<DashboardPage/>
      },
      {
        path:'/auth',
        element:<AuthPage/>
      },
      {
        path:'/link/:id',
        element:<LinkPage/>
      },
      {
        path:'/:id',
        element:<RedirectLinkPage/>
      }


    ]
  }
]);


function App() {
  
  return <RouterProvider router={router}/>
}

export default App
