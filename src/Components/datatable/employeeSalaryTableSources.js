import { Delete, Edit, Info } from "@mui/icons-material";
import { IconButton } from "@mui/material";
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
    width: 230,
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
    field: "advanceDeducted",
    headerName: "Advance Deducted",
    width: 150,
    renderCell: (params) => {
      return <div className="cellAction">Rs. {params.row.advanceDeducted}</div>;
    },
  },
  { field: "grossSalary", headerName: "Gross Salary", width: 150,  renderCell: (params) => {
    return <div className="cellAction">Rs. {params.row.grossSalary}</div>;
  }, },
  { field: "netSalary", headerName: "Net Salary", width: 150,  renderCell: (params) => {
    return <div className="cellAction">Rs. {params.row.netSalary}</div>;
  }, },
  {
    field: "salaryOfMonth",
    headerName: "Month of",
    width: 100,
  },
  {
    field: "salaryOfYear",
    headerName: "Year",
    width: 100,
  },
  {
    field: "action",
    headerName: "Action",
    width: 100,
    renderCell: (params) => {
      return (
        <div className="cellAction">
          {/* <IconButton
            className="viewButton"
            onClick={() => setDetailsDialog(true)}
          >
            <Info style={{ fontSize: "20px" }} />
          </IconButton> */}

          <IconButton
            className="viewButton"
            onClick={() => setOpenDeleteDialog(true)}
          >
            <Delete style={{ fontSize: "20px" }} />
          </IconButton>
        </div>
      );
    },
  },
];

