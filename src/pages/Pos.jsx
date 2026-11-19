import { useContext } from "react"
import { productsContext } from "../contexts/products/productsContext"
import { cartContext } from "../contexts/cart/cartContext";

function Pos() {
  const products = useContext(productsContext);
  const [cart, dispatchCart] = useContext(cartContext);

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
    <main className="container mx-auto p-4">
      <h1 className="text-center font-bold uppercase text-2xl">The most awesome fake store POS</h1>
      <div className="grid md:grid-cols-[3fr_1fr] gap-10">
        <section className="grid gap-4">
          <h2>These be on stock</h2>
          <div className="rounded-2xl bg-zinc-100 inset-shadow-sm border border-black/10 h-[90vh] overflow-y-scroll">
            <ul className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
              {products.map(product =>
                <li key={product.id} onClick={() => handleIncrQty(product)} className="hover:bg-zinc-50 active:bg-zinc-200 grid justify-center p-4">
                  <div className="row-span-3 aspect-square max-w-50 overflow-hidden mx-auto">
                    <img src={product.image} className="w-full h-full object-contain" alt={product.description} />
                  </div>
                  <h3 className="text-center">{product.title}</h3>
                  <p className="text-center">{product.price.toLocaleString('US', { style: "currency", currency: "USD" })}</p>
                </li>
              )}
            </ul>
          </div>
        </section>
        <section>
          <h2 className="p-2">Cart</h2>
          <ul className="inset-shadow-sm border border-black/10 min-h-50 rounded-xl bg-zinc-100 *:hover:bg-zinc-50 overflow-hidden max-h-[90vh] overflow-y-scroll">
            {cart && cart.length > 0 &&
              cart.map(line =>
                <li key={line.id} className="*:p-2 items-center grid grid-cols-[1fr_2fr] has-[button:active]:bg-zinc-200">
                  <div className="w-24 h-24 row-span-3 overflow-hidden">
                    <img src={line.image} alt={line.description} className="w-full object-contain h-full" />
                  </div>
                  <h3>{line.title}</h3>
                  <div className="flex items-center gap-2">
                    <button onClick={() => handleDecrQty(line)} className="bg-blue-500 rounded-md text-zinc-50 h-5 aspect-square inline-flex items-center justify-center">-</button>
                    {line.qty}
                    <button onClick={() => handleIncrQty(line)} className="bg-blue-500 rounded-md text-zinc-50 h-5 aspect-square inline-flex items-center justify-center">+</button>
                  </div>
                  <span>{(line.price * line.qty).toLocaleString('US', { style: "currency", currency: "USD" })}</span>
                </li>
              )
            }
          </ul>
        </section>
      </div>
    </main >
  )
}

export default Pos