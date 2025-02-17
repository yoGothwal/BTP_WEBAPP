import React, { useState, useEffect } from "react";

import { DataGrid } from "@mui/x-data-grid";
import { ResponsiveLine } from "@nivo/line";
import { CloudUpload, CloudDownload } from "@mui/icons-material";
import {
  Button,
  Paper,
  Stack,
  Grid,
  Card,
  Tabs,
  Tab,
  styled,
  Tooltip,
  IconButton,
  CardContent,
  Typography,
  TextField,
} from "@mui/material";
import Box from "@mui/material/Box";
const ReferenceSite = ({
  inputValues = {},
  nextStep,
  updateSoilLayers,
  readSoilProfileData,
  downloadSoilProfileData,
  handleChange,
}) => {
  const [soilProfile, setSoilProfile] = useState([]);
  const styles = {
    tooltip: {
      // width: "92px",
      boxShadow: "0 20px 80px 0",
      backgroundColor: "green",
    },
  };

  useEffect(() => {
    setSoilProfile(inputValues.Reference_Site_Soil_Profile || []);
  }, [inputValues.Reference_Site_Soil_Profile]);

  const handleRowUpdate = (newRow) => {
    console.log("Adding: ", newRow);
    const updatedData = soilProfile.map((row) =>
      row.Name === newRow.Name ? { ...newRow } : row
    );
    setSoilProfile(updatedData);
    updateSoilLayers(updatedData);
    return newRow;
  };

  const handleRowDelete = (Name) => {
    console.log("Deleted: ", Name);
    const updatedData = soilProfile
      .filter((row) => row.Name !== Name)
      .map((row, index) => ({
        ...row,
        Name: index + 1,
      }));
    setSoilProfile(updatedData);
    updateSoilLayers(updatedData);
  };

  const handleRowAdd = () => {
    const newId = soilProfile.length ? soilProfile.length + 1 : 1;
    const newRow = {
      Name: `${newId}`,
      Thickness: 5,
      Vs: 100,
      Gamma: 20,
      PI: 0,
      OCR: 1,
      Damping: 0.02,
      SoilModel: 1,
    };

    const updatedData = [...soilProfile, { ...newRow, Name: newId }];
    setSoilProfile(updatedData);
    updateSoilLayers(updatedData);
    return newRow;
  };

  const columns = [
    { field: "Name", headerName: "Layer", width: 100, editable: false },
    {
      field: "Thickness",
      headerName: "H (m)",
      width: 120,
      type: "number",
      editable: true,
    },
    {
      field: "Vs",
      headerName: "Vs (m/s)",
      width: 150,
      type: "number",
      editable: true,
    },
    {
      field: "Gamma",
      headerName: "γsat (kN/m³)",
      width: 150,
      type: "number",
      editable: true,
    },
    {
      field: "PI",
      headerName: "PI",
      width: 100,
      type: "number",
      editable: true,
    },
    {
      field: "OCR",
      headerName: "OCR",
      width: 100,
      type: "number",
      editable: true,
    },
    {
      field: "Damping",
      headerName: "Damping (%)",
      width: 150,
      type: "number",
      editable: true,
    },
    {
      field: "SoilModel",
      headerName: "Soil Model",
      width: 150,
      type: "number",
      editable: true,
    },
    {
      field: "actions",
      headerName: "Actions",
      width: 100,
      renderCell: (params) => (
        <Button
          variant="danger"
          size="sm"
          onClick={() => {
            const Name = params.row.Name;
            handleRowDelete(Name);
          }}
        >
          Delete
        </Button>
      ),
    },
  ];
  const [activeTab, setActiveTab] = useState("Reference_Site");
  const [nestedTab, setNestedTab] = useState("Vs_Profile");
  const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: "center",
    color: theme.palette.text.secondary,
  }));

  return (
    <>
      <Box>
        <Tabs
          value={activeTab}
          onChange={(event, newValue) => setActiveTab(newValue)}
        >
          <Tab label="Reference Site" value="Reference_Site" />
          <Tab label="Target Site" value="Target_Site" disabled />
          <Tab label="Ground Motion" value="Ground_Motion" disabled />
          <Tab
            label="Analysis Parameters"
            value="Analysis_Parameters"
            disabled
          />
          <Tab label="Results" value="Results" disabled />
        </Tabs>
      </Box>
      {activeTab === "Reference_Site" && (
        <Box
          component="form"
          onSubmit={nextStep}
          sx={{ mt: 2, display: "flex" }}
        >
          <Grid container spacing={2}>
            <Grid item xs={12} lg={8}>
              <Card
                elevation={4}
                sx={{
                  width: "auto",
                }}
              >
                <CardContent>
                  <DataGrid
                    getRowId={(row) => row.Name}
                    rows={soilProfile}
                    columns={columns}
                    pageSize={5}
                    processRowUpdate={handleRowUpdate}
                    disableSelectionOnClick
                    sx={{ height: "30vh", width: "100%" }}
                  />
                </CardContent>
              </Card>
              <Card elevation={4}>
                <CardContent>
                  <Stack
                    direction="row"
                    sx={{
                      justifyContent: "space-between",
                      alignItems: "center",
                      mt: 1,
                    }}
                  >
                    {/* <Button  variant="primary" onClick={handleRowAdd}>
                      Add Row
                    </Button> */}
                    <Button
                      sx={{
                        mt: 0,
                      }}
                      onClick={handleRowAdd}
                      variant="contained"
                    >
                      Add Row
                    </Button>

                    <Box
                      sx={{
                        display: "flex",
                        gap: 2,
                      }}
                    >
                      <Tooltip title="Download">
                        <IconButton component="label">
                          <CloudUpload />
                          <input
                            name="ReferenceDataFile"
                            type="file"
                            hidden
                            accept=".xlsx"
                            onChange={readSoilProfileData}
                          />
                        </IconButton>
                      </Tooltip>
                      <Tooltip title="Upload Data">
                        <IconButton onClick={downloadSoilProfileData}>
                          <CloudDownload />
                        </IconButton>
                      </Tooltip>
                    </Box>
                  </Stack>
                </CardContent>
              </Card>
              <Card elevation={4}>
                <CardContent>
                  <Stack>
                    <Item>
                      <Grid container spacing={2}>
                        <Grid item>
                          <Typography component="span">
                            <b>2) Water table depth</b> (m)
                          </Typography>
                        </Grid>
                        <Grid item>
                          <TextField
                            type="text"
                            name="Ref_Water_Table_Depth"
                            defaultValue={inputValues.Ref_Water_Table_Depth}
                            required
                            onChange={handleChange}
                          ></TextField>
                        </Grid>
                      </Grid>
                    </Item>

                    <Item>
                      <Grid
                        container
                        sx={{
                          display: "flex",
                          justifyContent: "space-between",
                          alignItems: "center",
                        }}
                      >
                        <Grid item>
                          <Typography component="span">
                            <b> 3) Halfspace</b>&nbsp;(V<sub>S</sub>(m/s)):
                          </Typography>
                        </Grid>

                        <Grid item xs={2}>
                          <TextField
                            fullWidth
                            name="Ref_Halfspace_Vs"
                            defaultValue={inputValues.Ref_Halfspace_Vs}
                            required
                            onChange={handleChange}
                          ></TextField>
                        </Grid>
                        <Grid item xs={2}>
                          <Typography>
                            <Tooltip title="Halfspace damping">
                              <Typography component="span">
                                <b>Damping (%)</b>
                              </Typography>
                            </Tooltip>
                          </Typography>
                        </Grid>
                        <Grid item xs={2}>
                          <TextField
                            type="text"
                            name="Ref_Halfspace_Damping"
                            defaultValue={inputValues.Ref_Halfspace_Damping}
                            required
                            onChange={handleChange}
                          ></TextField>
                        </Grid>
                      </Grid>
                    </Item>
                    <Button sx={{ mt: 2 }} variant="contained" type="submit">
                      Next
                    </Button>
                  </Stack>
                </CardContent>
              </Card>
            </Grid>
            <Grid item xs={12} lg={4}>
              <Card elevation={4}>
                <CardContent>
                  <Tabs
                    value={nestedTab}
                    onChange={(event, newValue) => setNestedTab(newValue)}
                  >
                    <Tab value="Vs_Profile" label="Vs"></Tab>
                    <Tab value="Damping_Profile" label="Damping"></Tab>
                  </Tabs>
                  {nestedTab === "Vs_Profile" && (
                    <Box sx={{ height: "58vh" }}>
                      <ResponsiveLine
                        data={inputValues.Site_Vs_Profile}
                        margin={{ top: 50, right: 0, bottom: 10, left: 70 }}
                        xScale={{ type: "linear", min: "auto", max: "auto" }}
                        yScale={{ type: "linear", reverse: true }}
                        axisTop={{
                          legend: "Shear wave velocity, Vs (m/s)",
                          legendOffset: -40,
                        }}
                        axisLeft={{ legend: "Depth (m)", legendOffset: -40 }}
                        enablePoints={false}
                        colors={{ datum: "color" }}
                      />
                    </Box>
                  )}
                  {nestedTab === "Damping_Profile" && (
                    <Box sx={{ height: "40vh", minHeight: "550px" }}>
                      <ResponsiveLine
                        data={inputValues.Site_Damping_Profile}
                        margin={{ top: 50, right: 0, bottom: 10, left: 70 }}
                        xScale={{ type: "linear", min: "auto", max: "auto" }}
                        yScale={{
                          type: "linear",
                          min: "auto",
                          max: "auto",
                          reverse: true,
                        }}
                        axisTop={{
                          orient: "top",
                          tickSize: 5,
                          tickRotation: -20,
                          legend: "Small-strain damping (%)",
                          legendOffset: -40,
                          legendPosition: "middle",
                        }}
                        axisLeft={{
                          orient: "left",
                          tickSize: 5,
                          tickRotation: -20,
                          legend: "Depth (m)",
                          legendOffset: -40,
                          legendPosition: "middle",
                        }}
                        colors={{ datum: "color" }}
                        enablePoints={false}
                        // useMesh={true}
                        // legends={[
                        //   {
                        //     anchor: "bottom-left",
                        //     direction: "column",
                        //     justify: false,
                        //     translateX: 10,
                        //     translateY: -10,
                        //     itemsSpacing: 0,
                        //     itemDirection: "left-to-right",
                        //     itemWidth: 80,
                        //     itemHeight: 20,
                        //     itemOpacity: 0.75,
                        //     symbolSize: 12,
                        //     symbolShape: "circle",
                        //     symbolBorderColor: "rgba(0, 0, 0, .5)",
                        //     effects: [
                        //       {
                        //         on: "hover",
                        //         style: {
                        //           itemBackground: "rgba(0, 0, 0, .03)",
                        //           itemOpacity: 1,
                        //         },
                        //       },
                        //     ],
                        //   },
                        // ]}
                      />
                    </Box>
                  )}
                </CardContent>
              </Card>
            </Grid>
          </Grid>
        </Box>
      )}
    </>
  );
};

export default ReferenceSite;
