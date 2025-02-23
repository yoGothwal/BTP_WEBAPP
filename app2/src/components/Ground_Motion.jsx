import React, { useState } from "react";
import {
  Button,
  Grid,
  Card,
  CardContent,
  Tabs,
  Tab,
  Tooltip,
  TextField,
  Typography,
  Box,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from "@mui/material";
import { ResponsiveLine } from "@nivo/line";

const Ground_Motion = ({
  inputValues,
  nextStep,
  prevStep,
  handleChange,
  Generate_FAS,
  handleFile,
}) => {
  const [activeTab, setActiveTab] = useState("Ground_Motion");
  const [nestedTab, setNestedTab] = useState("Vs_Profile");

  const whether_analyzed = inputValues.whether_analyzed;
  const data = inputValues.FAS;
  const FAS_Data = data[0].data;
  const FAS_MaxValue =
    1.1 *
    Math.max.apply(
      null,
      FAS_Data.map((o) => o.y)
    );

  const saveAndContinue = (e) => {
    e.preventDefault();
    nextStep();
  };

  const back = (e) => {
    e.preventDefault();
    prevStep();
  };

  return (
    <>
      <Box sx={{ justifyContent: "center", alignItems: "center" }}>
        <Tabs
          value={activeTab}
          onChange={(e, newValue) => setActiveTab(newValue)}
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
          <Tab label="Target Site" value="Target_Site" disabled />
          <Tab label="Ground Motion" value="Ground_Motion" />
          <Tab
            label="Analysis Parameters"
            value="Analysis_Parameters"
            disabled
          />
          <Tab label="Results" value="Results" disabled />
        </Tabs>
      </Box>

      {activeTab === "Ground_Motion" && (
        <Box
          component="form"
          onSubmit={saveAndContinue}
          sx={{ mt: 2, height: "900px" }}
        >
          <Box
            sx={{
              borderBottom: 2,
              height: "800px",
              backgroundColor: "white",
            }}
          >
            <Box
              sx={{
                borderBottom: 2,
                height: "800px",
                backgroundColor: "white",
              }}
            >
              <Grid container spacing={2} sx={{ display: "flex" }}>
                <Grid item xs={12} lg={8}>
                  <Card elevation={2}>
                    <CardContent>
                      <Typography
                        variant="h6"
                        gutterBottom
                        sx={{ fontWeight: "bold" }}
                      >
                        1) Frequency amplitude spectrum
                      </Typography>
                      <Grid container spacing={2} alignItems="center">
                        <Grid item xs={12} sm={4}>
                          <Button
                            variant="contained"
                            onClick={Generate_FAS}
                            fullWidth
                            sx={{ mt: 1 }}
                          >
                            {whether_analyzed ? "Regenerate" : "Generate"}
                          </Button>
                        </Grid>
                        <Grid item xs={12} sm={4}>
                          <Typography
                            variant="body2"
                            color="error"
                            align="center"
                          >
                            OR
                          </Typography>
                        </Grid>
                        <Grid item xs={12} sm={4}>
                          <input
                            type="file"
                            name="FASFile"
                            accept=".txt"
                            onChange={handleFile}
                            style={{ display: "none" }}
                            id="upload-fas"
                          />
                          <label htmlFor="upload-fas">
                            <Button
                              variant="outlined"
                              component="span"
                              fullWidth
                              sx={{ mt: 1 }}
                            >
                              Upload FAS File
                            </Button>
                          </label>
                        </Grid>
                      </Grid>
                    </CardContent>

                    <CardContent>
                      <Box sx={{ height: "423px", width: "100%" }}>
                        <ResponsiveLine
                          data={data}
                          margin={{ top: 0, right: 0, bottom: 50, left: 70 }}
                          xScale={{ type: "log", base: 10, max: "auto" }}
                          yScale={{ type: "linear", min: 0, max: FAS_MaxValue }}
                          axisBottom={{
                            orient: "bottom",
                            tickSize: 10,
                            tickPadding: 5,
                            tickRotation: -20,
                            legend: "Frequency (Hz)",
                            legendOffset: 36,
                            legendPosition: "middle",
                            tickValues: [0.01, 0.1, 1.0, 10, 100],
                          }}
                          axisLeft={{
                            orient: "left",
                            tickSize: 10,
                            tickPadding: 5,
                            tickRotation: -20,
                            legend: "Frequency amplitude (g-s)",
                            legendOffset: -60,
                            legendPosition: "middle",
                          }}
                          colors={{ datum: "color" }}
                          enablePoints={false}
                          useMesh={true}
                        />
                      </Box>
                    </CardContent>

                    <CardContent>
                      <Typography
                        variant="h6"
                        gutterBottom
                        sx={{ fontWeight: "bold" }}
                      >
                        1) Earthquake source information
                      </Typography>
                      <Grid container spacing={2}>
                        <Grid item xs={12} sm={4}>
                          <Tooltip
                            title="Earthquake Magnitude"
                            placement="bottom"
                          >
                            <TextField
                              fullWidth
                              label="Magnitude (Mw)"
                              name="Magnitude"
                              defaultValue={inputValues.Magnitude}
                              required
                              onChange={handleChange}
                              sx={{ mt: 1 }}
                            />
                          </Tooltip>
                        </Grid>
                        <Grid item xs={12} sm={4}>
                          <Tooltip
                            title="Distance of target site from earthquake source"
                            placement="bottom"
                          >
                            <TextField
                              fullWidth
                              label="Distance (km)"
                              name="Distance"
                              defaultValue={inputValues.Distance}
                              required
                              onChange={handleChange}
                              sx={{ mt: 1 }}
                            />
                          </Tooltip>
                        </Grid>
                        <Grid item xs={12} sm={4}>
                          <Tooltip title="Region in USA" placement="bottom">
                            <FormControl fullWidth sx={{ mt: 1 }}>
                              <InputLabel id="region-label">Region</InputLabel>
                              <Select
                                labelId="region-label"
                                id="region-select"
                                value={inputValues.Region}
                                label="Region"
                                onChange={handleChange}
                                name="Region"
                                required
                              >
                                <MenuItem value="cena">CENA</MenuItem>
                                <MenuItem value="wna">WNA</MenuItem>
                              </Select>
                            </FormControl>
                          </Tooltip>
                        </Grid>
                      </Grid>
                    </CardContent>
                  </Card>
                </Grid>

                <Grid item xs={12} lg={4}>
                  <Card elevation={2} sx={{ width: "100%", p: 1 }}>
                    <CardContent>
                      <Tabs
                        value={nestedTab}
                        onChange={(e, newValue) => setNestedTab(newValue)}
                        sx={{
                          "& .MuiTab-root": {
                            color: "primary.main",
                            fontSize: "1rem",
                            fontWeight: "bold",
                          },
                          "& .Mui-selected": { color: "primary.main" },
                          "& .MuiTabs-indicator": {
                            backgroundColor: "primary.main",
                          },
                        }}
                      >
                        <Tab label="Vs" value="Vs_Profile" />
                        <Tab label="Damping" value="Damping_Profile" />
                      </Tabs>
                      {nestedTab === "Vs_Profile" && (
                        <Box sx={{ height: "610px", width: "100%" }}>
                          <ResponsiveLine
                            data={inputValues.Site_Vs_Profile}
                            margin={{ top: 50, right: 0, bottom: 10, left: 70 }}
                            xScale={{
                              type: "linear",
                              min: "auto",
                              max: "auto",
                            }}
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
                            colors={{ datum: "color" }}
                            enablePoints={false}
                            useMesh={true}
                          />
                        </Box>
                      )}
                      {nestedTab === "Damping_Profile" && (
                        <Box sx={{ height: "610px", width: "100%" }}>
                          <ResponsiveLine
                            data={inputValues.Site_Damping_Profile}
                            margin={{ top: 50, right: 0, bottom: 10, left: 70 }}
                            xScale={{
                              type: "linear",
                              min: "auto",
                              max: "auto",
                            }}
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
                          />
                        </Box>
                      )}
                    </CardContent>
                  </Card>
                </Grid>
              </Grid>
            </Box>
          </Box>

          <Box
            sx={{
              height: "40px",
              display: "flex",
              justifyContent: "flex-end",
              mt: 2,
              gap: 1,
            }}
          >
            <Button variant="contained" onClick={back} sx={{ mr: 2 }}>
              Back
            </Button>
            <Button variant="contained" type="submit">
              Next
            </Button>
          </Box>
        </Box>
      )}
    </>
  );
};

export default Ground_Motion;
