import { RouterProvider } from "react-router"
import { router } from "./app.routes.jsx"
import "./features/shared/styles/global.scss"
import { AuthProvider } from "./features/auth/auth.context.jsx"
import { SongContextProvider } from "./features/home/song.context.jsx"
const App = () => {
  return (
    <div>
      <AuthProvider>
        <SongContextProvider>
        <RouterProvider router={router} />
        </SongContextProvider>
      </AuthProvider>

    </div>
  )
}

export default App