import { Link } from "react-router-dom";
import { Delete, Edit, Info, Style } from "@mui/icons-material";
import { IconButton, Chip } from "@mui/material";
import { DOMAIN } from "../../backend/API";

//Export Customer Payment Columns
export const customerAdvanceColumns = (
  setOpenDeleteDialog,
  setDetailsDialog,
  setOpenFormDialog
) => [
  {
    field: "name",
    headerName: "Name",
    width: 250,
    renderCell: (params) => {
      return (
        <div className="cellWithImg">
          {params.row.customerName}
        </div>
      );
    },
  },
  {
    field: "description",
    headerName: "Description",
    width: 250,
    renderCell: (params) => {
      return <div className="cellAction">{params.row.description}</div>;
    },
  },
  { field: "amount", headerName: "Amount", width: 150,  renderCell: (params) => {
    return <div className="cellAction">Rs. {params.row.amount}</div>;
  }, },
  {
    field: "date",
    headerName: "Date",
    width: 150,
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
              setOpenFormDialog(true);
            }}
          >
            <Edit style={{ fontSize: "20px" }} />
          </IconButton>

          <IconButton
            className="viewButton"
            onClick={() => setDetailsDialog(true)}
          >
            <Info style={{ fontSize: "20px" }} />
          </IconButton>

          {params.row.status === "open" && <IconButton
            className="viewButton"
            onClick={() => setOpenDeleteDialog(true)}
          >
            <Delete style={{ fontSize: "20px" }} />
          </IconButton>}
        </div>
      );
    },
  },
];

