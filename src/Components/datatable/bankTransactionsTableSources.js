import { Link } from "react-router-dom";
import { AddCard, Delete, Edit, Info, Money, Paid, Style } from "@mui/icons-material";
import { IconButton, Chip } from "@mui/material";
import { DOMAIN } from "../../backend/API";

//Export Bank Transactions Columns
export const bankTransactionsColumns = (
  setOpenDeleteDialog,
  setDetailsDialog,
  setOpenFormDialog
) => [
  // { field: "id", headerName: "ID", width: 70 },
  {
    field: "name",
    headerName: "Name",
    width: 200,
    renderCell: (params) => {
      return (
        <div className="cellWithImg">
          <img
            src={
              params.row.pic
                ? `${DOMAIN}/public/customers/images/${params.row.pic}`
                : "./img/avatarfile.png"
            }
            alt=""
            className="cellImg"
          />
          {params.row.username}
        </div>
      );
    },
  },
  {
    field: "cash",
    headerName: "Total Cash",
    width: 150,
    renderCell: (params) => {
      return (
        <div className={`cellWithStatus `}>
          {params.row.totalCash?.toLocaleString("en-US", {
            style: "currency",
            currency: "PKR",
            minimumFractionDigits: 2,
            maximumFractionDigits: 2,
          })}
        </div>
      );
    },
  },
  { field: "description", headerName: "Description", width: 200 },
  { field: "depositAmount", headerName: "Deposit Amount", width: 150 },
  {
    field: "status",
    headerName: "Status",
    width: 100,
    renderCell: (params) => {
      return (
        <Chip
          label={
            <span style={{ display: "flex", alignItems: "center", gap: 5 }}>
              <span style={{ fontSize: 13, fontWeight: "bold" }}>
                {params.row.status}
              </span>
            </span>
          }
          style={{
            background:
              params.row.status.toLowerCase() === "pending"
                ? "#03a0f5"
                : "#999",
            color: "white",
          }}
        />
      );
    },
  },
  { field: "date", headerName: "Date", width: 150 },
  {
    field: "action",
    headerName: "Action",
    width: 100,
    renderCell: (params) => {
      return (
        <div className="cellAction">
          <IconButton
            className="viewButton"
            onClick={() => {
              setOpenFormDialog(true);

            }}
          >
            <AddCard style={{ fontSize: "20px" }} />
          </IconButton>
        </div>
      );
    },
  },
];

