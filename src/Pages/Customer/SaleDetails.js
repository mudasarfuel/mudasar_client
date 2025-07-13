import * as React from "react";

import Dialog from "@mui/material/Dialog";

import DialogContent from "@mui/material/DialogContent";

import DialogTitle from "@mui/material/DialogTitle";

import { Box, Grid, IconButton, Paper, styled, Typography } from "@mui/material";

import { Dangerous } from "@mui/icons-material";

import Avatar from "react-avatar";
import { useContext } from "react";
import ModeContext from "../../context/mode/ModeContext";

const SaleDetails = ({
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

    //Initializing the use Context to get DarkMode state
  const { darkMode, dispatch } = useContext(ModeContext);

  console.log(darkMode)
    const DemoPaper = styled(Paper)(({ theme }) => ({
        width: "100%",
        // height: 120,
        padding: theme.spacing(2),
        ...theme.typography.body2,
    }));

    const capitalizeEachWord = (str) => {
        // Ensure the input is a string
        if (typeof str !== 'string') {
            return '';
        }

        // Step 1: Split the PascalCase string into individual words based on transitions between lowercase and uppercase
        const words = str.match(/([A-Z][a-z]+|[a-z]+)/g);

        // Step 2: Handle cases where no matches are found (words is null)
        if (!words) {
            return str; // If no matches, return the original string
        }

        // Step 3: Capitalize the first letter of all words
        const capitalizedWords = words.map((word, index) => {
            // Capitalize the first word, but leave others as lowercase
            return index === 0 ? word.charAt(0).toUpperCase() + word.slice(1).toLowerCase() : word.toLowerCase();
        });

        // Step 4: Join the words back into a single string with spaces between them
        return capitalizedWords.join(' ');
    }

    return (
        <>
            {/* <Button variant="outlined" onClick={handleClickOpen}>
    Open alert dialog
  </Button> */}
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
                    <Box style={{
                        color: color,
                        display: "flex",
                        alignItems: "center",

                        fontSize: "16px",
                        fontWeight: "600",
                    }}>
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
                    {/* <DialogContentText id="alert-dialog-description">
            {message}
          </DialogContentText> */}
                    {/* Add New Tenant Form  */}
                    <div
                        style={{
                            display: "flex",
                            justifyContent: "center",
                            paddingTop: "8px",
                            paddingBottom: "8px",
                        }}
                    >
                        <Avatar src={inputs.customer ? `http://localhost:5000/public/customers/images/${inputs.customer.pic}`
                            : "./img/avatarfile.png"} size={120} round={true} />
                    </div>
                    <Grid container spacing={2}>
                        {

                            Object.entries(inputs).map(([key, value], i) => {
                                // Convert any objects or other complex values to strings for safe rendering
                                return (
                                    typeof value !== 'object' && typeof value !== 'array' && key !== "customerId" && key !== "_id" && (
                                        <Grid item xs={12} sm={6} md={6} lg={6} key={i}>
                                            <Box style={{ display: 'flex', gap: 10 }}>
                                                <Typography>{capitalizeEachWord(String(key))}</Typography>
                                               {value === "credit" || value === "cash" ? <div style={{ background: value === "credit" ? "#ff0000" : "#06c90a", color: "white", width: 50, textAlign: "center", borderRadius: 4 }}>
                                                    {value}
                                                </div> : <Typography>{capitalizeEachWord(String(value))}</Typography>}
                                            </Box>
                                        </Grid>
                                    )
                                );
                            })


                        }

                    </Grid>
                    <div style={{ marginTop: 10, height: 200, overflow: "auto"}}>
                        {Object.entries(inputs).map(([key, value], i) => {
                            if (Array.isArray(value)) {
                                return value.map((item, index) => (
                                    <DemoPaper key={`${key}-${index}`} style={{marginTop: 7, color: darkMode === "dark" ? "#999" : "#222"
                                    }} >
                                        <Box style={{ display: "flex", justifyContent: "space-around" }}>
                                            <Box>
                                                <Box>Quantity: {item.quantity}</Box>
                                                <Box>Selling Price: {item.price.newSellingPrice}</Box>

                                            </Box>
                                            <Box>{item.product.name}</Box>
                                            <Box>
                                                <Box>Total Amount: {item.quantity * item.price.newSellingPrice}</Box>
                                                <Box>Discount Amount: {item.price.newSellingPrice / 100 * item.discount}</Box>
                                            </Box>
                                        </Box>
                                    </DemoPaper>
                                ));
                            }
                            return null; // or handle non-array values if needed
                        })}
                    </div>
                </DialogContent>
                {/* <DialogActions style={{marginRight: "18px", marginBottom: "15px"}}>
         
        </DialogActions> */}
            </Dialog>
        </>
    );
};

export default SaleDetails;
