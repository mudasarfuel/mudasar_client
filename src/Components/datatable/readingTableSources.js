import { Delete, Edit, Info} from "@mui/icons-material";
import { IconButton } from "@mui/material";

// SAMPLE DATA FOR USERS
//Export Reading Columns
export const readingColumns = (setOpenDeleteDialog, setDetailsDialog, setOpenFormDialog) => [
  // { field: "id", headerName: "ID", width: 70 },
  {
    field: "name",
    headerName: "Machine",
    width: 200,
  },
  // { field: "email", headerName: "Email", width: 230 },
  { field: "type", headerName: "Type", width: 200 },
  { field: "prevReading", headerName: "Previous Reading", width: 200 },
  { field: "newReading", headerName: "Current Reading", width: 200 },
  { field: "date", headerName: "Date", width: 130, renderCell: (params) => {
      return (
        <div className="cellAction">
          {params.row.date?.split("T")[0] || 0}
        </div>
      );
    }, },
  
];

