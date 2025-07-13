import { Delete, Edit, Info} from "@mui/icons-material";
import { IconButton } from "@mui/material";
import { DOMAIN } from "../../backend/API";


//Export Price Columns
export const priceColumns = (setOpenDeleteDialog, setDetailsDialog, setOpenFormDialog) => [
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
  { field: "costPrice", headerName: "Cost Price", width: 120, renderCell: (params) => {
    return (
      <div>
        {console.log(params.row.prices)}
        Rs. {params.row.costPrice ? params.row.costPrice : ""}
        </div>
    )
  } },
  { field: "oldSellingPrice", headerName: "Old Selling Price", width: 140, renderCell: (params) => {
    return (
      <div>
        Rs. {params.row.oldSellingPrice}
        </div>
    )
  } },
  { field: "newSellingPrice", headerName: "Selling Price", width: 120, renderCell: (params) => {
    return (
      <div>
        Rs. {params.row.newSellingPrice}
        </div>
    )
  } },
  { field: "differenceValue", headerName: "Difference Amount", width: 170, renderCell: (params) => {
    return (
      <div>
        Rs. {params.row.differenceValue}
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
    width: 110,
    renderCell: (params) => {
      return (
        <div className="cellAction">

          <IconButton className="viewButton" onClick={()=>setDetailsDialog(true)}>
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

