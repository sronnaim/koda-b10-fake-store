import { createBrowserRouter, RouterProvider } from "react-router"
import Pos from "./pages/Pos"
import { Provider as ReduxProvider } from "react-redux"
import { persistor, store } from "./redux/store"
import { PersistGate } from "redux-persist/integration/react"

const router = createBrowserRouter([{
  path: '/',
  Component: Pos
}])

function App() {
  return (
    <ReduxProvider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <RouterProvider router={router} />
      </PersistGate>
    </ReduxProvider>
  )
}

export default App