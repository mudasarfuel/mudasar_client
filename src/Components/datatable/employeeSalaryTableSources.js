import { Delete, Edit, Info } from "@mui/icons-material";
import { IconButton, Tooltip } from "@mui/material";
import { DOMAIN } from "../../backend/API";

//Export Employee Payment Columns
export const employeeSalaryColumns = (
  setOpenDeleteDialog,
  setDetailsDialog,
  setOpenFormDialog
) => [
  {
    field: "name",
    headerName: "Name",
    width: 300,
    renderCell: (params) => {
      return (
        <div className="cellWithImg">
          <img
            src={
              params.row.employee.pic
                ? `${DOMAIN}/public/employees/images/${params.row.employee.pic}`
                : "./img/avatarfile.png"
            }
            alt=""
            className="cellImg"
          />
          {params.row.name}
        </div>
      );
    },
  },
  {
    field: "netSalary",
    headerName: "Net Salary",
    width: 200,
    renderCell: (params) => {
      return (
        <div className="cellAction">
          {params.row.netSalary?.toLocaleString("en-US", {
            style: "currency",
            currency: "PKR",
            minimumFractionDigits: 2,
            maximumFractionDigits: 2,
          }) || 0}
        </div>
      );
    },
  },
  {
    field: "date",
    headerName: "Date",
    width: 150,
  },
  {
    field: "salaryOfMonth",
    headerName: "Month of",
    width: 130,
  },
  {
    field: "salaryOfYear",
    headerName: "Year",
    width: 120,
  },
  {
    field: "action",
    headerName: "Action",
    width: 150,
    renderCell: (params) => {
      return (
        <div className="cellAction">
          <Tooltip title="Delete Employee Salary">
            <IconButton
              className="viewButton"
              onClick={() => setOpenDeleteDialog(true)}
            >
              <Delete style={{ fontSize: "20px" }} />
            </IconButton>
          </Tooltip>
        </div>
      );
    },
  },
];
