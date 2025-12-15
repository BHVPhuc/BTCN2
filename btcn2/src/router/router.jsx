import { createBrowserRouter } from "react-router-dom";

import MainLayout from "../layouts/MainLayout";
import MainContent from "@/components/main/MainContent";
import SearchPage from "../pages/SearchPage";
import MovieDetailPage from "../pages/MovieDetailPage";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    // errorElement: <ErrorPage />,
    children: [
      {
        index: true,          // tương đương path: "/"
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
    //   {
    //     path: "movies",
    //     element: <Movies />,
    //   },
    //   {
    //     path: "movies/:id",
    //     element: <MovieDetail />,
    //   },
    ],
  },
//   {
//     path: "/login",
//     element: <Login />,
//   },
]);
