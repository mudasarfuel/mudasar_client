import { Box } from "@mui/material";
import React, { useEffect, useState } from "react";

import Header from "../../Components/Header/Header";

import { Receipt } from "@mui/icons-material";
import GridForm from "../../Components/form/GridForm";
import Search from "../../Components/search/Search";
import { toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import {
  getCustomerReports,
  getPrintMonthlyReport,
  getReports,
} from "../../redux/reportSlice/reportSlice";
import { DOMAIN, ENDPOINTS } from "../../backend/API";
import axios from "axios";
import "./style.scss";
import { getAllActiveCustomers } from "../../redux/completeDataSlice/completeDataSlice";
import { clearCustomers } from "../../redux/customerSlice/customerSlice";
//SEARCH USERS INPUTS
const searchReportInput = (printReport, customers) => [
  {
    id: 1,
    label: "Customer",
    type: "select",
    name: "customerId",
    options:
      customers.length > 0 &&
      customers.map((item) =>
        // Here we are setup the filter operator items
        {
          return {
            id: item._id,
            name: item.name,
            value: item._id,
            avatarUrl: `${DOMAIN}/public/customers/images/${item.pic}`,
            avatarAlt: "./img/avatarfile.png",
            salary: item?.balance?.toLocaleString("en-US", {
              style: "currency",
              currency: "PKR",
              minimumFractionDigits: 2,
              maximumFractionDigits: 2,
            }),
          };
        }
      ),
    grid: {
      xs: 12,
      sm: 12,
      md: 12,
      lg: 12,
    },
  },
  {
    id: 2,
    label: "Start Date",
    type: "date",
    name: "startDate",
    grid: {
      xs: 12,
      sm: 4,
    },
  },
  {
    id: 3,
    label: "End Date",
    type: "date",
    name: "endDate",
    grid: {
      xs: 12,
      sm: 4,
    },
  },

  {
    id: 4,
    label: "Filter",
    type: "button",
    btntype: "submit",
    variant: "contained",
    color: "primary",
    grid: {
      xs: 12,
      sm: 2,
    },
  },
  {
    id: 5,
    label: "Print",
    type: "button",
    btntype: "button",
    variant: "contained",
    btnFunc: printReport,
    color: "primary",
    grid: {
      xs: 12,
      sm: 2,
    },
  },
];

export default function CustomerReport() {
  //Initializing use dispatch
  const disptach = useDispatch();
  //Initializing reports
  const reports = useSelector((state) => state.reports.data);

  const customers = useSelector((state) => state.completeData.customers);

  console.log(customers);

  useEffect(() => {
    disptach(getAllActiveCustomers());

    return () => {
      disptach(clearCustomers());
    };

    //eslint-disable-next-line
  }, []);

  //State for hold values
  const [state, setState] = useState({
    customerId: "",
    startDate: "",
    endDate: "",
  });

  // Function for Capitalizing the data
  function capitalizeEachWord(sentence) {
    return sentence
      .split(" ")
      .map((word) => {
        return word.charAt(0).toUpperCase() + word.slice(1);
      })
      .join(" ");
  }

  const printReport = async () => {
    const { startDate, endDate } = state;

    if (startDate === "" && endDate === "") {
      toast("Please select date first", {
        position: "top-right",
        type: "error",
      });
    } else {
      if (startDate !== "" && endDate !== "") {
        //If both dates are selected
        let newData = { startDate: startDate, endDate: endDate };
        //Hid Function
        disptach(getPrintMonthlyReport(newData));
      } else if (startDate !== "" && endDate === "") {
        //If start date is selected set endDate same to start date
        let newData = { startDate: startDate, endDate: startDate };
        //Hit API Call
        disptach(getPrintMonthlyReport(newData));
      } else if (startDate === "" && endDate !== "") {
        //If start date is selected set endDate same to start date
        let newData = { startDate: endDate, endDate: endDate };
        //Hit API Call
        disptach(getPrintMonthlyReport(newData));
      }
    }
  };
  //Iterate and capitalizing data of each row

  // let array = [];
  // reports.map((row) => {
  //   for (let i = 0; i < Object.keys(row).length; i++) {
  //     if (Object.keys(row)[i] === "products") {
  //       // Access the 'products' array dynamically
  //       const getRow = row[Object.keys(row)[i]]; // Dynamically fetches row.products

  //       // Clone 'products' array to make it extensible
  //       let newRow = [...getRow].map((modified) => {
  //         return {
  //           ...modified,
  //           id: modified._id,
  //         };
  //       });
  //       // Push new product into the cloned array
  //       newRow.unshift({ id: 1001, heading: "Products" });

  //       array.push(...newRow);
  //     } else if (Object.keys(row)[i] === "grossTotal") {
  //       // Access the 'products' array dynamically
  //       const getRow = row[Object.keys(row)[i]]; // Dynamically fetches row.products

  //       // Clone 'products' array to make it extensible
  //       let newRow = [...getRow].map((modified) => {
  //         return {
  //           ...modified,
  //           id: modified._id,
  //         };
  //       });
  //       // Push new product into the cloned array
  //       newRow.unshift({ id: 1002, heading: "Gross Totals" });

  //       array.push(...newRow);
  //     } else if (Object.keys(row)[i] === "expenseData") {
  //       // Access the 'products' array dynamically
  //       const getRow = row[Object.keys(row)[i]]; // Dynamically fetches row.products

  //       // Clone 'products' array to make it extensible
  //       let newRow = [...getRow].map((modified) => {
  //         return {
  //           ...modified,
  //           id: modified._id,
  //         };
  //       });
  //       // Push new product into the cloned array
  //       newRow.unshift({ id: 1003, heading: "Total Expense" });

  //       array.push(...newRow);
  //     } else if (Object.keys(row)[i] === "recovery") {
  //       // Access the 'products' array dynamically
  //       const getRow = row[Object.keys(row)[i]]; // Dynamically fetches row.products

  //       // Clone 'products' array to make it extensible
  //       let newRow = [...getRow].map((modified) => {
  //         return {
  //           ...modified,
  //           id: modified._id,
  //         };
  //       });
  //       // Push new product into the cloned array
  //       newRow.unshift({ id: 1005, heading: "Recovery" });

  //       array.push(...newRow);
  //     }
  //   }
  //   console.log("check row item => ", Object.keys(row)[1]);
  // });

  // const iterateRows = array.map((item) => {
  //   return {
  //     ...item,
  //   };
  // });
  // console.log(...capitalizedRows)

  //Create handle one submit function
  const handleOnSubmit = (e) => {
    e.preventDefault();

    const { customerId, startDate, endDate } = state;

    if (customerId === "") {
      toast("Please Select the Customer", {
        position: "top-right",
        type: "error",
      });
    } else if (startDate === "" && endDate === "") {
      toast("Please select date first", {
        position: "top-right",
        type: "error",
      });
    } else {
      if (customerId !== "" && startDate !== "" && endDate !== "") {
        //If both dates are selected
        let newData = { customerId, startDate: startDate, endDate: endDate };
        //Hid Function
        disptach(getCustomerReports(newData));
      } else if (customerId !== "" && startDate !== "" && endDate === "") {
        //If start date is selected set endDate same to start date
        let newData = { customerId, startDate: startDate, endDate: startDate };
        //Hit API Call
        disptach(getCustomerReports(newData));
      } else if (customerId !== "" && startDate === "" && endDate !== "") {
        //If start date is selected set endDate same to start date
        let newData = { customerId, startDate: endDate, endDate: endDate };
        //Hit API Call
        disptach(getCustomerReports(newData));
      }
    }
  };

  const fuelProducts = ["petrol", "diesel"];

  // 1. Group by product name
  const grouped =
    reports[0]?.products?.reduce((acc, item) => {
      acc[item.productName] = acc[item.productName] || [];
      acc[item.productName].push(item);
      return acc;
    }, {}) || {};

  // 2. Separate fuel and other products
  const fuelGroup = {};
  const otherGroup = {};

  Object.entries(grouped)?.length > 0 &&
    Object.entries(grouped)?.forEach(([name, items]) => {
      if (fuelProducts.includes(name.toLowerCase())) {
        fuelGroup[name] = items;
      } else {
        otherGroup[name] = items;
      }
    });

  // 3. Helper to render table rows + group totals
  const renderGroup = (group) => {
    let groupTotalQty = 0;
    let groupTotalAmt = 0;
    let groupTestEntry = 0;
    let totalProfit = 0;

    const rows = Object.entries(group)?.flatMap(([productName, items]) =>
      items.map((item, index) => {
        groupTotalQty += item.quantity;
        groupTotalAmt += item.amount;
        groupTestEntry += item.testEntry;

        totalProfit += parseFloat(
          (parseFloat(item.sellingPrice) - parseFloat(item.costPrice)) *
            parseFloat(item.quantity)
        );

        return (
          <tr key={productName + index}>
            {index === 0 && (
              <td className="product-cell" rowSpan={items.length}>
                {productName}
              </td>
            )}
            <td>{item.quantity}</td>
            <td>{item.sellingPrice}</td>
            <td>{item.amount}</td>
            <td>
              {((item.sellingPrice - item.costPrice) * item.quantity).toFixed(
                2
              )}
            </td>
          </tr>
        );
      })
    );

    // Add total row for the group
    rows.push(
      <tr
        key={group === fuelGroup ? "fuel-total" : "other-total"}
        className="bold-row"
      >
        <td>Totals</td>
        <td>{groupTotalQty}</td>
        <td></td>
        <td>
          {groupTotalAmt?.toLocaleString("en-US", {
            style: "currency",
            currency: "PKR",
            minimumFractionDigits: 2,
            maximumFractionDigits: 2,
          }) || 0.0}
        </td>
        <td>
          {totalProfit?.toLocaleString("en-US", {
            style: "currency",
            currency: "PKR",
            minimumFractionDigits: 2,
            maximumFractionDigits: 2,
          }) || 0.0}
        </td>
      </tr>
    );

    return { rows, totalProfit, groupTotalAmt };
  };

  //Remaining stock
  const remainingStockAmount = () => {
    let stockAmount = 0;
    reports[0]?.endDateProductStocks.forEach(
      (item) => (stockAmount += item.amount)
    );

    return stockAmount;
  };

  return (
    <Box m="0px 20px 20px 20px">
      {/* Header for subscription page  */}
      <Header
        title="Customer Reports"
        subTitle="Generate Statement or Report"
        icon={<Receipt />}
      />
      {/* Here we calling Search component in which we 
        are passing Filters state and Input Values state  */}
      <Box sx={{ paddingLeft: 3, paddingRight: 3 }}>
        {customers.length > 0 && (
          <GridForm
            inputs={searchReportInput(printReport, customers)}
            state={state}
            setState={setState}
            submit={handleOnSubmit}
          />
        )}
      </Box>

      <div className="report-wrapper">
        <div className="report-card">
          <h1 className="main-title">Customer Statement</h1>

          <div style={{display: "flex", justifyContent: "space-around"}}>

          <h4>Customer Name: </h4>
          <h4>Current Credit: </h4>
          </div>

          <hr/>
          {/* Customer Transaction Summary */}
          <div className="section red" style={{marginTop: 30}}>
            <h2 className="section-title">Customer Credit </h2>

            {/* Credit Table */}
            <table className="styled-table">
              <thead>
                <tr>
                  <th>Product Name</th>
                  <th>Description</th>
                  <th>Date</th>
                  <th>Amount</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>Petrol</td>
                  <td>car ky liye</td>
                  <td>10/07/2025</td>
                  <td>2000</td>
                </tr>
                <tr>
                  <td>Diesel</td>
                  <td>bus ky liye</td>
                  <td>11/07/2025</td>
                  <td>5000</td>
                </tr>
                <tr>
                  <td>Diesel</td>
                  <td>bus ky liye</td>
                  <td>12/07/2025</td>
                  <td>10000</td>
                </tr>
                <tr className="bold-row">
                  <td colSpan={3}>Total Amount</td>
                  <td>17000</td>
                </tr>
              </tbody>
            </table>
          </div>
          <div className="section blue">
            <h2 className="section-title"> Advance - Debit</h2>
            {/* Debit & Advance Table */}
            <table className="styled-table full" style={{ marginTop: "20px" }}>
              <thead>
                <tr>
                  <th>Date</th>
                  <th>Debit</th>
                  <th>Date</th>
                  <th>Advance</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>09/07/2025</td>
                  <td>3000.00</td>
                  <td>09/07/2025</td>
                  <td>3000.00</td>
                </tr>
                <tr>
                  <td>10/07/2025</td>
                  <td>4000.00</td>
                  <td>10/07/2025</td>
                  <td>4000.00</td>
                </tr>
                <tr>
                  <td>11/07/2025</td>
                  <td>56000.00</td>
                  <td>11/07/2025</td>
                  <td>56000.00</td>
                </tr>
                <tr className="bold-row">
                  <td>Totals</td>
                  <td>63000.00</td>
                  <td>Totals</td>
                  <td>63000.00</td>
                </tr>
              </tbody>
            </table>
          </div>
          <div className="section green">
            <h2 className="section-title"> Summary</h2>
            {/* Summary */}
            <div className="summary-box">
              <table className="styled-table" style={{ maxWidth: "400px" }}>
                <tbody>
                  <tr>
                    <td>Credit</td>
                    <td>17000</td>
                  </tr>
                  <tr>
                    <td>Advance</td>
                    <td>63000</td>
                  </tr>
                  <tr>
                    <td>
                      <strong>Total Credit</strong>
                    </td>
                    <td>
                      <strong>80000</strong>
                    </td>
                  </tr>
                  <tr>
                    <td>Debit</td>
                    <td>63000</td>
                  </tr>
                  <tr className="bold-row green-text">
                    <td>Remaining</td>
                    <td>17000</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
      {/* Data Table of Subscription Plans */}
      {/* <DataTable columns={reportColumns} rows={array.length > 0 && iterateRows} footer={true} /> */}
    </Box>
  );
}
