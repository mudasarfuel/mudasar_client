import { Box } from "@mui/material";
import React, { useState } from "react";
import DataTable from "../../Components/datatable/DataTable";
import Header from "../../Components/Header/Header";
import { subColumns, subRows } from "../../Components/datatable/dataTableSources";
import { Receipt } from "@mui/icons-material";
import GridForm from "../../Components/form/GridForm";
import { reportColumns } from "../../Components/datatable/reportsTableSources";
import Search from "../../Components/search/Search";
import { searchWastageFilters } from "../../Components/sources/wastagesFormSources";
import { searchEmployeeInput } from "../../Components/sources/employeesFormSources";
import { toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import { genReport, getReports } from "../../redux/reportSlice/reportSlice";
import { ENDPOINTS } from "../../backend/API";
import axios from "axios"
//SEARCH USERS INPUTS
const searchReportInput = (printReport) => [
  {
    id: 1,
    label: "Start Date",
    type: "date",
    name: "startDate",
    grid: {
      xs: 12,
      sm: 4
    }
  },
  {
    id: 2,
    label: "End Date",
    type: "date",
    name: "endDate",
    grid: {
      xs: 12,
      sm: 4
    }
  },

  {
    id: 3,
    label: "Filter",
    type: "button",
    btntype: "submit",
    variant: "contained",
    color: "primary",
    grid: {
      xs: 12,
      sm: 2
    },
  },
  {
    id: 4,
    label: "Print",
    type: "button",
    btntype: "button",
    variant: "contained",
    btnFunc: printReport,
    color: "primary",
    grid: {
      xs: 12,
      sm: 2
    },
  },
]


export default function Report() {

  //Initializing use dispatch 
  const disptach = useDispatch()
  //Initializing reports
  const reports = useSelector(state => state.reports.data)
  const totalRecords = useSelector(state => state.reports.totalRecord)
  //State for hold values
  const [state, setState] = useState({
    startDate: "",
    endDate: ""
  })

  // Function for Capitalizing the data
  function capitalizeEachWord(sentence) {
    console.log(sentence)
    return sentence
      .split(" ")
      .map((word) => {
        return word.charAt(0).toUpperCase() + word.slice(1);
      })
      .join(" ");
  }

  const printReport = async () => {
    async function genReport(initData) {
      const { startDate, endDate } =
        initData;
      try {
        // Fetch the PDF Blob directly in the component
        const response = await axios.get(`${ENDPOINTS.GENREPORT}?startDate=${startDate}&endDate=${endDate}`, {
          responseType: 'blob',
        });

        // Create a blob URL and open it
        const pdfBlob = new Blob([response.data], { type: 'application/pdf' });
        const pdfUrl = window.URL.createObjectURL(pdfBlob);
        window.open(pdfUrl, '_blank');

        // Optionally, clean up the object URL after use
        window.URL.revokeObjectURL(pdfUrl);
      } catch (error) {
        console.error('Error fetching the PDF:', error);
      }
    }
    try {
      // Start the PDF generation process in Redux (but don't store the Blob)
      const { startDate, endDate } = state

      if (startDate === "" && endDate === "") {
        toast("Please select date first", { position: "top-right", type: "error" })
      } else {

        if (startDate !== "" && endDate !== "") {

          //If both dates are selected 
          let newData = { startDate: startDate, endDate: endDate }
          //Hid Function 
          genReport(newData)
        } else if (startDate !== "" && endDate === "") {
          //If start date is selected set endDate same to start date
          let newData = { startDate: startDate, endDate: startDate }
          //Hit API Call
          genReport(newData)
        } else if (startDate === "" && endDate !== "") {
          //If start date is selected set endDate same to start date
          let newData = { startDate: endDate, endDate: endDate }
          //Hit API Call
          genReport(newData)
        }
      }

     
    } catch (error) {
      console.error('Error fetching the PDF:', error);
    }
  }
  //Iterate and capitalizing data of each row

  let array = []
  reports.map((row) => {

    for (let i = 0; i < Object.keys(row).length; i++) {
      if (Object.keys(row)[i] === "products") {
        // Access the 'products' array dynamically
        const getRow = row[Object.keys(row)[i]];  // Dynamically fetches row.products

        // Clone 'products' array to make it extensible
        let newRow = [...getRow].map(modified => {
          return {
            ...modified,
            id: modified._id
          }
        });
        // Push new product into the cloned array
        newRow.unshift({ id: 1001, heading: "Products" });

        array.push(...newRow)
      } else if (Object.keys(row)[i] === "grossTotal") {
        // Access the 'products' array dynamically
        const getRow = row[Object.keys(row)[i]];  // Dynamically fetches row.products

        // Clone 'products' array to make it extensible
        let newRow = [...getRow].map(modified => {
          return {
            ...modified,
            id: modified._id
          }
        });
        // Push new product into the cloned array
        newRow.unshift({ id: 1002, heading: "Gross Totals" });

        array.push(...newRow)
      } else if (Object.keys(row)[i] === "expenseData") {
        // Access the 'products' array dynamically
        const getRow = row[Object.keys(row)[i]];  // Dynamically fetches row.products

        // Clone 'products' array to make it extensible
        let newRow = [...getRow].map(modified => {
          return {
            ...modified,
            id: modified._id
          }
        });
        // Push new product into the cloned array
        newRow.unshift({ id: 1003, heading: "Total Expense" });

        array.push(...newRow)
      } else if (Object.keys(row)[i] === "recovery") {
        // Access the 'products' array dynamically
        const getRow = row[Object.keys(row)[i]];  // Dynamically fetches row.products

        // Clone 'products' array to make it extensible
        let newRow = [...getRow].map(modified => {
          return {
            ...modified,
            id: modified._id
          }
        });
        // Push new product into the cloned array
        newRow.unshift({ id: 1005, heading: "Recovery" });

        array.push(...newRow)
      }
    }
    console.log("check row item => ", Object.keys(row)[1])

  }
  );

  const iterateRows = array.map(item => {
    return {
      ...item
    }
  })
  // console.log(...capitalizedRows)
  console.log(array)
  //Create handle one submit function 
  const handleOnSubmit = (e) => {
    e.preventDefault()

    const { startDate, endDate } = state

    if (startDate === "" && endDate === "") {
      toast("Please select date first", { position: "top-right", type: "error" })
    } else {

      if (startDate !== "" && endDate !== "") {

        //If both dates are selected 
        let newData = { startDate: startDate, endDate: endDate }
        //Hid Function 
        disptach(getReports(newData))
      } else if (startDate !== "" && endDate === "") {
        //If start date is selected set endDate same to start date
        let newData = { startDate: startDate, endDate: startDate }
        //Hit API Call
        disptach(getReports(newData))
      } else if (startDate === "" && endDate !== "") {
        //If start date is selected set endDate same to start date
        let newData = { startDate: endDate, endDate: endDate }
        //Hit API Call
        disptach(getReports(newData))
      }
    }

  }
  return (
    <Box m="0px 20px 20px 20px">
      {/* Header for subscription page  */}
      <Header title="Reports" subTitle="Generate Statement or Report" icon={<Receipt />} />
      {/* Here we calling Search component in which we 
        are passing Filters state and Input Values state  */}
      <Box sx={{ paddingLeft: 3, paddingRight: 3 }}>

        <GridForm inputs={searchReportInput(printReport)} state={state} setState={setState} submit={handleOnSubmit} />
      </Box>
      {/* Data Table of Subscription Plans */}
      <DataTable columns={reportColumns} rows={array.length > 0 && iterateRows} footer={true} />
    </Box>
  );
}
