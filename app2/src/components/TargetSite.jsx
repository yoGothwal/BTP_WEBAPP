import React, { useState, useEffect } from "react";
import { DataGrid } from "@mui/x-data-grid";
import { ResponsiveLine } from "@nivo/line";
import { CloudUpload, CloudDownload } from "@mui/icons-material";
import {
  Button,
  Stack,
  Grid,
  Card,
  Tabs,
  Tab,
  Tooltip,
  IconButton,
  CardContent,
  Typography,
  TextField,
} from "@mui/material";
import Box from "@mui/material/Box";
import LibraryAddIcon from "@mui/icons-material/LibraryAdd";
const TargetSite = ({
  inputValues,
  nextStep,
  prevStep,
  updateSoilLayers,
  readSoilProfileData,
  downloadSoilProfileData,
  handleChange,
}) => {
  const [soilProfile, setSoilProfile] = useState([]);
  const [graphData, setGraphData] = useState([]);

  useEffect(() => {
    if (!inputValues || !inputValues.Site_Vs_Profile) return;
    const newData = [
      ["Depth (m)", "Target Soil"],
      ...inputValues.Site_Vs_Profile[0].data.flatMap((d, i, arr) => {
        if (i === arr.length - 1) return [[parseFloat(d.x), parseFloat(d.y)]];
        return [
          [parseFloat(d.x), parseFloat(d.y)],
          [parseFloat(arr[i + 1].x), parseFloat(arr[i + 1].y)],
        ];
      }),
    ];
    setGraphData(newData);
  }, [inputValues.Target_Site_Soil_Profile]);

  useEffect(() => {
    setSoilProfile(inputValues.Target_Site_Soil_Profile);
    console.log(inputValues.Target_Site_Soil_Profile);
  }, [inputValues.Target_Site_Soil_Profile]);

  const handleRowUpdate = (newRow) => {
    const updatedData = soilProfile.map((row) =>
      row.Name === newRow.Name ? { ...newRow } : row
    );
    setSoilProfile(updatedData);
    updateSoilLayers(updatedData);
    return newRow;
  };

  const handleRowDelete = (Name) => {
    const updatedData = soilProfile
      .filter((row) => row.Name !== Name)
      .map((row, index) => ({ ...row, Name: index + 1 }));
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
    {
      field: "Name",
      headerName: "Layer", // ✅ headerName must be a string
      renderHeader: () => (
        // ✅ Use renderHeader for JSX
        <Tooltip title="Layer Name">
          <Typography component="span">
            <Box
              component="span"
              sx={{ fontSize: "1rem", fontWeight: "normal" }}
            >
              Layer
            </Box>
          </Typography>
        </Tooltip>
      ),
      minWidth: 80,
      flex: 1,
      editable: false,
      sortable: false,
      disableColumnMenu: true,
      align: "center",
      headerAlign: "center",
      cellClassName: "center-text",
    },
    {
      field: "Thickness",
      headerName: "Thickness", // ✅ headerName must be a string
      renderHeader: () => (
        // ✅ Use renderHeader for JSX
        <Tooltip title="Thickness (m)">
          <Typography component="span">
            <Box
              component="span"
              sx={{ fontSize: "1rem", fontWeight: "normal" }}
            >
              H
            </Box>
            <Box
              component="sub"
              sx={{ fontSize: "0.8rem", fontWeight: "normal" }}
            >
              (m)
            </Box>
          </Typography>
        </Tooltip>
      ),
      minWidth: 80,
      flex: 1,
      align: "center",
      headerAlign: "center",
      type: "number",
      editable: true,
      sortable: false,
      disableColumnMenu: true,
      cellClassName: "center-text",
    },
    {
      field: "Vs",
      headerName: "Vs", // ✅ headerName must be a string
      renderHeader: () => (
        // ✅ Use renderHeader for JSX
        <Tooltip title="Shear Wave Velocity (m/s)">
          <Typography component="span">
            <Box
              component="span"
              sx={{ fontSize: "1rem", fontWeight: "normal" }}
            >
              V<sub>s</sub>
            </Box>
            <Box
              component="sub"
              sx={{ fontSize: "0.8rem", fontWeight: "normal" }}
            >
              (m/s)
            </Box>
          </Typography>
        </Tooltip>
      ),
      minWidth: 80,
      flex: 1,
      align: "center",
      headerAlign: "center",
      type: "number",
      editable: true,
      sortable: false,
      disableColumnMenu: true,
      cellClassName: "center-text",
    },
    {
      field: "Gamma",
      headerName: "Gamma", // ✅ headerName must be a string
      renderHeader: () => (
        // ✅ Use renderHeader for JSX
        <Tooltip title="Saturated Unit Weight (kN/m³)">
          <Typography component="span">
            <Box
              component="span"
              sx={{ fontSize: "1rem", fontWeight: "normal" }}
            >
              Y<sub>sat</sub>
            </Box>
            <Box
              component="sub"
              sx={{ fontSize: "0.8rem", fontWeight: "normal" }}
            >
              (kN/m³)
            </Box>
          </Typography>
        </Tooltip>
      ),
      minWidth: 100,
      flex: 1,
      align: "center",
      headerAlign: "center",
      type: "number",
      editable: true,
      sortable: false,
      disableColumnMenu: true,
      cellClassName: "center-text",
    },
    {
      field: "PI",
      headerName: "PI", // ✅ headerName must be a string
      renderHeader: () => (
        // ✅ Use renderHeader for JSX
        <Tooltip title="Plasticity Index">
          <Typography component="span">
            <Box
              component="span"
              sx={{ fontSize: "1rem", fontWeight: "normal" }}
            >
              PI
            </Box>
          </Typography>
        </Tooltip>
      ),
      minWidth: 80,
      flex: 1,
      align: "center",
      headerAlign: "center",
      type: "number",
      editable: true,
      sortable: false,
      disableColumnMenu: true,
      cellClassName: "center-text",
    },
    {
      field: "OCR",
      headerName: "OCR", // ✅ headerName must be a string
      renderHeader: () => (
        // ✅ Use renderHeader for JSX
        <Tooltip title="Overconsolidation Ratio">
          <Typography component="span">
            <Box
              component="span"
              sx={{ fontSize: "1rem", fontWeight: "normal" }}
            >
              OCR
            </Box>
          </Typography>
        </Tooltip>
      ),
      minWidth: 80,
      flex: 1,
      align: "center",
      headerAlign: "center",
      type: "number",
      editable: true,
      sortable: false,
      disableColumnMenu: true,
      cellClassName: "center-text",
    },
    {
      field: "Damping",
      headerName: "Damping", // ✅ headerName must be a string
      renderHeader: () => (
        // ✅ Use renderHeader for JSX
        <Tooltip title="Damping (%)">
          <Typography component="span">
            <Box
              component="span"
              sx={{ fontSize: "1rem", fontWeight: "normal" }}
            >
              Damping (%)
            </Box>
          </Typography>
        </Tooltip>
      ),
      minWidth: 100,
      flex: 1,
      align: "center",
      headerAlign: "center",
      type: "number",
      editable: true,
      sortable: false,
      disableColumnMenu: true,
      cellClassName: "center-text",
    },
    {
      field: "SoilModel",
      headerName: "SoilModel", // ✅ headerName must be a string
      renderHeader: () => (
        // ✅ Use renderHeader for JSX
        <Tooltip title="Soil Model">
          <Typography component="span">
            <Box
              component="span"
              sx={{ fontSize: "1rem", fontWeight: "normal" }}
            >
              Model
            </Box>
          </Typography>
        </Tooltip>
      ),
      minWidth: 80,
      flex: 1,
      align: "center",
      headerAlign: "center",
      type: "number",
      editable: true,
      sortable: false,
      disableColumnMenu: true,
      cellClassName: "center-text",
    },
    {
      field: "actions",
      headerName: "Actions", // ✅ headerName must be a string
      renderHeader: () => (
        // ✅ Use renderHeader for JSX
        <Tooltip title="Actions">
          <Typography component="span">
            <Box
              component="span"
              sx={{ fontSize: "1rem", fontWeight: "normal" }}
            >
              Actions
            </Box>
          </Typography>
        </Tooltip>
      ),
      minWidth: 100,
      flex: 1,
      align: "center",
      headerAlign: "center",
      sortable: false,
      disableColumnMenu: true,
      renderCell: (params) => (
        <Button
          variant="danger"
          size="sm"
          onClick={() => handleRowDelete(params.row.Name)}
        >
          Delete
        </Button>
      ),
    },
  ];
  const [activeTab, setActiveTab] = useState("Target_Site");
  const [nestedTab, setNestedTab] = useState("Vs_Profile");
  const saveAndContinue = (e) => {
    // if (!inputValues.FAS) return;
    e.preventDefault();
    nextStep();
  };
  const back = (e) => {
    prevStep();
  };

  return (
    <>
      <Box sx={{ justifyContent: "center", alignItems: "center" }}>
        <Tabs
          value={activeTab}
          onChange={(event, newValue) => setActiveTab(newValue)}
          sx={{
            "& .MuiTab-root": {
              color: "primary.main",
              fontSize: "1rem",
              fontWeight: "bold",
            },
            "& .Mui-selected": { color: "primary.main" },
            "& .MuiTabs-indicator": { backgroundColor: "primary.main" },
          }}
        >
          <Tab label="Reference Site" value="Reference_Site" disabled />
          <Tab label="Target Site" value="Target_Site" />
          <Tab label="Ground Motion" value="Ground_Motion" disabled />
          <Tab
            label="Analysis Parameters"
            value="Analysis_Parameters"
            disabled
          />
          <Tab label="Results" value="Results" disabled />
        </Tabs>
      </Box>
      {activeTab === "Target_Site" && (
        <Box
          component="form"
          onSubmit={saveAndContinue}
          sx={{ mt: 1, height: "900px" }}
        >
          <Box
            sx={{
              borderBottom: 2,
              height: "800px",
              backgroundColor: "white",
            }}
          >
            <Grid container spacing={2} direction="row">
              <Grid item xs={12} lg={8}>
                <Card elevation={2} sx={{ width: "100%" }}>
                  <CardContent>
                    <Box>
                      <Stack
                        direction="row"
                        sx={{
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "space-between",
                        }}
                      >
                        <Typography component="span" variant="h6">
                          <b>1) Soil Profile</b> (m)
                        </Typography>
                        <Box sx={{ display: "flex", gap: 0 }}>
                          <Tooltip title="Add soil data">
                            <Button
                              sx={{ mt: 0, color: "primary" }}
                              onClick={handleRowAdd}
                            >
                              <LibraryAddIcon />
                            </Button>
                          </Tooltip>
                          <Tooltip title="Upload">
                            <IconButton component="label" color="primary">
                              <CloudUpload />
                              <input
                                name="TargetDataFile"
                                type="file"
                                hidden
                                accept=".xlsx"
                                onChange={readSoilProfileData}
                              />
                            </IconButton>
                          </Tooltip>

                          <Tooltip title="Download">
                            <IconButton
                              onClick={downloadSoilProfileData}
                              color="primary"
                            >
                              <CloudDownload />
                            </IconButton>
                          </Tooltip>
                        </Box>
                      </Stack>
                      <DataGrid
                        getRowId={(row) => row.Name}
                        rows={soilProfile}
                        columns={columns}
                        pageSize={5}
                        processRowUpdate={handleRowUpdate}
                        disableSelectionOnClick
                        sx={{
                          mt: 1,
                          height: "377px",
                          width: "100%",
                          "& .MuiDataGrid-cell": { textAlign: "center" },
                        }}
                      />
                    </Box>
                  </CardContent>
                  <Grid container spacing={2} padding={2}>
                    <Grid item xs={12} sm={6} md={4}>
                      <Stack spacing={2}>
                        <Typography
                          variant="h6"
                          component="span"
                          sx={{ mb: 1 }}
                        >
                          <b>2) Water table depth</b> (m)
                        </Typography>
                        <TextField
                          type="text"
                          name="Tar_Water_Table_Depth"
                          defaultValue={inputValues.Tar_Water_Table_Depth}
                          required
                          onChange={handleChange}
                          fullWidth
                        />
                        <Typography
                          component="span"
                          variant="h6"
                          sx={{ mb: 1, mt: 2 }}
                        >
                          <b>3) Target depth*</b> (m)
                        </Typography>
                        <TextField
                          type="text"
                          name="Target_Depth"
                          defaultValue={inputValues.Target_Depth}
                          required
                          onChange={handleChange}
                          fullWidth
                        />
                      </Stack>
                    </Grid>
                    <Grid item xs={12} sm={6} md={8}>
                      <Stack spacing={2}>
                        <Typography
                          variant="h6"
                          component="span"
                          sx={{ mb: 1 }}
                        >
                          <b>4) Halfspace</b>&nbsp;(V<sub>S</sub>(m/s)):
                        </Typography>
                        <Stack direction="row" spacing={2}>
                          <Stack direction="row" spacing={4}>
                            <Typography
                              component="span"
                              sx={{ mb: 2, alignContent: "center" }}
                            >
                              V<sub>S</sub>(m/s):
                            </Typography>
                            <TextField
                              fullWidth
                              name="Tar_Halfspace_Vs"
                              defaultValue={inputValues.Tar_Halfspace_Vs}
                              required
                              onChange={handleChange}
                            />
                            <Typography
                              component="span"
                              sx={{ mb: 2, alignContent: "center" }}
                            >
                              Damping (%):
                            </Typography>
                            <TextField
                              fullWidth
                              name="Tar_Halfspace_Damping"
                              defaultValue={inputValues.Tar_Halfspace_Damping}
                              required
                              onChange={handleChange}
                            />
                          </Stack>
                        </Stack>
                      </Stack>
                    </Grid>
                  </Grid>
                </Card>
              </Grid>
              <Grid item xs={12} lg={4}>
                <Card elevation={2} sx={{ width: "100%", p: 1 }}>
                  <CardContent>
                    <Tabs
                      value={nestedTab}
                      onChange={(event, newValue) => setNestedTab(newValue)}
                    >
                      <Tab value="Vs_Profile" label="Vs" />
                      <Tab value="Damping_Profile" label="Damping" />
                    </Tabs>
                    {nestedTab === "Vs_Profile" && (
                      <Box sx={{ height: "610px", width: "100%" }}>
                        <ResponsiveLine
                          data={inputValues.Site_Vs_Profile}
                          margin={{ top: 50, right: 0, bottom: 10, left: 50 }}
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
                            legend: "Shear wave velocity, Vs (m/s)",
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
                          enablePoints={false}
                          useMesh={true}
                          colors={{ datum: "color" }}
                          legends={[
                            {
                              anchor: "bottom-left",
                              direction: "column",
                              justify: false,
                              translateX: 10,
                              translateY: -10,
                              itemsSpacing: 0,
                              itemDirection: "left-to-right",
                              itemWidth: 80,
                              itemHeight: 20,
                              itemOpacity: 0.75,
                              symbolSize: 12,
                              symbolShape: "circle",
                              symbolBorderColor: "rgba(0, 0, 0, .5)",
                              effects: [
                                {
                                  on: "hover",
                                  style: {
                                    itemBackground: "rgba(0, 0, 0, .03)",
                                    itemOpacity: 1,
                                  },
                                },
                              ],
                            },
                          ]}
                        />
                      </Box>
                    )}
                    {nestedTab === "Damping_Profile" && (
                      <Box sx={{ height: "610px", width: "100%" }}>
                        <ResponsiveLine
                          data={inputValues.Site_Damping_Profile}
                          margin={{ top: 50, right: 0, bottom: 10, left: 50 }}
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
                          useMesh={true}
                          legends={[
                            {
                              anchor: "bottom-left",
                              direction: "column",
                              justify: false,
                              translateX: 10,
                              translateY: -10,
                              itemsSpacing: 0,
                              itemDirection: "left-to-right",
                              itemWidth: 80,
                              itemHeight: 20,
                              itemOpacity: 0.75,
                              symbolSize: 12,
                              symbolShape: "circle",
                              symbolBorderColor: "rgba(0, 0, 0, .5)",
                              effects: [
                                {
                                  on: "hover",
                                  style: {
                                    itemBackground: "rgba(0, 0, 0, .03)",
                                    itemOpacity: 1,
                                  },
                                },
                              ],
                            },
                          ]}
                        />
                      </Box>
                    )}
                  </CardContent>
                </Card>
              </Grid>
            </Grid>
          </Box>
          <Box
            sx={{ display: "flex", justifyContent: "flex-end", mt: 2, gap: 1 }}
          >
            <Button variant="contained" onClick={back} sx={{ mr: 2 }}>
              Back
            </Button>{" "}
            <Button variant="contained" type="submit">
              Next
            </Button>
          </Box>
        </Box>
      )}
    </>
  );
};

export default TargetSite;
