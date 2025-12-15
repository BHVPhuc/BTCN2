import { createBrowserRouter } from "react-router-dom";

import MainLayout from "../layouts/MainLayout";
import MainContent from "@/components/main/MainContent";
import SearchPage from "../pages/SearchPage";
import MovieDetailPage from "../pages/MovieDetailPage";
import PersonDetailPage from "../pages/PersonDetailPage";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    // errorElement: <ErrorPage />,
    children: [
      {
        index: true,          // path: "/"
        element: <MainContent />,
      },
      {
        path: "movies/:id",
        element: <MovieDetailPage />,
      },
      {
        path: "search",
        element: <SearchPage />,
      },
      {
        path: "person/:id",
        element: <PersonDetailPage />,
      },
    ],
  },
//   {
//     path: "/login",
//     element: <Login />,
//   },
]);
