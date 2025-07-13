import { DOMAIN } from "../../backend/API";

//Add new Employee Salary form fields
export const employeeSalaryInputFields = (selectedRowId, currentData, employees) => [
  {
    id: 1,
    label: "Employee",
    type: "select",
    name: "employeeId",
    options:
    employees.length > 0 &&
    employees.map((item) =>
        // Here we are setup the filter operator items
        {
          return { id: item._id, name: item.name, value: item._id, avatarUrl: `${DOMAIN}/public/employees/images/${item.pic}`, avatarAlt: "./img/avatarfile.png", designation: item.designation, salary: item.salary };
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
    label: "Advance Deduct",
    tabIndex: 1,
    type: "number",
    name: "advanceDeducted",
    grid: {
      xs: 12,
      sm: 6,
      md: 6,
      lg: 6,
    },
  },
  {
    id: 3,
    label: "Date",
    type: "date",
    name: "date",
    grid: {
      xs: 12,
      sm: 6,
      md: 6,
      lg: 6,
    },
  },
  {
    id: 4,
    label: "Month of Salary",
    type: "month",
    name: "salaryOfMonth",
    grid: {
      xs: 12,
      sm: 6,
      md: 6,
      lg: 6,
    },
  },
  {
    id: 5,
    label: "Status",
    type: "select",
    tabIndex: 5,
    disable: false,
    name: "status",
    size: "small",
    minWidth: "100wh",
    grid: {
      xs: 12,
      sm: 6,
      md: 6,
      lg: 6,  
    },
    options: [
      { id: 1, name: "Paid", value: "paid" },
      { id: 2, name: "Un Paid", value: "pending" },
    ],
  },
  {
    id: 6,
    label:
      selectedRowId !== null && Object.keys(currentData).length !== 0
        ? "Update Employee Salary"
        : "ADD Employee Salary",
    type: "button",
    tabIndex: 6,
    btntype: "submit",
    color: "primary",
    variant: "contained",
    grid: {
      xs: 12,
      sm: 12,
      md: 12,
      lg: 12,
    },
  },
];

//SEARCH Supplier Payment Filters
export const searchSupplierPaymentFilters = (filter) => {
  return [
    {
      id: 1,
      label: "Condition",
      type: "select",
      disable: filter.operator === "inBetween" ? true : false,
      name: "operator",
      size: "small",
      minWidth: "100wh",
      grid: {
        xs: 12,
        sm: 6,
        md: 4,
        lg: 4,
      },
      options: [
        // Here we are setup the filter operator items
        filter.field !== "date" && { id: 1, name: "Contains", value: "$regex" },
        // filter.field !== "date" && { id: 2, name: "Equals", value: "$eq" },
        filter.field === "date" && {
          id: 7,
          name: "In Between",
          value: "inBetween",
        },
      ],
    },
    {
      id: 2,
      label: "Select Column",
      type: "select",
      name: "field",
      size: "small",
      minWidth: "100wh",
      grid: {
        xs: 12,
        sm: 6,
        md: 4,
        lg: 4,
      },

      options: [
        { id: 1, name: "Name", value: "name" },
        { id: 2, name: "Date", value: "date" },
      ],
    },
    {
      id: 3,
      label: "Sorting",
      type: "select",
      name: "sort",
      size: "small",
      options: [
        // Here we are setup the filter operator items
        { id: 1, name: "Ascending", value: 1 },
        { id: 2, name: "Descending", value: -1 },
      ],
      grid: {
        xs: 12,
        sm: 6,
        md: 4,
        lg: 4,
      },
    },
  ];
};


