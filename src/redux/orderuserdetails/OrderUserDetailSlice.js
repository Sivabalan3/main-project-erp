// Import the necessary modules
import axios from "axios";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { notification } from "antd";

// Define the initial state of the data
const initialState = {
  orderid:"",
  name: "",
  phone1: "",
  phone2: "",
  address: "",
  gmail: "",
  paymentoption: "",
  amount: "",
  status: "idle",
  error: null,
};

// Create an async thunk to post the data to the server
export const postData = createAsyncThunk(
  "/userorder/postData",
  async (data, { rejectWithValue }) => {
    try {
      // Use axios to send a post request with the data
      const response = await axios.post("http://localhost:8888/userorder", data);
      // Return the response data
      console.log("axiosdata", data);
      return response.data;
    } catch (error) {
      // Handle any errors and return a custom error message
      return rejectWithValue(error.message);
    }
  }
);


// Create an async thunk to get the data from the server
export const getData = createAsyncThunk(
  "data/getData",
  async (_, { rejectWithValue }) => {
    try {
      // Use axios to send a get request
      const response = await axios.get("/api/data");
      // Return the response data
      return response.data;
    } catch (error) {
      // Handle any errors and return a custom error message
      return rejectWithValue(error.message);
    }
  }
);
// Create an async thunk to update the data on the server
export const updateData = createAsyncThunk(
  "data/updateData",
  async (data, { rejectWithValue }) => {
    try {
      // Use axios to send a patch request with the data
      const response = await axios.patch(`/api/data/${data.id}`, data);
      // Return the response data
      console.log("axiosdata", data);
      return response.data;
    } catch (error) {
      // Handle any errors and return a custom error message
      return rejectWithValue(error.message);
    }
  }
);
// Create an async thunk to delete the data from the server
export const deleteData = createAsyncThunk(
  "data/deleteData",
  async (id, { rejectWithValue }) => {
    try {
      // Use axios to send a delete request with the id
      const response = await axios.delete(`/api/data/${id}`);
      // Return the response data
      console.log("axiosdata", id);
      return response.data;
    } catch (error) {
      // Handle any errors and return a custom error message
      return rejectWithValue(error.message);
    }
  }
);

// Create a slice to manage the data state
export const userorderformdataSlice = createSlice({
  name: "userorderformdata",
  initialState,
  reducers:{
    // PostUserOrderData: (state, action) => {
    //   // Update the state with the action payload
    //   state.orderid=action.payload.orderid;
    //   state.name = action.payload.name;
    //   state.phone1 = action.payload.phone1;
    //   state.phone2 = action.payload.phone2;
    //   state.address = action.payload.address;
    //   state.gmail = action.payload.gmail;
    //   state.paymentoption = action.payload.paymentoption;
    //   state.amount = action.payload.amount;
    // }
  },

  // Add reducers for the async thunks
  extraReducers: (builder) => {
    // Handle the pending state of postData
    builder
      .addCase(postData.pending, (state) => {
        state.status = "loading";
      })
      // Handle the fulfilled state of postData

      .addCase(postData.fulfilled, (state, action) => {
        state.status = "succeeded";
        // Update the state with the response data
        state.orderid=action.payload.orderid;
        state.name = action.payload.name;
        state.phone1 = action.payload.phone1;
        state.phone2 = action.payload.phone2;
        state.address = action.payload.address;
        state.gmail = action.payload.gmail;
        state.paymentoption = action.payload.paymentoption;
        state.amount = action.payload.amount;
        // Display a success notification with the response data
        notification.success({
          message: "Shipping information Saved successfully",
          description: `Your Order Is Created`,
          duration:5
        });
      })
      // Handle the rejected state of postData

      .addCase(postData.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
        notification.error({
          message: "Data post failed",
          description: action.payload,
        });
      })
      // Handle the pending state of getData

      .addCase(getData.pending, (state) => {
        state.status = "loading";
      })
      // Handle the fulfilled state of getData

      .addCase(getData.fulfilled, (state, action) => {
        state.status = "succeeded";
        // Update the state with the response data
        state.name = action.payload.name;
        state.phone1 = action.payload.phone1;
        state.phone2 = action.payload.phone2;
        state.address = action.payload.address;
        state.gmail = action.payload.gmail;
        state.paymentoption = action.payload.paymentoption;
      })
      // Handle the rejected state of getData
      .addCase(getData.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      })
      // Add case reducers for the updateData async thunk
      .addCase(updateData.pending, (state) => {
        // Set the status to loading when the request is pending
        state.status = "loading";
      })
      .addCase(updateData.fulfilled, (state, action) => {
        // Set the status to succeeded when the request is fulfilled
        state.status = "succeeded";
        // Update the state with the response data
        state.name = action.payload.name;
        state.phone1 = action.payload.phone1;
        state.phone2 = action.payload.phone2;
        state.address = action.payload.address;
        state.gmail = action.payload.gmail;
        state.paymentoption = action.payload.paymentoption;
        state.amount = action.payload.amount;
      })
      .addCase(updateData.rejected, (state, action) => {
        // Set the status to failed when the request is rejected
        state.status = "failed";
        // Set the error to the custom error message
        state.error = action.payload;
      })
      // Add case reducers for the deleteData async thunk
      .addCase(deleteData.pending, (state) => {
        // Set the status to loading when the request is pending
        state.status = "loading";
      })
      .addCase(deleteData.fulfilled, (state, action) => {
        // Set the status to succeeded when the request is fulfilled
        state.status = "succeeded";
        // Reset the state to the initial state
        state.name = "";
        state.phone1 = "";
        state.phone2 = "";
        state.address = "";
        state.gmail = "";
        state.paymentoption = "";
        state.amount = "";
      })
      .addCase(deleteData.rejected, (state, action) => {
        // Set the status to failed when the request is rejected
        state.status = "failed";
        // Set the error to the custom error message
        state.error = action.payload;
      });

  }
});

// Export the data slice reducer
export const {PostUserOrderData} =userorderformdataSlice.actions
export default userorderformdataSlice.reducer;

