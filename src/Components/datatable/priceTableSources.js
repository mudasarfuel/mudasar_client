import { Delete, Edit, Info } from "@mui/icons-material";
import { IconButton, Tooltip } from "@mui/material";
import { DOMAIN } from "../../backend/API";

//Export Price Columns
export const priceColumns = (
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
              params.row.product.pic
                ? `${DOMAIN}/public/products/images/${params.row.product.pic}`
                : "./img/avatarfile.png"
            }
            alt=""
            className="cellImg"
          />
          {params.row.product.name}
        </div>
      );
    },
  },
  {
    field: "costPrice",
    headerName: "Cost Price",
    width: 120,
    renderCell: (params) => {
      return (
        <div>
          {params.row.costPrice?.toLocaleString("en-US", {
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
    field: "oldSellingPrice",
    headerName: "Old Selling Price",
    width: 140,
    renderCell: (params) => {
      return (
        <div>
          {params.row.oldSellingPrice?.toLocaleString("en-US", {
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
    field: "newSellingPrice",
    headerName: "Selling Price",
    width: 120,
    renderCell: (params) => {
      return (
        <div>
          {params.row.newSellingPrice?.toLocaleString("en-US", {
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
    field: "differenceValue",
    headerName: "Difference Amount",
    width: 170,
    renderCell: (params) => {
      return (
        <div>
          {params.row.differenceValue?.toLocaleString("en-US", {
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
    width: 120,
   renderCell: (params) => {
      return (
        <div className="cellAction">
          {params.row.date?.split("T")[0] || 0}
        </div>
      );
    },
  },
  {
    field: "action",
    headerName: "Action",
    width: 110,
    renderCell: (params) => {
      return (
        <div className="cellAction">
          <Tooltip title="Price Details">
            <IconButton
              className="viewButton"
              onClick={() => setDetailsDialog(true)}
            >
              <Info style={{ fontSize: "20px" }} />
            </IconButton>
          </Tooltip>

          {params.row?.status === "open" && (
            <Tooltip title="Delete Price">
              <IconButton
                className="viewButton"
                onClick={() => setOpenDeleteDialog(true)}
              >
                <Delete style={{ fontSize: "20px" }} />
              </IconButton>
            </Tooltip>
          )}
        </div>
      );
    },
  },
];
