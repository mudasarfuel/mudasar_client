import {
  Button,
  FormControl,
  FormControlLabel,
  Switch,
  TextField,
  Grid,
  Typography,
  Radio,
  RadioGroup,
  FormLabel,
  Box,
  Autocomplete,
} from "@mui/material";
import React from "react";
import "./form.scss";
import FileInput from "./FileInput";
import ColorPicker from "./ColorPicker";
import PasswordInput from "./PasswordInput";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import CellInput from "./CellInput";
import dayjs from "dayjs";
import Avatar from "react-avatar";
import { Link } from "react-router-dom";

export default function Form({
  formTitle,
  inputs,
  file,
  setFile,
  state,
  setState,
  submit,
}) {
  const handleNumericChange = (e) => {
    const { name, value } = e.target;

    const fieldSplit = name.split("-");
    console.log("check for name => ", name);

    // Regex: allow 2 decimal places for drum/reading fields, else integers only
    const regex =
      fieldSplit[1] === "quantity" ||
      name === "petrolDip" ||
      name === "dieselDip"
        ? /^\d+$/
        : /^\d*\.?\d{0,2}$/;

    if (value === "") {
      setState((prev) => ({
        ...(prev || {}),
        [name]: 0,
      }));
      return;
    }

    if (regex.test(value)) {
      setState((prev) => {
        const prevValue = prev?.[name] ?? 0;

        const cleaned = value.replace(/^0+(?!\.)/, "") || "0";

        if (prevValue === 0 || prevValue === "") {
          return {
            ...(prev || {}),
            [name]: cleaned,
          };
        }

        if (prevValue === value) return prev;

        return {
          ...prev,
          [name]: value,
        };
      });
    }
  };

  //Handle on change function
  const handleOnChange = (e) => {
    setState((prev) => ({
      ...(prev || {}), // if null, treat as empty object
      [e.target.name]: e.target.value,
    }));
  };

  //Handle on Color Change
  const handleColorChange = (colorValue) => {
    setState({ ...state, color: colorValue });
  };

  //Get Input field according to type
  const getField = (input) => {
    switch (input.type) {
      case "text":
        return (
          <Grid
            item
            xs={input.grid.xs}
            sm={input.grid.sm}
            md={input.grid.md}
            lg={input.grid.lg}
            key={input.id}
          >
            <TextField
              label={input.label}
              size="small"
              tabIndex={input.tabIndex}
              disabled={input.disabled}
              type={input.type}
              name={input.name}
              spellCheck={false}
              value={state !== "" ? state[input.name] : ""}
              onChange={handleOnChange}
              style={{ width: "100%" }}
            />
          </Grid>
        );
      case "number":
        return (
          <Grid
            item
            xs={input.grid.xs}
            sm={input.grid.sm}
            md={input.grid.md}
            lg={input.grid.lg}
            key={input.id}
          >
            <TextField
              label={input.label}
              size="small"
              type={input.type}
              tabIndex={input.tabIndex}
              name={input.name}
              disabled={input.disabled ? true : false}
              value={
                state[input.name]
                  ? state[input.name]
                  : input.value
                  ? input.value
                  : 0
              }
              onChange={handleNumericChange}
              style={{ width: "100%" }}
            />
          </Grid>
        );
      case "switch":
        return (
          <Grid item xs={input.grid.xs} sm={input.grid.sm} key={input.id}>
            <FormControlLabel
              control={<Switch />}
              disabled={input.disability}
              name={input.name}
              tabIndex={input.tabIndex}
              label={input.label}
              onChange={(e) =>
                setState({ ...state, [input.name]: e.target.checked })
              }
            />
          </Grid>
        );
      case "button":
        return (
          <Grid item xs={input.grid.xs} sm={input.grid.sm} key={input.id}>
            {input.link ? (
              <Button
                tabIndex={input.tabIndex}
                type={`${input.btntype}`}
                color={`${input.color}`}
                variant={input.variant}
                component={Link}
                to={input.link}
                style={{ width: "100%" }}
              >
                {input.label}
              </Button>
            ) : input.btnFunc ? (
              <Button
                tabIndex={input.tabIndex}
                type="button"
                color={`${input.color}`}
                variant={input.variant}
                onClick={() => input.btnFunc()}
                style={{ width: "100%" }}
              >
                {input.label}
              </Button>
            ) : (
              <Button
                tabIndex={input.tabIndex}
                type={`${input.btntype}`}
                color={`${input.color}`}
                variant={input.variant}
                style={{ width: "100%" }}
              >
                {input.label}
              </Button>
            )}
          </Grid>
        );
      case "select":
        return (
          <Grid
            item
            xs={input.grid.xs}
            sm={input.grid.sm}
            md={input.grid.md}
            lg={input.grid.lg}
            key={input.id}
          >
            <FormControl style={{ width: "100%" }} size="small">
              {/* <InputLabel shrink>{input.label}</InputLabel> */}

              <Autocomplete
                options={input.options || []}
                size={input.size || "small"}
                disableClearable
                disabled = {input.disabled}
                isOptionEqualToValue={(option, value) =>
                  option.value === value.value
                }
                getOptionLabel={(option) => option.name || ""}
                value={
                  input.options.find(
                    (item) => item.value === state?.[input.name]
                  ) || null
                }
                onChange={(event, newValue) => {
                  handleOnChange({
                    target: {
                      name: input.name,
                      value: newValue ? newValue.value : "",
                    },
                  });
                }}
                renderInput={(params) => (
                  <TextField {...params} label={input.label} />
                )}
                renderOption={(props, option) => (
                  <Box
                    component="li"
                    {...props}
                    sx={{
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                      gap: 2,
                    }}
                  >
                    {/* Left Block */}
                    <Box
                      sx={{ display: "flex", alignItems: "center", }}
                    >
                      {option.avatarUrl && (
                        <Avatar
                          src={option.avatarUrl}
                          round
                          size="30"
                          style={{ marginRight: 10 }}
                        />
                      )}
                      {option.name}
                    </Box>

                    {/* Center Block */}
                    <Box sx={{ textAlign: "center", flex: 1 }}>
                      {option.amount ? (
                        <>
                          <Box>
                            {option.amount.toLocaleString("en-US", {
                              style: "currency",
                              currency: "PKR",
                              minimumFractionDigits: 2,
                            })}
                          </Box>
                          <Box>
                            {option.remAdv.toLocaleString("en-US", {
                              style: "currency",
                              currency: "PKR",
                              minimumFractionDigits: 2,
                            })}
                          </Box>
                        </>
                      ) : option.salary ? (
                        <Box>
                          {option.salary.toLocaleString("en-US", {
                            style: "currency",
                            currency: "PKR",
                            minimumFractionDigits: 2,
                          })}
                        </Box>
                      ) : null}
                    </Box>

                    {/* Right Block */}
                    <Box sx={{ textAlign: "right", flex: 1 }}>
                      {option.designation
                        ? `( ${option.designation} )`
                        : option.date
                        ? `( ${option.date} )`
                        : null}
                    </Box>
                  </Box>
                )}
                renderValue={(selectedValue) => {
                  const selectedItem = input.options.find(
                    (item) => item.value === selectedValue?.value
                  );
                  if (!selectedItem) return "";

                  return (
                    <Box
                      style={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "space-between",
                        gap: "16px",
                      }}
                    >
                      <Box
                        style={{
                          display: "flex",
                          alignItems: "center",
                          flex: 1,
                        }}
                      >
                        {selectedItem.avatarUrl && (
                          <Avatar
                            src={selectedItem.avatarUrl}
                            sx={{ width: 30, height: 30, mr: 1 }}
                          />
                        )}
                        {selectedItem.name}
                      </Box>

                      <Box style={{ textAlign: "center", flex: 1 }}>
                        {selectedItem.amount ? (
                          <>
                            <Box>
                              {selectedItem.amount.toLocaleString("en-US", {
                                style: "currency",
                                currency: "PKR",
                                minimumFractionDigits: 2,
                              })}
                            </Box>
                            <Box>
                              {selectedItem.remAdv.toLocaleString("en-US", {
                                style: "currency",
                                currency: "PKR",
                                minimumFractionDigits: 2,
                              })}
                            </Box>
                          </>
                        ) : selectedItem.salary ? (
                          selectedItem.salary.toLocaleString("en-US", {
                            style: "currency",
                            currency: "PKR",
                            minimumFractionDigits: 2,
                          })
                        ) : null}
                      </Box>

                      <Box style={{ textAlign: "right", flex: 1 }}>
                        {selectedItem.designation
                          ? `( ${selectedItem.designation} )`
                          : selectedItem.date
                          ? `( ${selectedItem.date} )`
                          : null}
                      </Box>
                    </Box>
                  );
                }}
              />
            </FormControl>
          </Grid>
        );
      case "colorInput":
        return (
          <Grid item xs={input.grid.xs} sm={input.grid.sm} key={input.id}>
            <ColorPicker
              value={state.color}
              handleColorChange={handleColorChange}
            />
          </Grid>
        );
      case "file":
        return (
          <Grid
            item
            xs={input.grid.xs}
            sm={input.grid.sm}
            md={input.grid.md}
            lg={input.grid.lg}
            key={input.id}
          >
            <FileInput file={file} setFile={setFile} />
          </Grid>
        );
      case "email":
        return (
          <Grid
            item
            xs={input.grid.xs}
            sm={input.grid.sm}
            md={input.grid.md}
            lg={input.grid.lg}
            key={input.id}
          >
            <TextField
              label={input.label}
              size="small"
              tabIndex={input.tabIndex}
              style={{ minWidth: "100%" }}
              spellCheck={false}
              onChange={handleOnChange}
              name={input.name}
              value={state[input.name]}
            />
          </Grid>
        );
      case "password":
        return (
          <Grid
            item
            xs={input.grid.xs}
            sm={input.grid.sm}
            md={input.grid.md}
            lg={input.grid.lg}
            key={input.id}
          >
            <PasswordInput
              label={input.label}
              onChange={handleOnChange}
              name={input.name}
              type={input.type}
              state={state}
            />
          </Grid>
        );
      case "phone":
        return (
          <Grid
            item
            xs={input.grid.xs}
            sm={input.grid.sm}
            md={input.grid.md}
            lg={input.grid.lg}
            key={input.id}
          >
            <CellInput state={state} setState={setState} />
          </Grid>
        );
      case "date":
        return (
          <Grid
            item
            xs={input.grid.xs}
            sm={input.grid.sm}
            md={input.grid.md}
            lg={input.grid.lg}
            key={input.id}
          >
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DatePicker
                label={input.label}
                name={input.name}
                format="DD-MM-YYYY"
                tabIndex={input.tabIndex}
                disabled={input.disabled}
                value={
                  state[input.name] !== ""
                    ? dayjs(state[input.name], "DD-MM-YYYY")
                    : null
                }
                slotProps={{
                  textField: { size: "small", fullWidth: true, error: false },
                }}
                onChange={(value) =>
                  setState({
                    ...state,
                    [input.name]: dayjs(value.$d).format("DD-MM-YYYY"),
                  })
                }
              />
            </LocalizationProvider>
          </Grid>
        );
      case "month":
        return (
          <Grid
            item
            xs={input.grid.xs}
            sm={input.grid.sm}
            md={input.grid.md}
            lg={input.grid.lg}
            key={input.id}
          >
            {console.log(
              "Name => ",
              input.name,
              "Value => ",
              state[input.name]
            )}
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DatePicker
                label={input.label}
                views={["month"]}
                name={input.name}
                value={
                  state[input.name] !== ""
                    ? dayjs(state[input.name], "MMM")
                    : ""
                }
                slotProps={{
                  textField: { size: "small", fullWidth: true, error: false },
                }}
                onChange={(value) => {
                  const formattedValue = value ? value.format("MMM") : null;
                  setState({
                    ...state,
                    [input.name]: formattedValue,
                  });
                  console.log(
                    value ? value.format("MMM") : dayjs().format("MMM")
                  );
                }}
                format="MMM"
              />
            </LocalizationProvider>
          </Grid>
        );
      case "radio":
        return (
          <Grid item xs={input.grid.xs} sm={input.grid.sm} key={input.id}>
            <FormControl>
              <FormLabel id="demo-radio-buttons-group-label">
                {input.label}
              </FormLabel>
              <RadioGroup
                aria-labelledby="demo-radio-buttons-group-label"
                defaultValue="female"
                name={input.name}
              >
                {input.options.map(
                  (item) =>
                    item && (
                      <FormControlLabel
                        key={item.id}
                        value={item.value}
                        control={<Radio />}
                        label={item.name}
                      />
                    )
                )}
              </RadioGroup>
            </FormControl>
          </Grid>
        );
      case "label":
        return (
          <Grid
            item
            xs={input.grid.xs}
            sm={input.grid.sm}
            md={input.grid.md}
            lg={input.grid.lg}
            key={input.id}
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Typography variant="subtitle1">{input.label}</Typography>
          </Grid>
        );
      default:
        return;
    }
  };
  return (
    <form className="form" onSubmit={submit}>
      <div style={{ marginBottom: "10px", marginTop: "10px" }}>
        <Typography>{formTitle}</Typography>
      </div>

      <Grid container spacing={2}>
        {inputs.map((input) => getField(input))}
      </Grid>
    </form>
  );
}
