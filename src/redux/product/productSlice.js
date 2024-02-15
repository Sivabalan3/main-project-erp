import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  items: [],
  status: null,
  error: null,
}
export const productsFectData = createAsyncThunk(
  "/products/productsFectData",
  async (id = null, { rejectWithValue }) => {
    try {
      const response = await axios.get("http://localhost:8888/products")
      return response?.data
    } catch (err) {
      return rejectWithValue(err.response.data)
    }

  }
)
const productSlice = createSlice({
  name: "products",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(productsFectData.pending, (state) => {
        state.status = "pending";
      })
      .addCase(productsFectData.fulfilled, (state, action) => {
        state.status = "success";
        state.items = action.payload;
      })
      .addCase(productsFectData.rejected, (state, action) => {
        state.status = "rejected";
        state.error = action.payload;
      });
  },

})

export default productSlice.reducer