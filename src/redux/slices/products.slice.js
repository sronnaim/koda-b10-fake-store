import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

const PRODUCTS_SEED_URL = "https://fakestoreapi.com/products"

const initialState = {
  products: [],
  flags: {
    status: null,
    errMsg: null
  }
}

export const productsSlice = createSlice({
  name: 'products',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    return builder.addAsyncThunk(seedProductsThunk, {
      fulfilled: (_, { payload }) => {
        return {
          products: payload,
          flags: {
            status: 'success',
            errMsg: null
          }
        }
      },
      pending: (prev) => {
        return {
          ...prev,
          flags: {
            status: 'pending',
            errMsg: null
          }
        }
      },
      rejected: (prev, { payload }) => {
        return {
          ...prev,
          flags: {
            ...prev.flags,
            errMsg: payload
          }
        }
      }
    })
  }
})

const seedProductsThunk = createAsyncThunk(
  'products/seed',
  async (_, { rejectWithValue }) => {
    try {
      const res = await fetch(PRODUCTS_SEED_URL)
      if (!res.ok) throw new Error(res.status)

      const data = await res.json()
      return data
    } catch (err) {
      return rejectWithValue(err.message)
    }
  }
)


export const productActions = {
  ...productsSlice.actions,
  seedProductsThunk
}
export default productsSlice.reducer