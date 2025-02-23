import React, { useState } from "react";
import {
  Button,
  Grid,
  Card,
  CardContent,
  Tabs,
  Tab,
  Typography,
  Box,
  InputLabel,
  FormControl,
  MenuItem,
  Select,
  CircularProgress,
  Tooltip,
} from "@mui/material";
import { ResponsiveLine } from "@nivo/line";

const Results = ({
  inputValues,
  prevStep,
  handleChange,
  handleFile,
  downloadFile,
}) => {
  const whether_processed = inputValues.whether_processed;

  const Site_Max_Strain_Profile_Data = inputValues.Max_Strain_Profile;
  const Max_Strain_Profile_Data = Site_Max_Strain_Profile_Data[0].data.concat(
    Site_Max_Strain_Profile_Data[1].data
  );
  const Max_Strain_Profile_MaxValue =
    1.1 *
    Math.max.apply(
      null,
      Max_Strain_Profile_Data.map((o) => o.x)
    );

  const Site_Response_Spectrum_Data = inputValues.Response_Spectrum;
  const Response_Spectrum_Data = Site_Response_Spectrum_Data[0].data.concat(
    Site_Response_Spectrum_Data[1].data
  );
  const Response_Spectrum_MaxValue =
    1.1 *
    Math.max.apply(
      null,
      Response_Spectrum_Data.map((o) => o.y)
    );

  const Site_FA_Spectrum_Data = inputValues.FA_Spectrum;
  const FA_Spectrum_Data = Site_FA_Spectrum_Data[0].data.concat(
    Site_FA_Spectrum_Data[1].data
  );
  const FA_Spectrum_MaxValue =
    1.1 *
    Math.max.apply(
      null,
      FA_Spectrum_Data.map((o) => o.y)
    );

  const Site_Motion_Data = inputValues.Motion;
  const Motion_Data = Site_Motion_Data[0].data.concat(Site_Motion_Data[1].data);
  const Motion_MaxValue =
    1.1 *
    Math.max.apply(
      null,
      Motion_Data.map((o) => o.y)
    );

  const Site_Transfer_Functions_Data = inputValues.Transfer_Functions;
  const Transfer_Functions_Data = Site_Transfer_Functions_Data[0].data.concat(
    Site_Transfer_Functions_Data[1].data
  );
  const Transfer_Functions_MaxValue =
    1.1 *
    Math.max.apply(
      null,
      Transfer_Functions_Data.map((o) => o.y)
    );

  const back = (e) => {
    e.preventDefault();
    prevStep();
  };
  const [activeTab1, setActiveTab1] = useState("Motion_Analysis");
  const [activeTab2, setActiveTab2] = useState("Max_Strain_Profile");

  console.log(inputValues.whether_processed);
  return (
    <Box sx={{ justifyContent: "center", alignItems: "center" }}>
      <Tabs
        value="Results"
        onChange={(e, newValue) => {}}
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
        <Tab label="Ground Motion" value="Ground_Motion" disabled />
        <Tab label="Analysis Parameters" value="Analysis_Parameters" disabled />
        <Tab label="Results" value="Results" />
      </Tabs>

      <Box sx={{ mt: 2, height: "900px" }}>
        <Box
          sx={{
            borderBottom: 2,
            height: "800px",
            backgroundColor: "white",
          }}
        >
          <Grid container spacing={2}>
            <Grid item xs={12} lg={8}>
              <Card elevation={2} sx={{ width: "100%", p: 1 }}>
                <CardContent>
                  <Tabs
                    value={activeTab1}
                    onChange={(e, newValue) => setActiveTab1(newValue)}
                    sx={{
                      "& .MuiTab-root": {
                        color: "primary",
                        fontSize: "1rem",
                        fontWeight: "bold",
                      },
                      "& .Mui-selected": { color: "primary.main" },
                      "& .MuiTabs-indicator": {
                        backgroundColor: "primary.main",
                      },
                    }}
                  >
                    <Tab
                      label="Transfer Functions"
                      value="Transfer_Functions"
                    />
                    <Tab label="Motion Analysis" value="Motion_Analysis" />
                  </Tabs>

                  {activeTab1 === "Transfer_Functions" && (
                    <Box sx={{ height: "550px" }}>
                      <ResponsiveLine
                        data={inputValues.Transfer_Functions}
                        margin={{ top: 50, right: 0, bottom: 50, left: 70 }}
                        xScale={{ type: "log", base: 10, max: "auto" }}
                        yScale={{
                          type: "linear",
                          min: 0,
                          max: Transfer_Functions_MaxValue,
                        }}
                        axisBottom={{
                          orient: "bottom",
                          tickSize: 5,
                          tickRotation: -20,
                          legend: "Frequency (Hz)",
                          legendOffset: 36,
                          legendPosition: "middle",
                          tickValues: [0.01, 0.1, 1.0, 10, 100],
                        }}
                        axisLeft={{
                          orient: "left",
                          tickSize: 5,
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
                  )}
                  {activeTab1 === "Motion_Analysis" && (
                    <Box sx={{ mt: 2, height: "650px" }}>
                      <Grid
                        container
                        spacing={2}
                        sx={{ display: "flex", alignItems: "end" }}
                      >
                        <Grid item xs={9}>
                          <Tooltip
                            title="Select Ground Motion for the Reference site"
                            placement="bottom"
                          >
                            <Typography
                              variant="h6"
                              fontWeight="bold"
                              sx={{ mb: 2 }}
                            >
                              1) Reference recording
                              {/* {whether_processed && (
                                <CircularProgress size={10} />
                              )} */}
                            </Typography>
                            <Box sx={{ minWidth: 120 }}>
                              <FormControl fullWidth>
                                <InputLabel id="demo-simple-select-label">
                                  Motion File
                                </InputLabel>
                                <Select
                                  select
                                  label="Motion File"
                                  name="Motion_File"
                                  value={inputValues.Motion_File}
                                  onChange={handleChange}
                                  required
                                >
                                  <MenuItem value="Sample_Motion">
                                    Sample Motion
                                  </MenuItem>
                                  <MenuItem value="Kobe">Kobe</MenuItem>
                                  <MenuItem value="Parkfield">
                                    Parkfield
                                  </MenuItem>
                                  <MenuItem value="Northridge">
                                    Northridge
                                  </MenuItem>
                                  <MenuItem value="LomaGilroy">
                                    Loma Gilroy
                                  </MenuItem>
                                </Select>
                              </FormControl>
                            </Box>
                          </Tooltip>
                        </Grid>

                        <Grid item xs={3}>
                          <input
                            type="file"
                            name="Motion_File"
                            accept=".txt"
                            onChange={handleFile}
                            style={{ display: "none" }}
                            id="upload-motion"
                          />
                          <label htmlFor="upload-motion">
                            <Button
                              variant="outlined"
                              component="span"
                              fullWidth
                            >
                              Upload Motion File
                            </Button>
                          </label>
                        </Grid>
                      </Grid>

                      <Box sx={{ height: "200px", mt: 2 }}>
                        <ResponsiveLine
                          data={inputValues.Motion}
                          margin={{ top: 10, right: 0, bottom: 50, left: 70 }}
                          xScale={{ type: "linear", min: "auto", max: "auto" }}
                          yScale={{
                            type: "linear",
                            min: -Motion_MaxValue,
                            max: Motion_MaxValue,
                          }}
                          axisBottom={{
                            orient: "bottom",
                            tickSize: 5,
                            tickRotation: -20,
                            legend: "Time (s)",
                            legendOffset: 36,
                            legendPosition: "middle",
                          }}
                          axisLeft={{
                            orient: "left",
                            tickSize: 5,
                            tickRotation: -20,
                            legend: "Acceleration (g)",
                            legendOffset: -50,
                            legendPosition: "middle",
                          }}
                          colors={{ datum: "color" }}
                          enablePoints={false}
                          useMesh={true}
                        />
                      </Box>

                      <Grid container spacing={2} sx={{ mt: 2 }}>
                        <Grid item xs={6}>
                          <Box sx={{ height: "300px" }}>
                            <ResponsiveLine
                              data={inputValues.FA_Spectrum}
                              margin={{
                                top: 10,
                                right: 0,
                                bottom: 50,
                                left: 70,
                              }}
                              xScale={{ type: "log", base: 10, max: "auto" }}
                              yScale={{
                                type: "linear",
                                min: 0,
                                max: FA_Spectrum_MaxValue,
                              }}
                              axisBottom={{
                                orient: "bottom",
                                tickSize: 5,
                                tickRotation: -20,
                                legend: "Frequency (Hz)",
                                legendOffset: 36,
                                legendPosition: "middle",
                                tickValues: [0.01, 0.1, 1.0, 10, 100],
                              }}
                              axisLeft={{
                                orient: "left",
                                tickSize: 5,
                                tickRotation: -20,
                                legend: "Frequency amplitude (g-s)",
                                legendOffset: -50,
                                legendPosition: "middle",
                              }}
                              colors={{ datum: "color" }}
                              enablePoints={false}
                              useMesh={true}
                            />
                          </Box>
                        </Grid>
                        <Grid item xs={6}>
                          <Box sx={{ height: "300px" }}>
                            <ResponsiveLine
                              data={inputValues.Response_Spectrum}
                              margin={{
                                top: 10,
                                right: 0,
                                bottom: 50,
                                left: 70,
                              }}
                              xScale={{ type: "log", base: 10, max: "auto" }}
                              yScale={{
                                type: "linear",
                                min: 0,
                                max: Response_Spectrum_MaxValue,
                              }}
                              axisBottom={{
                                orient: "bottom",
                                tickSize: 5,
                                tickRotation: -20,
                                legend: "Frequency (Hz)",
                                legendOffset: 36,
                                legendPosition: "middle",
                                tickValues: [0.01, 0.1, 1.0, 10, 100],
                              }}
                              axisLeft={{
                                orient: "left",
                                tickSize: 5,
                                tickRotation: -20,
                                legend: "Pseudo spectral acceleration (g)",
                                legendOffset: -50,
                                legendPosition: "middle",
                              }}
                              colors={{ datum: "color" }}
                              enablePoints={false}
                              useMesh={true}
                            />
                          </Box>
                        </Grid>
                      </Grid>
                    </Box>
                  )}
                </CardContent>
              </Card>
            </Grid>

            <Grid item xs={12} lg={4}>
              <Card elevation={2} sx={{ width: "100%", p: 1 }}>
                <CardContent>
                  <Tabs
                    value={activeTab2}
                    onChange={(e, newValue) => setActiveTab2(newValue)}
                    sx={{
                      "& .MuiTab-root": {
                        color: "primary",
                        fontSize: "1rem",
                        fontWeight: "bold",
                      },
                      "& .Mui-selected": { color: "primary.main" },
                      "& .MuiTabs-indicator": {
                        backgroundColor: "primary.main",
                      },
                    }}
                  >
                    <Tab label="Shear Strain" value="Max_Strain_Profile" />
                    <Tab label="Vs" value="Vs_Profile" />
                    <Tab label="Damping" value="Damping_Profile" />
                  </Tabs>

                  {activeTab2 === "Max_Strain_Profile" && (
                    <Box sx={{ height: "550px" }}>
                      <ResponsiveLine
                        data={inputValues.Max_Strain_Profile}
                        margin={{ top: 50, right: 0, bottom: 10, left: 70 }}
                        xScale={{
                          type: "linear",
                          min: "auto",
                          max: Max_Strain_Profile_MaxValue,
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
                          legend: "Maximum shear strain (%)",
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
                  {activeTab2 === "Vs_Profile" && (
                    <Box sx={{ height: "550px" }}>
                      <ResponsiveLine
                        data={inputValues.Site_Vs_Profile}
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
                  {activeTab2 === "Damping_Profile" && (
                    <Box sx={{ height: "550px" }}>
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
          <Button variant="contained" onClick={back}>
            Back
          </Button>
          <Button variant="contained" onClick={downloadFile}>
            Download Results
          </Button>
        </Box>
      </Box>
    </Box>
  );
};

export default Results;
