import React, { useContext } from "react";
import {
  DashboardCustomize,
  Group,
  Payment,
  Person,
  ShoppingCart,
  LocalShipping,
  Store,
  BarChart,
  Warehouse,
  ShoppingBagOutlined,
  AccountBalance,
  Settings,
  PowerSettingsNew,
  AccountCircle,
  BadgeSharp,
  //   ManageAccounts,
  AdminPanelSettings,
  AccountBalanceWallet,
  People,
  Business,
  Security,
  SwitchAccount,
  Subscriptions,
  CardMembership,
  LocalOffer,
  Tune,
  AttachMoney,
  AssignmentInd,
  LocalAtm,
  Speed,
  TrendingUp,
  Opacity,
  Assessment,
  FormatColorReset,
  HourglassBottom,
  Receipt,
  LocalGasStation,
  Widgets,
  PriceChange,
  AssessmentOutlined,
  Visibility,
  CurrencyRupee,
} from "@mui/icons-material";
import AuthContext from "../../context/auth/AuthContext";
import { useNavigate } from "react-router-dom";

export const useLocalHook = () => {
  //Initialize useNavigate hook to redirect home screen
  const navigate = useNavigate();

  //Call Auth Context & Extract Logout
  const { logout, user } = useContext(AuthContext);

  //Creating logout Function
  const LogoutFunc = () => {
    logout();
    //Redirect to home screen
    navigate("/");
  };
  //Web Admin
  const WebAdminPanel = [
    //Dashboard list Item
    {
      id: 0,
      label: "Dashboard",
      icon: <DashboardCustomize className="icon" />,
      url: "/",
      category: "MAIN",
    },

    // {
    //   id: 1,
    //   label: "Accounts",
    //   icon: <Group className="icon" />,
    //   setList: "TOGGLE_CUSTOMER",
    //   nested: [
    //     {
    //       itemId: 1,
    //       label: "Tenants",
    //       icon: <Business className="icon" />,
    //       url: "/tenants",
    //     },
    //     {
    //       itemId: 2,
    //       label: "Users",
    //       icon: <People className="icon" />,
    //       url: "/admin/users",
    //     },
    //     {
    //       itemId: 3,
    //       label: "Permissions",
    //       icon: <Security className="icon" />,
    //       url: "/tenats/order",
    //     },
    //     {
    //       itemId: 4,
    //       label: "Roles",
    //       icon: <SwitchAccount className="icon" />,
    //       url: "/roles",
    //     },
    //     {
    //       itemId: 5,
    //       label: "Payment",
    //       icon: <Payment className="icon" />,
    //       url: "/tenants/payment",
    //     },
    //   ],
    // },
    {
      id: 1,
      label: "Customer",
      icon: <SwitchAccount className="icon" />,
      setList: "TOGGLE_CUSTOMER",
      category: "ACCOUNTS",
      nested: [
        {
          itemId: 14,
          label: "Customers",
          icon: <SwitchAccount className="icon" />,
          url: "/customers",
        },
        {
          itemId: 15,
          label: "Customer Balance",
          icon: <AttachMoney className="icon" />,
          url: "/customerpayments",
        },
         {
          itemId: 16,
          label: "Customer Advance",
          icon: <LocalAtm className="icon" />,
          url: "/customeradvances",
        },
        {
          id: 17,
          label: "Customer Purchase",
          icon: <Assessment className="icon" />,
          url: "/sales",
        },
      ],
    },
    {
      id: 2,
      label: "Supplier",
      icon: <People className="icon" />,
      setList: "TOGGLE_CUSTOMER",
      nested: [
        {
          itemId: 18,
          label: "Suppliers",
          icon: <People className="icon" />,
          url: "/suppliers",
        },
        {
          itemId: 19,
          label: "Suppliers Balance",
          icon: <Payment className="icon" />,
          url: "/supplierpayments",
        },
      ],
    },
    {
      id: 3,
      label: "Employee",
      icon: <SwitchAccount className="icon" />,
      setList: "TOGGLE_CUSTOMER",
      nested: [
        {
          itemId: 20,
          label: "Employee",
          icon: <AssignmentInd className="icon" />,
          url: "/employees",
        },
        {
          itemId: 21,
          label: "Employee Salary",
          icon: <LocalAtm className="icon" />,
          url: "/employeesalary",
        },
        {
          itemId: 22,
          label: "Employee Advances",
          icon: <Payment className="icon" />,
          url: "/employeeadvances",
        },
      ],
    },
    (user.access === "web_admin" || user.access === "app_admin") && 
   
    {
      id: 6,
      label: "Shift Closing",
      icon: <Speed className="icon" />,
      category: "DATA ENTRY",
      url: "/addShift",
    },
     {
          itemId: 7,
          label: "View Closings",
          icon: <Visibility className="icon" />,
          url: "/allclosings",
        },
    // //Settings List Item
    {
      id: 9,
      label: "Settings",
      icon: <Settings className="icon" />,
      category: "SYSTEM",
      setList: "TOGGLE_SETTINGS",
      nested: [
        {
          itemId: 25,
          label: "Machines",
          icon: <LocalGasStation className="icon" />,
          url: "/machines",
        },
        {
          itemId: 26,
          label: "Readings",
          icon: <Speed className="icon" />,
          url: "/readings",
        },
        {
          itemId: 27,
          label: "Products",
          icon: <Widgets className="icon" />,
          url: "/products",
        },
        {
          itemId: 28,
          label: "Price Management",
          icon: <PriceChange className="icon" />,
          url: "/prices",
        },
        {
          itemId: 29,
          label: "Users",
          icon: <People className="icon" />,
          url: "/admin/users",
        },
        // {
        //   itemId: 3,
        //   label: "Permissions",
        //   icon: <Security className="icon" />,
        //   url: "/tenats/order",
        // },
        // {
        //   itemId: 4,
        //   label: "Roles",
        //   icon: <SwitchAccount className="icon" />,
        //   url: "/roles",
        // },
      ],
    },
    {
      id: 10,
      label: "Reports",
      icon: <Receipt className="icon" />,
      setList: "TOGGLE_STOCK",
      nested: [
        {
          itemId: 30,
          label: "Get Report",
          icon: <Receipt className="icon" />,
          url: "/reports",
        },
        {
          itemId: 31,
          label: "Expenses",
          icon: <Assessment className="icon" />,
          url: "/expenses",
        },
        // {
        //   itemId: 3,
        //   label: "Stock Wastage",
        //   icon: <FormatColorReset className="icon" />,
        //   url: "/features",
        // },
        // {
        //   itemId: 4,
        //   label: "Stock Testing",
        //   icon: <HourglassBottom className="icon" />,
        //   url: "/features",
        // },
      ],
    },
    {
      id: 11,
      label: "Stock Management",
      icon: <Opacity className="icon" />,
      setList: "TOGGLE_STOCK",
      nested: [
        {
          itemId: 32,
          label: "Stock List",
          icon: <Opacity className="icon" />,
          url: "/stocks",
        },
        {
          itemId: 33,
          label: "Purchase Stock",
          icon: <Store className="icon" />,
          url: "/purchases",
        },
        {
          itemId: 34,
          label: "Dip Records",
          icon: <Assessment className="icon" />,
          url: "/dips",
        },
        {
          itemId: 35,
          label: "Stock Wastage",
          icon: <FormatColorReset className="icon" />,
          url: "/wastages",
        },
        // {
        //   itemId: 5,
        //   label: "Stock Testing",
        //   icon: <HourglassBottom className="icon" />,
        //   url: "/features",
        // },
      ],
    },
    {
      id: 12,
      label: "Daily Cash",
      icon: <CurrencyRupee className="icon" />,
      category: "FINANCE",
      url: "/dailyCash",
    },
     {
          itemId: 7,
          label: "Bank Transaction",
          icon: <AccountBalance className="icon" />,
          url: "/bankTransaction",
        },
     
    // //User List Item
    {
      id: 13,
      label: "Profile",
      icon: <AccountCircle className="icon" />,
      url: "/sales",
      category: "USER",
    },
    //Logout List Item
    {
      id: 14,
      label: "Logout",
      icon: <PowerSettingsNew className="icon" />,
      clickFunc: LogoutFunc,
    },
  ];

  const AdminPanel = [
    //Dashboard list Item
    {
      id: 0,
      label: "Dashboard",
      icon: <DashboardCustomize className="icon" />,
      url: "/",
      category: "MAIN",
    },

    // {
    //   id: 1,
    //   label: "Accounts",
    //   icon: <Group className="icon" />,
    //   setList: "TOGGLE_CUSTOMER",
    //   nested: [
    //     {
    //       itemId: 1,
    //       label: "Tenants",
    //       icon: <Business className="icon" />,
    //       url: "/tenants",
    //     },
    //     {
    //       itemId: 2,
    //       label: "Users",
    //       icon: <People className="icon" />,
    //       url: "/admin/users",
    //     },
    //     {
    //       itemId: 3,
    //       label: "Permissions",
    //       icon: <Security className="icon" />,
    //       url: "/tenats/order",
    //     },
    //     {
    //       itemId: 4,
    //       label: "Roles",
    //       icon: <SwitchAccount className="icon" />,
    //       url: "/roles",
    //     },
    //     {
    //       itemId: 5,
    //       label: "Payment",
    //       icon: <Payment className="icon" />,
    //       url: "/tenants/payment",
    //     },
    //   ],
    // },
    {
      id: 1,
      label: "Customer",
      icon: <SwitchAccount className="icon" />,
      setList: "TOGGLE_CUSTOMER",
      category: "ACCOUNTS",
      nested: [
        {
          itemId: 1,
          label: "Customers",
          icon: <SwitchAccount className="icon" />,
          url: "/customers",
        },
        {
          itemId: 2,
          label: "Customer Balance",
          icon: <AttachMoney className="icon" />,
          url: "/customerpayments",
        },
      ],
    },
    {
      id: 2,
      label: "Supplier",
      icon: <People className="icon" />,
      setList: "TOGGLE_CUSTOMER",
      nested: [
        {
          itemId: 1,
          label: "Suppliers",
          icon: <People className="icon" />,
          url: "/suppliers",
        },
        {
          itemId: 2,
          label: "Suppliers Balance",
          icon: <Payment className="icon" />,
          url: "/supplierpayments",
        },
      ],
    },
    {
      id: 3,
      label: "Employee",
      icon: <SwitchAccount className="icon" />,
      setList: "TOGGLE_CUSTOMER",
      nested: [
        {
          itemId: 1,
          label: "Employee",
          icon: <AssignmentInd className="icon" />,
          url: "/employees",
        },
        {
          itemId: 2,
          label: "Employee Salary",
          icon: <LocalAtm className="icon" />,
          url: "/employeesalary",
        },
        {
          itemId: 3,
          label: "Employee Advances",
          icon: <Payment className="icon" />,
          url: "/employeeadvances",
        },
      ],
    },
    // //Bank Accounts List Item
    // {
    //   id: 3,
    //   label: "Subscription",
    //   icon: <CardMembership className="icon" />,
    //   setList: "TOGGLE_BANK",
    //   category: "DATA ENTRY",
    //   nested: [
    //     {
    //       itemId: 1,
    //       label: "Subscriptions",
    //       icon: <Subscriptions className="icon" />,
    //       url: "/subscriptions",
    //     },
    //     {
    //       itemId: 2,
    //       label: "Packages",
    //       icon: <LocalOffer className="icon" />,
    //       url: "/packages",
    //     },
    //     {
    //       itemId: 3,
    //       label: "Features",
    //       icon: <Tune className="icon" />,
    //       url: "/features",
    //     },
    //   ],
    // },
    {
      id: 4,
      label: "Meter Reading",
      icon: <Speed className="icon" />,
      category: "DATA ENTRY",
      url: "/meters",
    },
    {
      id: 5,
      label: "POS",
      icon: <TrendingUp className="icon" />,
      url: "/pos",
    },
    {
      id: 6,
      label: "Sales",
      icon: <Assessment className="icon" />,
      url: "/sales",
    },

    // //Settings List Item
    {
      id: 7,
      label: "Settings",
      icon: <Settings className="icon" />,
      category: "SYSTEM",
      setList: "TOGGLE_SETTINGS",
      nested: [
        {
          itemId: 1,
          label: "Machines",
          icon: <LocalGasStation className="icon" />,
          url: "/machines",
        },
        {
          itemId: 2,
          label: "Readings",
          icon: <Speed className="icon" />,
          url: "/readings",
        },
        {
          itemId: 3,
          label: "Products",
          icon: <Widgets className="icon" />,
          url: "/products",
        },
        {
          itemId: 4,
          label: "Price Management",
          icon: <PriceChange className="icon" />,
          url: "/prices",
        },
        {
          itemId: 5,
          label: "Users",
          icon: <People className="icon" />,
          url: "/admin/users",
        },
        // {
        //   itemId: 3,
        //   label: "Permissions",
        //   icon: <Security className="icon" />,
        //   url: "/tenats/order",
        // },
        // {
        //   itemId: 4,
        //   label: "Roles",
        //   icon: <SwitchAccount className="icon" />,
        //   url: "/roles",
        // },
      ],
    },
    {
      id: 8,
      label: "Reports",
      icon: <Receipt className="icon" />,
      setList: "TOGGLE_STOCK",
      nested: [
        {
          itemId: 1,
          label: "Get Report",
          icon: <Receipt className="icon" />,
          url: "/reports",
        },
        {
          itemId: 2,
          label: "Expenses",
          icon: <Assessment className="icon" />,
          url: "/expenses",
        },
        // {
        //   itemId: 3,
        //   label: "Stock Wastage",
        //   icon: <FormatColorReset className="icon" />,
        //   url: "/features",
        // },
        // {
        //   itemId: 4,
        //   label: "Stock Testing",
        //   icon: <HourglassBottom className="icon" />,
        //   url: "/features",
        // },
      ],
    },
    {
      id: 9,
      label: "Stock Management",
      icon: <Opacity className="icon" />,
      setList: "TOGGLE_STOCK",
      nested: [
        {
          itemId: 1,
          label: "Stock List",
          icon: <Opacity className="icon" />,
          url: "/stocks",
        },
        {
          itemId: 2,
          label: "Purchase Stock",
          icon: <Store className="icon" />,
          url: "/purchases",
        },
        {
          itemId: 3,
          label: "Dip Records",
          icon: <Assessment className="icon" />,
          url: "/dips",
        },
        {
          itemId: 4,
          label: "Stock Wastage",
          icon: <FormatColorReset className="icon" />,
          url: "/wastages",
        },
        {
          itemId: 5,
          label: "Stock Testing",
          icon: <HourglassBottom className="icon" />,
          url: "/features",
        },
      ],
    },
    // //User List Item
    {
      id: 10,
      label: "Profile",
      icon: <AccountCircle className="icon" />,
      url: "/sales",
      category: "USER",
    },
    //Logout List Item
    {
      id: 11,
      label: "Logout",
      icon: <PowerSettingsNew className="icon" />,
      clickFunc: LogoutFunc,
    },
  ];

  const CashierPanel = [
    //Dashboard list Item
    {
      id: 0,
      label: "Dashboard",
      icon: <DashboardCustomize className="icon" />,
      url: "/",
      category: "MAIN",
    },
    {
      id: 1,
      label: "Customer",
      icon: <SwitchAccount className="icon" />,
      setList: "TOGGLE_CUSTOMER",
      category: "ACCOUNTS",
      nested: [
        {
          itemId: 1,
          label: "Customers",
          icon: <SwitchAccount className="icon" />,
          url: "/customers",
        },
        {
          itemId: 2,
          label: "Customer Balance",
          icon: <AttachMoney className="icon" />,
          url: "/customerpayments",
        },
      ],
    },
    {
      id: 2,
      label: "Sale Closing",
      icon: <Speed className="icon" />,
      category: "DATA ENTRY",
      url: "/closing",
    },
    {
      id: 3,
      label: "POS",
      icon: <TrendingUp className="icon" />,
      url: "/pos",
    },
    {
      itemId: 13,
      label: "Expenses",
      icon: <Assessment className="icon" />,
      url: "/expenses",
    },
    // {
    //   id: 6,
    //   label: "Sales",
    //   icon: <Assessment className="icon" />,
    //   url: "/sales"
    // },
    //Logout List Item
    {
      id: 11,
      label: "Logout",
      icon: <PowerSettingsNew className="icon" />,
      clickFunc: LogoutFunc,
    },
  ];

  //Array for User Display Sidebar Items
  // const listItems =
  //   (user.access === "web_admin" && WebAdminPanel) ||
  //   (user.access === "admin" && AdminPanel) ||
  //   (user.access === "cashier" && CashierPanel);


const listItems = (
  (user.access === "web_admin" && WebAdminPanel) ||
  (user.access === "admin" && AdminPanel) ||
  (user.access === "cashier" && CashierPanel) ||
  []
).filter(Boolean);

  return { listItems };
};