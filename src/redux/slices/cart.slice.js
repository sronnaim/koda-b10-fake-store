import { createSlice } from "@reduxjs/toolkit";

/**
 * 
 * @param {CartItem} prev 
 * @param {{ payload: Product }}  
 */
function rIncrQty(prev, { payload }) {
  const foundItem = prev.find(line => line.id === payload.id)

  if (!foundItem) {
    return [...prev, { ...payload, qty: 1 }]
  }

  return prev.map(line => {
    if (line.id === foundItem.id)
      return { ...line, qty: line.qty + 1 }

    return line
  })
}

/**
 * 
 * @param {CartItem[]} prev 
 * @param {{ payload: Product }}  
 */
function rDecrQty(prev, { payload }) {
  const foundItem = prev.find(line => line.id === payload.id)

  if (!foundItem) {
    return prev
  }

  if (foundItem.qty === 1)
    return prev.filter(line => line.id !== foundItem.id)

  return prev.map(line => {
    if (line.id === foundItem.id)
      return { ...line, qty: line.qty - 1 }

    return line
  })
}

export const cartSlice = createSlice({
  name: 'cart',
  initialState: [],
  reducers: {
    incrQty: rIncrQty,
    decrQty: rDecrQty
  }
})

export const { incrQty, decrQty } = cartSlice.actions

export default cartSlice.reducer