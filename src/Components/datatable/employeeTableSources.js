import { Delete, Edit, Info } from "@mui/icons-material";
import { IconButton } from "@mui/material";
import { DOMAIN } from "../../backend/API";

// SAMPLE DATA FOR USERS
//Export Employee Columns
export const employeeColumns = (setOpenDeleteDialog, setDetailsDialog, setOpenFormDialog) => [
  // { field: "id", headerName: "ID", width: 70 },
  {
    field: "name",
    headerName: "Name",
    width: 210,
    renderCell: (params) => {
      return (
        <div className="cellWithImg">
          <img
            src={
              params.row.pic
                ? `${DOMAIN}/public/employees/images/${params.row.pic}`
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
  // { field: "email", headerName: "Email", width: 230 },
  {
    field: "salary", headerName: "Salary", width: 110, renderCell: (params) => {
      return (
        <div className={`cellWithStatus ${params.row.salary}`}>
          Rs. {params.row.salary}
        </div>
      );
    },
  },
  {
    field: "remainingAdvance", headerName: "Remaining Advance", width: 150, renderCell: (params) => {
      return (
        <div className={`cellWithStatus ${params.row.remainingAdvance}`}>
          Rs. {params.row.remainingAdvance}
        </div>
      );
    },
  },
  { field: "contact", headerName: "Contact", width: 140 },
  { field: "designation", headerName: "Designation", width: 130 },
  {
    field: "status",
    headerName: "Status",
    width: 90,
    renderCell: (params) => {
      return <div style={{ background: params.row.status === "Active" ? "#02bf2e" : "#777", color: "white", width: 65, textAlign: "center", borderRadius: 4 }}>
        {params.row.status}
      </div>
    },
  },
  {
    field: "action",
    headerName: "Action",
    width: 160,
    renderCell: (params) => {
      return (
        <div className="cellAction">
          <IconButton
            className="viewButton"
            onClick={() => {
              setOpenFormDialog(true)
            }}
          >
            <Edit style={{ fontSize: "20px" }} />
          </IconButton>

          <IconButton className="viewButton" onClick={() => setDetailsDialog(true)}>
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

