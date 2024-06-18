import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import InLogPagina from "./components/InlogPagina";
import Home from "./components/Home";
import Stemming from "./components/Stemming";
import AppLayout from "./pages/AppLayout";
import ErrorLayout from "./pages/ErrorLayout";

const router = createBrowserRouter([
  {
    element: <AppLayout />,
    errorElement: <ErrorLayout />,
    children: [
      {
        path: "/",
        element: <InLogPagina />,
      },
      {
        path: "/home",
        element: <Home />,
      },
      {
        path: "/stemming",
        element: <Stemming />,
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
