import { Chip } from "@mui/material";

//Export stocks Columns
export const stocksColumns = (setOpenDeleteDialog, setDetailsDialog, setOpenFormDialog) => [
  // { field: "id", headerName: "ID", width: 70 },
  {
    field: "product",
    headerName: "Product Name",
    width: 400,
     // width: 100,
     renderCell: (params) => {
      return (
        <div className="cellAction">
         {params.row?.product && params.row.product.name}
        </div>
      );
    },
  },
  { field: "stock", headerName: "Quantity", width: 400},
  {
    field: "action",
    headerName: "Action",
    width: 150,
    renderCell: (params) => {
      return (
        <div className="cellAction">
          {params.row.stock > 0 ? <Chip label="Available" style={{background: "#07bc58", color: "white"}}/> : <Chip label="Out of Stock" style={{background: "red", color: "white"}}/>}
         
        </div>
      );
    },
  },
];

