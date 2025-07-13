import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios"
import { ENDPOINTS } from "../../backend/API";
//GET ALL REPORTS AXIOS CALL USING ASYNC THUNK
export const getReports = createAsyncThunk("getReports", async (initData) => {
    try {
      const { startDate, endDate } =
        initData;
       
      //Creating API call using ENDPOINTS as Base URL (/api/reports)
      return await axios
        .get(
          `${ENDPOINTS.REPORT}?startDate=${startDate}&endDate=${endDate}`
        )
        .then((res) => res.data);
    } catch (error) {
      //Incase of error catch error
      return error.response.data.error[0];
    }
  });

  export const genReport = createAsyncThunk("genReport", async (initData) => {
    try {
      const { startDate, endDate } =
        initData;
       
      //Creating API call using ENDPOINTS as Base URL (/api/reports)
      return await axios
        .get(
          `${ENDPOINTS.GENREPORT}?startDate=${startDate}&endDate=${endDate}`,{
            responseType: 'blob', // Important to specify 'blob' response type for binary data
          }
        )
        .then((res) => res.data);
    } catch (error) {
      //Incase of error catch error
      return error.response.data.error[0];
    }
  });


//create new slice 
export const reportSlice = createSlice({
    name: "reports",
    initialState: {
        data: [],
        errors: []
    },
    reducers: {
        clearReports(){
            return {
                data: [],
                errors: []
            }
        }
    },
    extraReducers: (builder) => {

    //@CaseNo       01
    //@Request      GET
    //@Status       Success
    //@Loading      False
    //@used For     GET REPORTS
    //@Data         Data stored in state
    builder.addCase(genReport.fulfilled, (state, actions) => {
       // Create a blob from the PDF response
       const pdfBlob = new Blob([actions.payload], { type: 'application/pdf' });

       // Create a URL for the blob
       const pdfUrl = window.URL.createObjectURL(pdfBlob);
 
       // Open the new PDF in a new tab
       window.open(pdfUrl, '_blank');
 
       // Optionally, revoke the object URL after use (for memory cleanup)
       window.URL.revokeObjectURL(pdfUrl);
        //Check for request success
        console.log(actions.payload)
        // if (actions.payload.success === true) {
        //   //First Removing all the previous page readings
        //   state.data = [];
        //   //Using map iterate each item and push into the state
        //   actions.payload.data.map((item) => {
        //     //Here we are modifying the _id to id of each record
        //     // const report = { ...item, id: item._id };
        //     //Here we are setting the fetched readings in redux store
        //     return state.data.push(item);
        //   });
        // }
      });

  
    //@CaseNo       01
    //@Request      GET
    //@Status       Success
    //@Loading      False
    //@used For     GET REPORTS
    //@Data         Data stored in state
    builder.addCase(getReports.fulfilled, (state, actions) => {
      //Check for request success
      console.log(actions.payload)
      if (actions.payload.success === true) {
        //First Removing all the previous page readings
        state.data = [];
        //Using map iterate each item and push into the state
        actions.payload.data.map((item) => {
          //Here we are modifying the _id to id of each record
          // const report = { ...item, id: item._id };
          //Here we are setting the fetched readings in redux store
          return state.data.push(item);
        });
      }
    });
    }
})


export const {clearReports} = reportSlice.actions
export default reportSlice.reducer