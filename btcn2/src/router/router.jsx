import { createBrowserRouter } from "react-router-dom";

import MainLayout from "../layouts/MainLayout";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    // errorElement: <ErrorPage />,
    // children: [
    //   {
    //     index: true,          // tương đương path: "/"
    //     element: <Home />,
    //   },
    //   {
    //     path: "movies",
    //     element: <Movies />,
    //   },
    //   {
    //     path: "movies/:id",
    //     element: <MovieDetail />,
    //   },
    // ],
  },
//   {
//     path: "/login",
//     element: <Login />,
//   },
]);
