import { Delete, Edit, Info} from "@mui/icons-material";
import { IconButton } from "@mui/material";
import { DOMAIN } from "../../backend/API";


//Export Purchase Columns
export const purchaseColumns = (setOpenDeleteDialog, setDetailsDialog, setOpenFormDialog) => [
  // { field: "id", headerName: "ID", width: 70 },
  {
    field: "supplier",
    headerName: "Supplier Name",
    width: 230,
    renderCell: (params) => {
      return (
        <div className="cellWithImg">
          <img
            src={
              params.row.supplier?.pic
                ? `${DOMAIN}/public/suppliers/images/${params.row.supplier.pic}`
                : "./img/avatarfile.png"
            }
            alt=""
            className="cellImg"
          />
          {params.row.supplierName}
        </div>
      );
    },
  },
  { field: "productName", headerName: "Product Name", width: 150 },
  { field: "quantity", headerName: "Quantity", width: 120 },
  { field: "costPrice", headerName: "Cost Price", width: 110, renderCell: (params) => {
    return (
      <div>
        Rs. {params.row.costPrice}
        </div>
    )
  } },
  { field: "sellingPrice", headerName: "Selling Price", width: 110, renderCell: (params) => {
    return (
      <div>
        Rs. {params.row.sellingPrice}
        </div>
    )
  } },
  { field: "date", headerName: "Date", width: 120,
    renderCell: (params) => {
      return (
        <div>
        {params.row.date}
          </div>
      )
    }
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

          {/* <IconButton className="viewButton" onClick={()=>setDetailsDialog(true)}>
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

