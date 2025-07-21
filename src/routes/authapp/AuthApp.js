import React, { useContext, useState } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Navbar from "../../Components/navbar/Navbar";
import Sidebar from "../../Components/sidebar/Sidebar";
import Dashboard from "../../Pages/Home/Dashboard";
import "./authapp.scss";
import "../../style/dark.scss";
import Subscription from "../../Pages/Admin/Subscription/Subscription";
import Features from "../../Pages/Admin/Subscription/Features";
import NewFeature from "../../Pages/Admin/Subscription/NewFeature";
import Packages from "../../Pages/Admin/Subscription/Packages/Packages";
import NewPackage from "../../Pages/Admin/Subscription/Packages/NewPackage";
import Alert from "../../Components/alert/Alert";
import Tenants from "../../Pages/Admin/Accounts/Tenants/Tenants";
import NewTenant from "../../Pages/Admin/Accounts/Tenants/NewTenant";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Users from "../../Pages/Users/Users";
import Customer from "../../Pages/Customer/Customer";
import Supplier from "../../Pages/Supplier/Supplier";
import Employee from "../../Pages/Employee/Employee";
import Machine from "../../Pages/Machines/Machines";
import Stock from "../../Pages/Stock/Stock";
import Products from "../../Pages/Products/Products";
import Prices from "../../Pages/Prices/Prices";
import TotalSale from "../../Pages/Customer/TotalSale";
import Purchase from "../../Pages/Purchase/Purchase";
import Readings from "../../Pages/Readings/Readings";
import CustomerPayment from "../../Pages/Customer/CustomerPayment";
import CustomerAdvance from "../../Pages/Customer/CustomerAdvance";
import SupplierPayment from "../../Pages/Supplier/SupplierPayment";
import EmployeeSalary from "../../Pages/Employee/EmployeeSalary";
import EmployeeAdvance from "../../Pages/Employee/EmployeeAdvance";
import Expense from "../../Pages/Expense/Expenses";
import StockWastage from "../../Pages/Stock/StockWastage";
import StockDip from "../../Pages/Stock/StockDip";
import Report from "../../Pages/Reports/Report";
import AuthContext from "../../context/auth/AuthContext";
import TotalSaleClosings from "../../Pages/DataEntry/TotalSaleClosings";
import AddShift from "../../Pages/DataEntry/AddShift";
import DailyCash from "../../Pages/Finance/DailyCash";
import BankTransaction from "../../Pages/Finance/BankTransaction";
import EmployeePayment from "../../Pages/Employee/EmployeePayment";
import CustomerReport from "../../Pages/Reports/CustomerReport";

const AuthApp = ({ mode }) => {
  
  //Handle use state to control side bar
  const [openSidebar, setOpenSidebar] = useState(false)
  //Call Auth Context & Extract Logout
  const { logout, user } = useContext(AuthContext);
  return (
    <div className={mode === "dark" ? "authApp dark" : "authApp"}>
      <BrowserRouter>
       
        <Navbar setOpenSidebar={setOpenSidebar} openSidebar={openSidebar} className="authNavbar" user={user} logout={logout} />
        <ToastContainer theme="colored" closeButton={false} />
        <Alert />
        <div className="main">
          <Sidebar className="authSidebar" openSidebar={openSidebar}/>
          <div className="appContainer">
            <Routes>
              <Route exact path="/" element={<Dashboard />} />
              {/**************** SAIMON TECHNOLOGIES ADMIN PANEL ROUTES ********************/}
              <Route exact path="/subscriptions" element={<Subscription />} />
              <Route exact path="/packages" element={<Packages />} />
              <Route exact path="/packages/new" element={<NewPackage />} />
              <Route
                exact
                path="/packages/update/:id"
                element={<NewPackage />}
              />
              <Route exact path="/features" element={<Features />} />
              <Route exact path="/features/new" element={<NewFeature />} />
              {/* CUSTOMER ROUTES  */}
              <Route exact path="/customers" element={<Customer />} />
              <Route exact path="/customerpayments" element={<CustomerPayment />} />
              <Route exact path="/customeradvances" element={<CustomerAdvance />} />
              {/* SUPPLIER ROUTES  */}
              <Route exact path="/suppliers" element={<Supplier />} />
              <Route exact path="/supplierpayments" element={<SupplierPayment />} />
              {/* EMPLOYEE ROUTES  */}
              <Route exact path="/employees" element={<Employee />} />
              <Route exact path="/employeesalary" element={<EmployeeSalary />} />
              <Route exact path="/employeepayment" element={<EmployeePayment />} />
              <Route exact path="/employeeadvances" element={<EmployeeAdvance />} />
              {/* MACHINE ROUTES  */}
              <Route exact path="/machines" element={<Machine />} />
              {/* MACHINE READINGS ROUTES  */}
              <Route exact path="/readings" element={<Readings />} />
              {/* PRODUCTS ROUTES  */}
              <Route exact path="/products" element={<Products />} />
              {/* PRICES ROUTES  */}
              <Route exact path="/prices" element={<Prices />} />
              {/* SALES ROUTES  */}
              <Route exact path="/sales" element={<TotalSale />} />
              {/* PURCHASE ROUTES  */}
              <Route exact path="/purchases" element={<Purchase />} />
              {/* REPORT GENERATIONS ROUTE  */}
              <Route exact path="/reports" element={<Report />} />
              <Route exact path="/customerreports" element={<CustomerReport />} />
              {/* STOCKS ROUTES  */}
              <Route exact path="/stocks" element={<Stock />} />
              <Route exact path="/wastages" element={<StockWastage />} />
              <Route exact path="/dips" element={<StockDip />} />
              {/* REPORTS ROUTES  */}
              <Route exact path="/expenses" element={<Expense />} />
              {/* TENANTS ROUTES  */}
              <Route exact path="/tenants" element={<Tenants />} />
              <Route exact path="/tenants/new" element={<NewTenant />} />
              <Route exact path="/tenants/update/:id" element={<NewTenant />} />
              {/* USERS ROUTES  */}
              <Route exact path="/users" element={<Users />} />
              <Route exact path="/addShift" element={<AddShift />} />
              <Route exact path="/allclosings" element={<TotalSaleClosings />} />

              {/* FINANCE ROUTES  */}
              <Route exact path="/dailyCash" element={<DailyCash />} />
              <Route exact path="/bankTransaction" element={<BankTransaction/>} />
            </Routes>
          </div>
        </div>

      </BrowserRouter>
    </div>
  );
};

export default AuthApp;
