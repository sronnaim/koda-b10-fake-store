import { useEffect, useState } from "react"
import { productsContext } from './productsContext'

const URL = "/products.json"

function ProductsProvider({ children }) {
  const [products, setProducts] = useState(null);

  useEffect(() => {
    console.log("FETCHING");

    (async () => {
      try {
        const res = await window.fetch(URL)
        const products = await res.json()

        setProducts(products)
      } catch (err) {
        console.error("[ERROR]", err)
      }
    })()
  }, [])

  return (
    <productsContext.Provider value={products}>
      {children}
    </productsContext.Provider>
  )
}

export default ProductsProvider