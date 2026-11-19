import { createBrowserRouter, RouterProvider } from "react-router"
import Pos from "./pages/Pos"
import ProductsProvider from "./contexts/products/ProductsProvider"
import CartProvider from "./contexts/cart/CartProvider"

const router = createBrowserRouter([{
  path: '/',
  Component: Pos
}])

function App() {
  return (
    <ProductsProvider>
      <CartProvider>
        <RouterProvider router={router} />
      </CartProvider>
    </ProductsProvider>
  )
}

export default App