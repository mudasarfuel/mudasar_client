//Add new Employee Salary form fields
export const employeeAdvanceInputFields = (selectedRowId, currentData, employees) => [
  {
    id: 1,
    label: "Employee ",
    type: "select",
    name: "employeeId",
    options:
    employees.length > 0 &&
    employees.map((item) =>
        // Here we are setup the filter operator items
        {
          return { id: item._id, name: item.name, value: item._id, avatarUrl: `http://localhost:5000/public/employees/images/${item.pic}`, avatarAlt: "./img/avatarfile.png" };
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
    label: "Amount",
    type: "number",
    name: "amount",
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
    id: 6,
    label:
      selectedRowId !== null && Object.keys(currentData).length !== 0
        ? "Update Employee Advance"
        : "ADD Employee Advance",
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




