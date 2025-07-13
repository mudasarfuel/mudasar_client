import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { toast } from "react-toastify";
import { ENDPOINTS } from "../../backend/API"; // Adjust the path if needed

// ========== ASYNC THUNKS ==========

// GET all customer advance records with optional filters
export const getCustomerAdvances = createAsyncThunk("getCustomerAdvances", async (queryParams) => {
  try {
    const response = await axios.get(`${ENDPOINTS.CUSTOMER_ADVANCE}?${new URLSearchParams(queryParams)}`);
    return response.data;
  } catch (error) {
    return error.response.data;
  }
});

// GET single customer advance entry by ID
export const getSingleCustomerAdvance = createAsyncThunk("getSingleCustomerAdvance", async (id) => {
  try {
    const response = await axios.get(`${ENDPOINTS.CUSTOMER_ADVANCE}/${id}`);
    return response.data;
  } catch (error) {
    return error.response.data;
  }
});

// POST: Add a new customer advance
export const addCustomerAdvance = createAsyncThunk("addCustomerAdvance", async (data) => {
  try {
    const response = await axios.post(ENDPOINTS.CUSTOMER_ADVANCE, data);
    return response.data;
  } catch (error) {
    return error.response.data;
  }
});

// PUT: Update an existing customer advance
export const updateCustomerAdvance = createAsyncThunk("updateCustomerAdvance", async ({ id, Data }) => {
  try {
    const response = await axios.put(`${ENDPOINTS.CUSTOMER_ADVANCE}/${id}`, Data);
    return response.data;
  } catch (error) {
    return error.response.data;
  }
});

// DELETE: Remove a customer advance
export const deleteCustomerAdvance = createAsyncThunk("deleteCustomerAdvance", async (id) => {
  try {
    const response = await axios.delete(`${ENDPOINTS.CUSTOMER_ADVANCE}/${id}`);
    return response.data;
  } catch (error) {
    return error.response.data;
  }
});

// ========== SLICE ==========

export const customerAdvanceSlice = createSlice({
  name: "customerAdvance",
  initialState: {
    current: {},
    data: [],
    totalRecord: 0,
    errors: []
  },
  reducers: {
    clearCustomerAdvance() {
      return {
        current: {},
        data: [],
        totalRecord: 0,
        errors: []
      };
    },
  },
  extraReducers: (builder) => {
    // GET all
    builder.addCase(getCustomerAdvances.fulfilled, (state, action) => {
      if (action.payload.success === true) {
        state.data = action.payload.data.map(item => ({
          ...item,
          id: item._id,
        }));
        state.totalRecord = action.payload.totalRecords;
      }
    });

    // GET single
    builder.addCase(getSingleCustomerAdvance.fulfilled, (state, action) => {
      if (action.payload.success === true) {
        state.current = action.payload.data;
      }
    });

    // ADD new
    builder.addCase(addCustomerAdvance.fulfilled, (state, action) => {
      if (action.payload?.errors?.length > 0) {
        state.errors = action.payload.errors;
      } else if (action.payload.success === true) {
        toast(action.payload.msg, { type: "success" });
        const newEntry = { ...action.payload.advance[0], id: action.payload.advance[0]._id };
        state.data = [newEntry, ...state.data.slice(0, 4)];
        state.totalRecord = action.payload.totalRecord;
        state.errors = [];
      }
    });

    // UPDATE
    builder.addCase(updateCustomerAdvance.fulfilled, (state, action) => {
      if (action.payload?.errors?.length > 0) {
        state.errors = action.payload.errors;
      } else if (action.payload.success === true) {
        toast(action.payload.msg, { type: "success" });
        const updated = { ...action.payload.updated[0], id: action.payload.updated[0]._id };
        state.data = state.data.map((item) => (item.id === updated.id ? updated : item));
        state.errors = [];
      }
    });

    // DELETE
    builder.addCase(deleteCustomerAdvance.fulfilled, (state, action) => {
      if (action.payload.success === true) {
        toast(action.payload.msg, { type: "error" });
        state.data = state.data.filter((item) => item.id !== action.payload.id);
        state.totalRecord = action.payload.totalRecords;
      }
    });
  },
});

// Export reducer and actions
export const { clearCustomerAdvance } = customerAdvanceSlice.actions;
export default customerAdvanceSlice.reducer;
