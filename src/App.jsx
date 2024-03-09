import { createBrowserRouter, RouterProvider } from "react-router-dom";
import HomePage from "./Pages/HomePage";
import ListView from "./Pages/ListView";

const router = createBrowserRouter([
  {
    path: "/",
    element: <HomePage />,
  },
  {
    path: "/listview",
    element: <ListView />,
  },
]);

export default function App() {
  return <RouterProvider router={router} />;
}
