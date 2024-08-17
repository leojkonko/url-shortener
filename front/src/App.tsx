import { createBrowserRouter, RouterProvider } from "react-router-dom";
import RouteDetail from "./routes/detail";
import Index from "./routes/index";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Index />,
  },
  {
    path: "/:shortCode",
    element: <RouteDetail />,
  },
]);

function App() {
  return (
    <>
      <RouterProvider router={router} />
    </>
  );
}

export default App;
