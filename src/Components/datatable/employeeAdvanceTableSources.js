import { Delete, Info } from "@mui/icons-material";
import { IconButton } from "@mui/material";
import { DOMAIN } from "../../backend/API";

//Export Employee Payment Columns
export const employeeAdvanceColumns = (
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
    headerName: "Total Adv Amount ",
    width: 150,
    renderCell: (params) => {
      return <div className="cellAction">Rs. {params.row.amount}</div>;
    },
  },
  { field: "totAdvanceReturned", headerName: "Returned Advance", width: 150,  renderCell: (params) => {
    return <div className="cellAction">Rs. {params.row.totAdvanceReturned}</div>;
  }, },
  { field: "remainingAdvance", headerName: "Rem: Advance", width: 150,  renderCell: (params) => {
    return <div className="cellAction">Rs. {params.row.remainingAdvance}</div>;
  }, },
  { field: "grossSal", headerName: "Date", width: 110,  renderCell: (params) => {
    return <div className="cellAction">{params.row.date}</div>;
  }, },
  { field: "status", headerName: "Status", width: 100,  renderCell: (params) => {
    return (
      <div style={{ background: params.row.status === "pending" ? "#ff0000" : "#06c90a", color: "white", width: 60, textAlign: "center", borderRadius: 4}}>
        {params.row.status}
        </div>
    )
  }, },
  
  {
    field: "action",
    headerName: "Action",
    width: 100,
    renderCell: (params) => {
      return (
        <div className="cellAction">
          <IconButton
            className="viewButton"
            onClick={() => setDetailsDialog(true)}
          >
            <Info style={{ fontSize: "20px" }} />
          </IconButton>

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

