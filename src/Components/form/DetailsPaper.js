import { Box, Grid, Typography } from '@mui/material'
import React from 'react'

const DetailsPaper = ({ inputs }) => {
  //Capitalize function 
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

    <Grid container spacing={2}>
      {
        Object.entries(inputs).map(([key, value], i) => {
          return (
            key !== "_id" && key !== "pic" && key !== "userId" && key !== "customerId" && key !== "createdOn" && key !== "customerName"&& <Grid item xs={12} sm={6} md={6} lg={6} key={i}>
              <Box style={{ display: "flex", gap: 10 }} >

                <Typography>{capitalizeEachWord(key)}</Typography> :
                {value === "active" || value === "deactive" || value === "open" || value === "locked"? <div style={{ background: value === "active" || value === "open" ? "#02bf2e" : "#777", color: "white", width: 70, textAlign: "center", borderRadius: 4 }}>
                {capitalizeEachWord(String(value))}
                </div> : key === "salary" ?<Typography>{value?.toLocaleString("en-US", {
                      style: "currency",
                      currency: "PKR",
                      minimumFractionDigits: 2,
                      maximumFractionDigits: 2,
                    })}</Typography> : key === "email"? <Typography>{String(value)}</Typography>: key === "balance" ||  key === "payingAmount" || key === "remAmount" || key === "prevAmount" || key === "amount" ? <Typography>{value?.toLocaleString("en-US", {
                      style: "currency",
                      currency: "PKR",
                      minimumFractionDigits: 2,
                      maximumFractionDigits: 2,
                    })}</Typography> : <Typography>{capitalizeEachWord(String(value))}</Typography>}
              </Box>
            </Grid>
          )
        })
        // console.log(check)


      }
    </Grid>
  )
}

export default DetailsPaper