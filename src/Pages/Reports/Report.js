import { Box } from "@mui/material";
import React, { useState } from "react";

import Header from "../../Components/Header/Header";

import { Receipt } from "@mui/icons-material";
import GridForm from "../../Components/form/GridForm";
import Search from "../../Components/search/Search";
import { toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import { getPrintMonthlyReport, getReports } from "../../redux/reportSlice/reportSlice";
import { ENDPOINTS } from "../../backend/API";
import axios from "axios";
import "./style.scss";
//SEARCH USERS INPUTS
const searchReportInput = (printReport) => [
  {
    id: 1,
    label: "Start Date",
    type: "date",
    name: "startDate",
    grid: {
      xs: 12,
      sm: 4,
    },
  },
  {
    id: 2,
    label: "End Date",
    type: "date",
    name: "endDate",
    grid: {
      xs: 12,
      sm: 4,
    },
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
      sm: 2,
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
      sm: 2,
    },
  },
];

export default function Report() {
  //Initializing use dispatch
  const disptach = useDispatch();
  //Initializing reports
  const reports = useSelector((state) => state.reports.data);

  //State for hold values
  const [state, setState] = useState({
    startDate: "",
    endDate: "",
  });

  // Function for Capitalizing the data
  function capitalizeEachWord(sentence) {
    console.log(sentence);
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
  console.log("Check reports => ", reports);
  //Create handle one submit function
  const handleOnSubmit = (e) => {
    e.preventDefault();

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
        disptach(getReports(newData));
      } else if (startDate !== "" && endDate === "") {
        //If start date is selected set endDate same to start date
        let newData = { startDate: startDate, endDate: startDate };
        //Hit API Call
        disptach(getReports(newData));
      } else if (startDate === "" && endDate !== "") {
        //If start date is selected set endDate same to start date
        let newData = { startDate: endDate, endDate: endDate };
        //Hit API Call
        disptach(getReports(newData));
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
    reports[0]?.endDateProductStocks.forEach((item) => stockAmount += item.amount)
                
        
    return stockAmount;
                  
  }

  return (
    <Box m="0px 20px 20px 20px">
      {/* Header for subscription page  */}
      <Header
        title="Reports"
        subTitle="Generate Statement or Report"
        icon={<Receipt />}
      />
      {/* Here we calling Search component in which we 
        are passing Filters state and Input Values state  */}
      <Box sx={{ paddingLeft: 3, paddingRight: 3 }}>
        <GridForm
          inputs={searchReportInput(printReport)}
          state={state}
          setState={setState}
          submit={handleOnSubmit}
        />
      </Box>

      <div className="report-wrapper">
        <div className="report-card">
          <h1 className="main-title">Monthly Sales Report</h1>

          {/* Product Sales */}
          <div className="section">
            <h2 className="section-title">Product Sales</h2>
            <table className="styled-table">
              <thead>
                <tr>
                  <th className="product-header">Product Name</th>
                  <th>Quantity</th>
                  <th>Price</th>
                  <th>Amount</th>
                  <th>Profit</th>
                </tr>
              </thead>
              <tbody>
                {reports.length > 0 && renderGroup(fuelGroup).rows}

                {reports.length > 0 && renderGroup(otherGroup).rows}

                {/* 
                <tr className="bold-row">
                  <td>Totals</td>
                  <td>60</td>
                  <td></td>
                  <td>6700</td>
                  <td>469</td>
                </tr> */}

                {/* Gross Total */}
                <tr className="bold-row">
                  <td colSpan="3">Gross Total</td>
                  <td> {((
                      renderGroup(fuelGroup).groupTotalAmt +
                      renderGroup(otherGroup).groupTotalAmt
                    ))?.toLocaleString("en-US", {
                      style: "currency",
                      currency: "PKR",
                      minimumFractionDigits: 2,
                      maximumFractionDigits: 2,
                    }) || 0.0 }</td>
                  <td> {((
                      renderGroup(fuelGroup).totalProfit +
                      renderGroup(otherGroup).totalProfit
                    ))?.toLocaleString("en-US", {
                      style: "currency",
                      currency: "PKR",
                      minimumFractionDigits: 2,
                      maximumFractionDigits: 2,
                    }) || 0.0 }</td>
                </tr>
              </tbody>
            </table>
          </div>

          {/* Debit - Credit */}
          <div className="section blue">
            <h2 className="section-title">Debit - Credit</h2>
            <table className="styled-table full">
              <thead>
                <tr>
                  <th>Title</th>
                  <th>Amount</th>
                  <th>Title</th>
                  <th>Amount</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>Total Customer Debit</td>
                  <td>
                    {reports[0]?.totalCustomerDebit?.toLocaleString("en-US", {
                      style: "currency",
                      currency: "PKR",
                      minimumFractionDigits: 2,
                      maximumFractionDigits: 2,
                    }) || 0.0}
                  </td>
                  <td>Total Customer Credit</td>
                  <td>
                    {reports[0]?.totalCustomerCredit?.toLocaleString("en-US", {
                      style: "currency",
                      currency: "PKR",
                      minimumFractionDigits: 2,
                      maximumFractionDigits: 2,
                    }) || 0.0}
                  </td>
                </tr>
                <tr>
                  <td>Total Staff Debit</td>
                  <td>
                    {reports[0]?.totalEmployeeAdvanceReturn?.toLocaleString(
                      "en-US",
                      {
                        style: "currency",
                        currency: "PKR",
                        minimumFractionDigits: 2,
                        maximumFractionDigits: 2,
                      }
                    ) || 0.0}
                  </td>
                  <td>Total Staff Credit</td>
                  <td>
                    {reports[0]?.totalEmployeeAdvance?.toLocaleString("en-US", {
                      style: "currency",
                      currency: "PKR",
                      minimumFractionDigits: 2,
                      maximumFractionDigits: 2,
                    }) || 0.0}
                  </td>
                </tr>
                <tr>
                  <td></td>
                  <td></td>
                  <td>Total Customer Advance</td>
                  <td>
                    {reports[0]?.totalCustomerAdvance?.toLocaleString("en-US", {
                      style: "currency",
                      currency: "PKR",
                      minimumFractionDigits: 2,
                      maximumFractionDigits: 2,
                    }) || 0.0}
                  </td>
                </tr>
                <tr className="bold-row">
                  <td>Recovery</td>
                  <td>
                    {(
                      reports[0]?.totalEmployeeAdvanceReturn +
                      reports[0]?.totalCustomerDebit
                    )?.toLocaleString("en-US", {
                      style: "currency",
                      currency: "PKR",
                      minimumFractionDigits: 2,
                      maximumFractionDigits: 2,
                    }) || 0.0}
                  </td>
                  <td>Total Credit</td>
                  <td>
                    {(
                      reports[0]?.totalCustomerCredit +
                      reports[0]?.totalEmployeeAdvance +
                      reports[0]?.totalCustomerAdvance
                    )?.toLocaleString("en-US", {
                      style: "currency",
                      currency: "PKR",
                      minimumFractionDigits: 2,
                      maximumFractionDigits: 2,
                    }) || 0.0}
                  </td>
                </tr>
              </tbody>
            </table>
          </div>

          {/* Expense Section */}
          <div className="section red">
            <h2 className="section-title">Expense & Total Purchase</h2>
            <table className="styled-table">
              <thead>
                <tr>
                  <th>Title</th>
                  <th>Amount</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>Total Expense</td>
                  <td>
                    {reports[0]?.totalExpenses?.toLocaleString("en-US", {
                      style: "currency",
                      currency: "PKR",
                      minimumFractionDigits: 2,
                      maximumFractionDigits: 2,
                    }) || 0.0}
                  </td>
                </tr>
                <tr>
                  <td>Supplier Payments</td>
                  <td>
                    {reports[0]?.totalSupplierPaymentAmount?.toLocaleString(
                      "en-US",
                      {
                        style: "currency",
                        currency: "PKR",
                        minimumFractionDigits: 2,
                        maximumFractionDigits: 2,
                      }
                    ) || 0.0}
                  </td>
                </tr>
                <tr className="bold-row">
                  <td>Total</td>
                  <td>
                    {(
                      reports[0]?.totalSupplierPaymentAmount +
                      reports[0]?.totalExpenses
                    ).toLocaleString("en-US", {
                      style: "currency",
                      currency: "PKR",
                      minimumFractionDigits: 2,
                      maximumFractionDigits: 2,
                    }) || 0.0}
                  </td>
                </tr>
              </tbody>
            </table>
          </div>

          {/* Expense Section */}
          <div className="section green">
            <h2 className="section-title">Stock</h2>
            <table className="styled-table">
              <thead>
                <tr>
                  <th>Product</th>
                  <th>Current Stock</th>
                  <th>Amount</th>
                </tr>
              </thead>
              <tbody>
                {
                reports[0]?.endDateProductStocks.map((item) => {
                  return (
                    <tr key={item.productId}>
                      <td>{item.productName}</td>
                      <td>{item.newStock || 0.0}</td>
                      <td>
                        {item.amount}
                      </td>
                    </tr>
                  );
                })}

                <tr className="bold-row">
                  <td colSpan={2}>Total</td>
                  <td>
                    {remainingStockAmount()?.toLocaleString("en-US", {
                          style: "currency",
                          currency: "PKR",
                          minimumFractionDigits: 2,
                          maximumFractionDigits: 2,
                        }) || 0.0}
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
          {/* Summary */}
          <div className="section green">
            <h2 className="section-title">Summary</h2>
            <table className="styled-table">
              <thead>
                <tr>
                  <th>Title</th>
                  <th>Quantity</th>
                  <th>Amount</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td colSpan={2}>Gross Sale Profit</td>
                  <td>
                    {(
                      renderGroup(fuelGroup).totalProfit +
                      renderGroup(otherGroup).totalProfit
                    ).toFixed(2) || 0.0}
                  </td>
                </tr>
                <tr>
                  <td colSpan={2}>Profit Price Change</td>
                  <td>{reports[0]?.priceChangeProfit.toFixed(2) || 0}</td>
                </tr>
                <tr>
                  <td>Petrol Gain</td>
                  <td>{reports[0]?.petrolGain?.gain.toFixed(2) || 0}</td>
                  <td>{reports[0]?.petrolGain?.amount.toFixed(2)  || 0}</td>
                </tr>
                <tr>
                  <td>Diesel Gain Change</td>
                  <td>{reports[0]?.dieselGain?.gain.toFixed(2) || 0}</td>
                  <td>{reports[0]?.dieselGain?.amount.toFixed(2) || 0}</td>
                </tr>
                 <tr>
                  <td colSpan={2}>Expense</td>
                  <td>{reports[0]?.totalExpenses.toFixed(2) || 0}</td>
                </tr>
                <tr className="bold-row">
                  <td colSpan={2}>Gross Total Profit</td>
                  <td>{((renderGroup(fuelGroup).totalProfit +
                      renderGroup(otherGroup).totalProfit + reports[0]?.priceChangeProfit + reports[0]?.dieselGain?.amount + reports[0]?.petrolGain?.amount)- reports[0]?.totalExpenses)?.toLocaleString("en-US", {
                      style: "currency",
                      currency: "PKR",
                      minimumFractionDigits: 2,
                      maximumFractionDigits: 2,
                    })  || 0}</td>
                </tr>
                <tr>
                  <td colSpan={2}>Zakat (2.5%)</td>
                  <td>{(((renderGroup(fuelGroup).totalProfit +
                      renderGroup(otherGroup).totalProfit + reports[0]?.priceChangeProfit + reports[0]?.dieselGain?.amount + reports[0]?.petrolGain?.amount)- reports[0]?.totalExpenses)/100 *2.5).toFixed(2) || 0}</td>
                </tr>
               
                <tr className="bold-row green-text">
                  <td colSpan={2}>Net Profit</td>
                  <td>{((((renderGroup(fuelGroup).totalProfit +
                      renderGroup(otherGroup).totalProfit + reports[0]?.priceChangeProfit + reports[0]?.dieselGain?.amount + reports[0]?.petrolGain?.amount)- reports[0]?.totalExpenses) - (((renderGroup(fuelGroup).totalProfit +
                      renderGroup(otherGroup).totalProfit + reports[0]?.priceChangeProfit + reports[0]?.dieselGain?.amount + reports[0]?.petrolGain?.amount)- reports[0]?.totalExpenses)/100 *2.5)))?.toLocaleString("en-US", {
                      style: "currency",
                      currency: "PKR",
                      minimumFractionDigits: 2,
                      maximumFractionDigits: 2,
                    })  || 0}</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* Data Table of Subscription Plans */}
      {/* <DataTable columns={reportColumns} rows={array.length > 0 && iterateRows} footer={true} /> */}
    </Box>
  );
}
