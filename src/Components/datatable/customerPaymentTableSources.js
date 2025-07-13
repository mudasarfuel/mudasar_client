import { Link } from "react-router-dom";
import { Delete, Edit, Info, Style } from "@mui/icons-material";
import { IconButton, Chip } from "@mui/material";
import { DOMAIN } from "../../backend/API";

//Export Customer Payment Columns
export const customerPaymentColumns = (
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
              params.row.customer.pic
                ? `${DOMAIN}/public/customers/images/${params.row.customer.pic}`
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
    field: "prevAmount",
    headerName: "Previous Amount",
    width: 150,
    renderCell: (params) => {
      return <div className="cellAction">Rs. {params.row.prevAmount}</div>;
    },
  },
  { field: "amount", headerName: "Paid Amount", width: 150,  renderCell: (params) => {
    return <div className="cellAction">Rs. {params.row.payingAmount}</div>;
  }, },
  { field: "remaining", headerName: "Remaining Amount", width: 150,  renderCell: (params) => {
    return <div className="cellAction">Rs. {params.row.remAmount}</div>;
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

