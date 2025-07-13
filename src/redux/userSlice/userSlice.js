import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { ENDPOINTS } from "../../backend/API";
import axios from "axios";
import { toast } from "react-toastify";

//GET ALL USERS AXIOS CALL USING ASYNC THUNK
export const getAllUsers = createAsyncThunk("getAllUsers", async (initData) => {
  try {
    //De-Structure init data to get values 
    const {page, sort} = initData
    console.log("checking get user api call => " , initData)
    //Creating API Call using Base URL (/api/users)
    return await axios.get(`${ENDPOINTS.USER}?page=${page}&sort=${sort}`).then((res) => res.data);
  } catch (error) {
    //In case of error catch error
    return error.response.data.error[0];
  }
});
//ADD USER AXIOS CALL USING ASYNC THUNK
export const addUser = createAsyncThunk("addUser", async (Data) => {
  try {
    //Creating API call using ENDPOINTS as Base URL (/api/users)
    return await axios
      .post(ENDPOINTS.USER, Data)
      .then((res) => res.data);
  } catch (error) {
      //Incase of error catch error
      return error.response.data
  }
});
//Creating Users Slice
export const userSlice = createSlice({
  name: "users",
  initialState: {
    data: [],
    totalRecord: 0,
    current: {},
    errors: []
  },
  reducers: {
    clearUsers() {
      return {
        data: [],
        totalRecord: 0,
        current: {},
        errors: []
      };
    },
  },
  extraReducers: (builder) => {
    //@CaseNo       01
    //@Request      GET
    //@Status       Success
    //@Loading      False
    //@used For     GET TENANTS
    //@Response         Data stored in state
    builder.addCase(getAllUsers.fulfilled, (state, action) => {
      console.log("Check for users => ", action.payload)
        //Checking for success
        if(action.payload.success === true){
            //First Remove all previous items
            state.data = []
            //Iterating data by map
            action.payload.data.map(item => {
                // creating new item with id 
                const user = {...item, id: item._id}
                //Push the item in the state
                return state.data.push(user)
            }) 
            //Set Total records
            state.totalRecord = action.payload.totalRecords
        }
    })

    //@CaseNo       04
    //@Request      POST
    //@Status       Success
    //@Loading      False
    //@used for     Add Customer 
    //@Response     Success Alert
    builder.addCase(addUser.fulfilled, (state, action) => {
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
        const user = {...action.payload.user, id: action.payload.user._id}
        return {
          ...state,
          data: [...state.data, user],
          errors: []
        }
      }
    })
  },
});

//Export Reducer function
export const { clearUsers } = userSlice.actions;
export default userSlice.reducer;
