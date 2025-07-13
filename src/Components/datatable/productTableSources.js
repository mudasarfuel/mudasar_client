import { Delete, Edit, Info} from "@mui/icons-material";
import { IconButton } from "@mui/material";
import { DOMAIN } from "../../backend/API";


//Export Product Columns
export const productColumns = (setOpenDeleteDialog, setDetailsDialog, setOpenFormDialog) => [
  // { field: "id", headerName: "ID", width: 70 },
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
                ? `${DOMAIN}/public/products/images/${params.row.pic}`
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
  { field: "type", headerName: "Type", width: 100 },
  { field: "costPrice", headerName: "Cost Price", width: 150, renderCell: (params) => {
    return (
      <div>
        {console.log(params.row.prices)}
        Rs. {params.row.prices.costPrice ? params.row.prices.costPrice : ""}
        </div>
    )
  } },
  { field: "sellingPrice", headerName: "Selling Price", width: 140, renderCell: (params) => {
    return (
      <div>
        Rs. {params.row.prices.newSellingPrice}
        </div>
    )
  } },
  { field: "date", headerName: "Last Updated", width: 120,
    renderCell: (params) => {
      return (
        <div>
        {params.row.prices.date}
          </div>
      )
    }
   },
  {
    field: "status",
    headerName: "Status",
    width: 90,
    renderCell: (params) => {
      return (
        <div className={`cellWithStatus ${params.row.status}`}>
          {params.row.status}
        </div>
      );
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

          <IconButton className="viewButton" onClick={()=>setDetailsDialog(true)}>
            <Info style={{ fontSize: "20px" }} />
          </IconButton>

          {/* <IconButton
            className="viewButton"
            onClick={() => setOpenDeleteDialog(true)}
          >
            <Delete style={{ fontSize: "20px" }} />
          </IconButton> */}
        </div>
      );
    },
  },
];

