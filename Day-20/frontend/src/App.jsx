import { RouterProvider } from "react-router";
import { router } from "./app.route";
import "../src/shared/global.scss";

const App = () => {
  return (
    <RouterProvider router={router} />
  );
};

export default App;