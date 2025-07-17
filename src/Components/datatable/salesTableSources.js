import { Delete, Edit, Info } from "@mui/icons-material";
import { IconButton } from "@mui/material";
import { DOMAIN } from "../../backend/API";

//Export sales Columns
export const salesColumns = (
  setOpenDeleteDialog,
  setDetailsDialog,
  setOpenFormDialog
) => [
  // { field: "id", headerName: "ID", width: 70 },
  {
    field: "date",
    headerName: "Date",
    width: 100,
  },
  { field: "receiptNo", headerName: "Receipt No", width: 90 },
  {
    field: "name",
    headerName: "Name",
    width: 250,
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
          
          {params.row.name.length > 30
            ? params.row.name.substring(0, 30) + `....`
            : params.row.name}
        </div>
      );
    },
  },
  {
    field: "product",
    headerName: "Products Info",
    width: 230,
    renderCell: (params) => {
      return (
        <div style={{ width: "100%" }}>
          {params.row.items?.length > 0 &&
            params.row.items.map((item) => {
              return (
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    width: "100%",
                  }}
                  key={item._id}
                >
                  <div>
                    {item?.productName !== null ? item?.productName : null}
                  </div>
                  {/* <div>Qty. {item.quantity}</div> */}
                  {/* <div>Rs. {item.price.newSellingPrice}</div> */}
                </div>
              );
            })}
        </div>
      );
    },
  },
  {
    field: "totalAmount",
    headerName: "Total Amount",
    width: 170,
    renderCell: (params) => {
      return <div>{params.row.totalAmount?.toLocaleString("en-US", {
            style: "currency",
            currency: "PKR",
            minimumFractionDigits: 2,
            maximumFractionDigits: 2,
          }) || 0}</div>;
    },
  },
  {
    field: "action",
    headerName: "Action",
    width: 90,
    renderCell: (params) => {
      return (
        <div className="cellAction">
       
          <IconButton
            className="viewButton"
            onClick={() => setDetailsDialog(true)}
          >
            <Info style={{ fontSize: "20px" }} />
          </IconButton>

          {params.row.status === "open" && (
            <IconButton
              className="viewButton"
              onClick={() => setOpenDeleteDialog(true)}
            >
              <Delete style={{ fontSize: "20px" }} />
            </IconButton>
          )}
        </div>
      );
    },
  },
];
