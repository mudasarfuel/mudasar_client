import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { ENDPOINTS } from "../../backend/API";
import axios from "axios";
import { toast } from "react-toastify";

//GET ALL CUSTOMERS AXIOS CALL USING ASYNC THUNK
export const getCustomers = createAsyncThunk("getCustomers", async (initData) => {
  try {
    const { field, operator, sort, page, searchInput } =
      initData;
     
    //Creating API call using ENDPOINTS as Base URL (/api/customers)
    // field=${field}&operator=${operator}&searchInput=${searchInput}&
    console.log("Field => ", field, "Operator =>", operator, "sort => ", sort, "Page =>", page, "Search Input =>", searchInput)
    return await axios
      .get(
        `${ENDPOINTS.CUSTOMER}?field=${field}&operator=${operator}&searchInput=${searchInput}&page=${page}&sort=${sort}`
      )
      .then((res) => res.data);
  } catch (error) {
    //Incase of error catch error
    return error.response.data.error[0];
  }
});

//GET SINGLE CUSTOMER AXIOS CALL USING ASYNC THUNK
export const getSingleCustomer = createAsyncThunk("getSingleCustomer", async (id) => {
  try {
    //Creating API Call using base url (/api/customers/:id)
    return await axios.get(`${ENDPOINTS.CUSTOMER}/${id}`).then(res => res.data)
  } catch (error) {
    //In case of error
    return error.response.data.error[0]
  }
})
//ADD CUSTOMER AXIOS CALL USING ASYNC THUNK
export const addCustomer = createAsyncThunk("addCustomer", async (Data) => {
  try {
    //Creating API call using ENDPOINTS as Base URL (/api/webadmin/tenants)
    return await axios
      .post(ENDPOINTS.CUSTOMER, Data)
      .then((res) => res.data);
  } catch (error) {
      //Incase of error catch error
      return error.response.data
  }
});
//UPDATE CUSTOMER AXIOS CALL USING ASYNC THUNK
export const updateCustomer = createAsyncThunk("updateCustomer", async (initData) => {
  try {
    //De Structuring data
    const {id, Data} = initData
  
    //Creating API call using ENDPOINTS as Base URL (/api/customers/:id)
    return await axios.put(`${ENDPOINTS.CUSTOMER}/${id}`, Data).then(res => res.data)
  } catch (error) {
   

    //Incase of error catch error
    return error.response.data
    
  }
})
//DELETE CUSTOMER AXIOS CALL USING ASYNC THUNK
export const deleteCustomer = createAsyncThunk("deleteCustomer", async (id) => {
  try {
    //Creating API Call using ENDPOINTS as Base URL (/api/customers/:id)
    return await axios
      .delete(`${ENDPOINTS.CUSTOMER}/${id}`)
      .then((res) => res.data);
  } catch (error) {
    return error.response.data.error[0];
  }
});
//Creating Customers Slice
export const customerSlice = createSlice({
  name: "customers",
  initialState: {
    current: {}, 
    data: [],
    totalRecord: 0,
    errors: []
  },
  reducers: {
    clearCustomers() {
      return {
        current: {},
        data: [],
        totalRecord: 0,
        errors: []
      };
    },
  },
  extraReducers: (builder) => {
    //@CaseNo       01
    //@Request      GET
    //@Status       Success
    //@Loading      False
    //@used For     GET CUSTOMERS
    //@Data         Data stored in state
    builder.addCase(getCustomers.fulfilled, (state, actions) => {
      //Check for request success
      if (actions.payload.success === true) {
        //First Removing all the previous page customers
        state.data = [];
        //Using map iterate each item and push into the state
        actions.payload.data.map((item) => {
          //Here we are modifying the _id to id of each record
          const customer = { ...item, id: item._id };
          //Here we are setting the fetched customers in redux store
          return state.data.push(customer);
        });
        //Here we are setting total number of records in redux store
        state.totalRecord = actions.payload.totalRecords;
      }
    });
    
    //@CaseNo       03
    //@Request      GET
    //@Status       Success
    //@Loading      False
    //@used For     GET SINGLE CUSTOMER
    //@Response     Date Stored in State current
    builder.addCase(getSingleCustomer.fulfilled, (state, action)=> {
      //Checking for success
      if(action.payload.success === true){
        //Set state
       return {
        ...state,
        current: action.payload.data
       }
      }
    })

    //@CaseNo       04
    //@Request      POST
    //@Status       Success
    //@Loading      False
    //@used for     Add Customer 
    //@Response     Success Alert
    builder.addCase(addCustomer.fulfilled, (state, action) => {
      console.log(action.payload)
      //Check for errors
      if(action.payload?.errors?.length > 0){
        return {
          ...state,
          errors: action.payload.errors
        }
      }
      //Check for success status
      if(action.payload?.success === true){
        //toast
        toast(action.payload.msg, {position: "top-right", type: "success"})
        //Modifying id
        const customer = {...action.payload.customer, id: action.payload.customer._id}
        return {
          ...state,
          data: [...state.data, customer],
          errors: []
        }
      }
    })

    //@CaseNo       05
    //@Request      PUT
    //@Status       Success
    //@Loading      False
    //@used For     Update Customer
    //@Response     Success Alert
    builder.addCase(updateCustomer.fulfilled, (state, action)=> {
      
      if(action.payload?.errors?.length > 0){
        return {
          ...state,
          errors: action.payload.errors
        }
      }
      //Check for Success
      if(action.payload.success === true){
       
        const updatedCustomer = {...action.payload.updated, id: action.payload.updated._id}
        //Show Alert
        toast(action.payload.msg, {position: "top-right", type: "success"})
        return {
          ...state,
          data: state.data.map(item => 
            item.id === action.payload.updated._id ? updatedCustomer : item
          ),
          errors: []
        }
      }
    })
    //@CaseNo       05
    //@Request      DELETE
    //@Status       Success
    //@Loading      False
    //@used for     DELETE CUSTOMER
    //@Data         Filtered data stored
    builder.addCase(deleteCustomer.fulfilled, (state, action) => {
      //Check for request success
      if (action.payload.success === true) {
        //Set Alert
        toast(action.payload.msg, { position: "bottom-right", type: "error" });
        return {
          ...state,
          data: [...state.data.filter(
            (item) => item.id !== action.payload.id
          )],
          totalRecord: action.payload.totalRecords,
        };
      }
    });

    
  },
});

//Export Reducer functions
export const { clearCustomers } = customerSlice.actions;
export default customerSlice.reducer;
