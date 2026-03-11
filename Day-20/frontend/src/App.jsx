import { RouterProvider } from "react-router";
import { router } from "./app.route";
import { AuthProvider } from "./features/auth/auth.context";
import "../src/shared/global.scss";
import { PostContextProvider } from "./features/posts/post.context";


const App = () => {
  return (
    <AuthProvider>
      <PostContextProvider>
      <RouterProvider router={router} />
      </PostContextProvider>
      
    </AuthProvider>
  );
};

export default App;