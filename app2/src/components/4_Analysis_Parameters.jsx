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
  CircularProgress,
} from "@mui/material";
import { ResponsiveLine } from "@nivo/line";

const Analysis_Settings = ({
  inputValues,
  nextStep,
  prevStep,
  handleChange,
  whether_analyzed,
}) => {
  const [activeTab, setActiveTab] = useState("Analysis_Parameters");
  const [nestedTab, setNestedTab] = useState("Vs_Profile");

  const saveAndContinue = (e) => {
    e.preventDefault();
    nextStep();
  };

  const back = (e) => {
    e.preventDefault();
    prevStep();
  };

  const renderAnalysisParameters = () => {
    if (inputValues.Analysis_Type === "EQL") {
      return (
        <CardContent>
          <Typography variant="h6" sx={{ fontWeight: "bold", mb: 2 }}>
            2) Analysis parameters:
          </Typography>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <Tooltip
                title="Error tolerance is the limit at which the iterative process will terminate."
                placement="right"
              >
                <TextField
                  fullWidth
                  label="Error tolerance (%)"
                  name="Tol"
                  defaultValue={inputValues.Tol}
                  required
                  onChange={handleChange}
                />
              </Tooltip>
            </Grid>
            <Grid item xs={12}>
              <Tooltip
                title="Maximum number of iterations to perform."
                placement="right"
              >
                <TextField
                  fullWidth
                  label="Maximum iterations"
                  name="MaxIter"
                  defaultValue={inputValues.MaxIter}
                  required
                  onChange={handleChange}
                />
              </Tooltip>
            </Grid>
            <Grid item xs={12}>
              <Tooltip
                title="Ratio between the maximum strain and effective strain used to compute strain-compatible properties."
                placement="right"
              >
                <TextField
                  fullWidth
                  label="Effective strain ratio"
                  name="EffStrain"
                  defaultValue={inputValues.EffStrain}
                  required
                  onChange={handleChange}
                />
              </Tooltip>
            </Grid>
            <Grid item xs={12}>
              <Tooltip
                title="Limit of strain in calculations. If this strain is exceeded, the iterative calculation is ended."
                placement="right"
              >
                <TextField
                  fullWidth
                  label="Strain limit"
                  name="StrainLimit"
                  defaultValue={inputValues.StrainLimit}
                  required
                  onChange={handleChange}
                />
              </Tooltip>
            </Grid>
          </Grid>
        </CardContent>
      );
    }
    return null;
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
          <Tab label="Ground Motion" value="Ground_Motion" disabled />
          <Tab label="Analysis Parameters" value="Analysis_Parameters" />
          <Tab label="Results" value="Results" disabled />
        </Tabs>
      </Box>

      {activeTab === "Analysis_Parameters" && (
        <Box component="form" onSubmit={saveAndContinue} sx={{ mt: 2 }}>
          <Grid container spacing={2}>
            <Grid item xs={12} lg={8}>
              <Card elevation={2} sx={{ width: "100%", p: 1 }}>
                <CardContent>
                  <Typography
                    variant="h6"
                    gutterBottom
                    sx={{ fontWeight: "bold", mb: 2 }}
                  >
                    1) Analysis type:
                  </Typography>
                  <Tooltip
                    title="Set Site Response Analysis Calculation Method"
                    placement="right"
                  >
                    <TextField
                      fullWidth
                      select
                      label="Analysis Type"
                      name="Analysis_Type"
                      defaultValue={inputValues.Analysis_Type}
                      required
                      onChange={handleChange}
                    >
                      <option value="EQL">Equivalent linear</option>
                      {/* <option value="LE">Linear elastic</option> */}
                    </TextField>
                  </Tooltip>
                </CardContent>

                {renderAnalysisParameters()}
              </Card>
            </Grid>

            <Grid item xs={12} lg={4}>
              <Card elevation={2}>
                <CardContent>
                  <Tabs
                    value={nestedTab}
                    onChange={(e, newValue) => setNestedTab(newValue)}
                  >
                    <Tab label="Vs" value="Vs_Profile" />
                    <Tab label="Damping" value="Damping_Profile" />
                  </Tabs>
                  {nestedTab === "Vs_Profile" && (
                    <Box sx={{ height: "424px" }}>
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
                      />
                    </Box>
                  )}
                  {nestedTab === "Damping_Profile" && (
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
                      />
                    </Box>
                  )}
                </CardContent>
              </Card>
            </Grid>
          </Grid>

          <Box
            sx={{ display: "flex", justifyContent: "flex-end", mt: 2, gap: 1 }}
          >
            <Button variant="contained" onClick={back} sx={{ mr: 2 }}>
              Back
            </Button>
            <Button
              variant="contained"
              type="submit"
              disabled={whether_analyzed === 2}
            >
              Analyze
              {/* {whether_analyzed === 2 ? (
                "Analyze"
              ) : (
                <>
                  <CircularProgress size={20} sx={{ mr: 1 }} />
                  Analyze
                </>
              )} */}
            </Button>
          </Box>
        </Box>
      )}
    </>
  );
};

export default Analysis_Settings;
