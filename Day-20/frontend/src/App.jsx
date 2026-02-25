import { RouterProvider } from "react-router";
import { router } from "./app.route";
import { AuthProvider } from "./features/auth/auth.context";
import "../src/shared/global.scss";

const App = () => {
  return (
    <AuthProvider>
      <RouterProvider router={router} />
    </AuthProvider>
  );
};

export default App;