import { useReducer } from 'react'
import { cartContext } from './cartContext'

const ACTIONS = {
  'incr_qty': incrQty,
  'decr_qty': decrQty
}

function incrQty(cart, product) {
  const foundItem = cart.find(line => line.id === product.id)

  if (!foundItem) {
    return [...cart, { ...product, qty: 1 }]
  }

  return cart.map(line => {
    if (line.id === foundItem.id)
      return { ...line, qty: line.qty + 1 }

    return line
  })
}

function decrQty(cart, product) {
  const foundItem = cart.find(line => line.id === product.id)

  if (!foundItem) {
    return cart
  }

  if (foundItem.qty === 1)
    return cart.filter(line => line.id !== foundItem.id)

  return cart.map(line => {
    if (line.id === foundItem.id)
      return { ...line, qty: line.qty - 1 }

    return line
  })
}

function reducer(prev, { action, payload }) {
  const actionFn = ACTIONS[action]

  return action ? actionFn(prev, payload) : prev
}

function CartProvider({ children }) {
  const [cart, dispatch] = useReducer(reducer, [])

  return (
    <cartContext.Provider value={[cart, dispatch]}>
      {children}
    </cartContext.Provider>
  )
}

export default CartProvider