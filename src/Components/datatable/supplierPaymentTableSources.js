import { Delete, Edit, Info } from "@mui/icons-material";
import { IconButton } from "@mui/material";
import { DOMAIN } from "../../backend/API";

//Export Supplier Payment Columns
export const supplierPaymentColumns = (
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
              params.row.pic
                ? `${DOMAIN}/public/suppliers/images/${params.row.pic}`
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
    return <div className="cellAction">Rs. {params.row.amount}</div>;
  }, },
  { field: "remaining", headerName: "Remaining Amount", width: 150,  renderCell: (params) => {
    return <div className="cellAction">Rs. {params.row.remaining}</div>;
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

