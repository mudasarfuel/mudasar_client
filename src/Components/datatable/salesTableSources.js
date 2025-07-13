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
    width: 190,
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
          {console.log("CHECK CUSTOMER SALE => ", params.row.customer.name)}
          {params.row.customer.name.length > 11
            ? params.row.customer.name.substring(0, 11) + `....`
            : params.row.customer.name}
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
                    {item?.product !== null ? item?.product?.name : null}
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
    width: 120,
    renderCell: (params) => {
      return <div>Rs. {params.row.totalAmount}</div>;
    },
  },
  {
    field: "action",
    headerName: "Action",
    width: 90,
    renderCell: (params) => {
      return (
        <div className="cellAction">
          {/* <IconButton
            className="viewButton"
            onClick={() => {
              setOpenFormDialog(true)
            }}
          >
            <Edit style={{ fontSize: "20px" }} />
          </IconButton> */}

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
