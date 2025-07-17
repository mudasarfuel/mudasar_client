import * as React from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import GridForm from "../form/GridForm";
import { Box, IconButton, TextField } from "@mui/material";
import AvatarInput from "../form/AvatarInput";
import { Dangerous } from "@mui/icons-material";
import DetailsPaper from "../form/DetailsPaper";
import Avatar from "react-avatar";

const DetailsDialog = ({
  openDetailsDialog,
  handleOnDelete,
  setOpenDetailsDialog,
  heading,
  icon,
  color,
  state,
  setState,
  file,
  setFile,
  Id,
  handleOnCloseDetails,
  handleOnSubmit,
  inputs,
  message,
}) => {
  return (
    <>
      <Dialog
        open={openDetailsDialog}
        onClose={handleOnCloseDetails}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle
          id="alert-dialog-title"
          style={{
            color: color,
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            fontSize: "16px",
            fontWeight: "800",
          }}
        >
          <Box
            style={{
              color: color,
              display: "flex",
              alignItems: "center",

              fontSize: "16px",
              fontWeight: "600",
            }}
          >
            {icon}
            {heading}
          </Box>
          <Box>
            <IconButton onClick={handleOnCloseDetails}>
              <Dangerous />
            </IconButton>
          </Box>
        </DialogTitle>
        <DialogContent>
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              paddingTop: "8px",
              paddingBottom: "8px",
            }}
          >
            {inputs && (
              <Avatar
                src={
                  inputs.pic
                    ? `http://localhost:5000/public/${
                        inputs.designation ? "employees" : "customers"
                      }/images/${inputs.pic}`
                    : "./img/avatarfile.png"
                }
                size={120}
                round={true}
              />
            )}
          </div>
          <DetailsPaper inputs={inputs} />
        </DialogContent>
      </Dialog>
    </>
  );
};

export default DetailsDialog;
