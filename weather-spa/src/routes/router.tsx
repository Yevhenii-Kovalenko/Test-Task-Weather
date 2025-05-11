import { createBrowserRouter } from "react-router";
import AppLayout from "../layouts/AppLayout";
import { HomePage } from "../pages/HomePage";
import { CityDetailsPage } from "../pages/CityDetailsPage";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <AppLayout />,
    children: [
      { index: true, element: <HomePage /> },
      { path: "city/:name", element: <CityDetailsPage /> },
    ],
  },
]);
