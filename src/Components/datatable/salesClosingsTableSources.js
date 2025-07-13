import { Delete, Edit, Info, NoEncryption, Print } from "@mui/icons-material";
import { Chip, IconButton, Tooltip } from "@mui/material";
import { DOMAIN } from "../../backend/API";
import LockIcon from "@mui/icons-material/Lock";
//Export sales Columns
export const salesClosingsColumns = (
  setOpenDeleteDialog,
  setDetailsDialog,
  handlePrint
) => [
  // { field: "id", headerName: "ID", width: 70 },
  {
    field: "name",
    headerName: "Cashier Name",
    width: 250,
    renderCell: (params) => {
      return (
        <div className="cellWithImg">
          <img
            src={
              params.row.cashier?.pic
                ? `${DOMAIN}/public/users/images/${params.row.cashier.pic}`
                : "./img/avatarfile.png"
            }
            alt=""
            className="cellImg"
          />
          {params.row.cashier.name.length > 11
            ? params.row.cashier.name.substring(0, 11) + `....`
            : params.row.cashier.name}
        </div>
      );
    },
  },
  {
    field: "date",
    headerName: "Date",
    width: 250,
  },
  {
    field: "status",
    headerName: "Status",
    width: 250,
    renderCell: (params) => {
      return (
        <Chip
          label={
            <span style={{ display: "flex", alignItems: "center", gap: 5 }}>
              {params.row.status === "open" ? (
                <NoEncryption style={{ height: 20, width: 20 }} />
              ) : (
                <LockIcon style={{ height: 20, width: 20 }} />
              )}
              <span style={{ fontSize: 13, fontWeight: "bold" }}>
                {params.row.status}
              </span>
            </span>
          }
          style={{
            background: params.row.status === "open" ? "#07bc58" : "#999",
            color: "white",
          }}
        />
      );
    },
  },

  {
    field: "action",
    headerName: "Action",
    width: 200,
    renderCell: (params) => {
      return (
        <div className="cellAction">
          <Tooltip title="Print Report">
            <IconButton
              className="viewButton"
              onClick={() => handlePrint(params.row._id)}
            >
              <Print style={{ fontSize: "20px" }} />
            </IconButton>
          </Tooltip>
          {/* <IconButton className="viewButton" onClick={()=>setDetailsDialog(true)}>
            <Info style={{ fontSize: "20px" }} />
          </IconButton> */}
          {params.row.status === "open" && (
            <Tooltip title="Delete Closing">
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
