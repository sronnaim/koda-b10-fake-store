import { useContext } from "react"
import { productsContext } from "../contexts/products/productsContext"
import { cartContext } from "../contexts/cart/cartContext";

function Pos() {
  const products = useContext(productsContext);
  const [cart, dispatchCart] = useContext(cartContext);

  console.log(cart)

  function handleIncrQty(p) {
    dispatchCart({
      action: 'incr_qty',
      payload: p
    })
  }

  function handleDecrQty(p) {
    dispatchCart({
      action: 'decr_qty',
      payload: p
    })
  }

  if (!products)
    return <main>LOADING...</main>

  return (
    <main>
      <h1>The most awesome fake store</h1>
      <div className="grid md:grid-cols-[3fr_1fr]">
        <section>
          <h2>These be on stock</h2>
          <ul className="grid">
            {products.map(product =>
              <li key={product.id} onClick={() => handleIncrQty(product)}>
                <div>
                  <img src={product.image} alt={products.title} />
                </div>
                <h3>{product.title}</h3>
                <p>{product.description}</p>
                <p>{product.price}</p>
              </li>
            )}
          </ul>
        </section>
        <section>
          <h2>Cart</h2>
          <ul>
            {cart && cart.length > 0 &&
              cart.map(line =>
                <li key={line.id}>
                  <h3>{line.title}</h3>
                  <div>
                    <button onClick={() => handleDecrQty(line)}>-</button>
                    {line.qty}
                    <button onClick={() => handleIncrQty(line)}>+</button>
                  </div>
                </li>
              )
            }
          </ul>
        </section>
      </div>
    </main>
  )
}

export default Pos