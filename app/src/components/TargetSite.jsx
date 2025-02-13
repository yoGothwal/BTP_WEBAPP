import React, { useState, useEffect } from "react";
import { Form, Button, Col, Row, Tabs, Tab } from "react-bootstrap";
import { DataGrid } from "@mui/x-data-grid";
import { ResponsiveLine } from "@nivo/line";
import { CloudUpload, CloudDownload } from "@mui/icons-material";
import { Tooltip, IconButton } from "@mui/material";

import { withStyles } from "@mui/styles";
const TargetSite = ({
  inputValues,
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
      // height: "36px",
      borderRadius: "18px",
      boxShadow: "0 20px 80px 0",
      backgroundColor: "green",
    },
  };
  const CustomTooltip = withStyles(styles)(Tooltip);

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
      Vs: 300,
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

  return (
    <Tabs id="CSMIP_Tabs" activeKey="Reference_Site" transition={false}>
      <Tab eventKey="Reference_Site" title="Reference site">
        <Form onSubmit={nextStep}>
          <Row>
            <Col xs={8}>
              <Row>
                <p>Table</p>
                <div style={{ height: 400, width: "100%" }}>
                  <DataGrid
                    getRowId={(row) => row.Name}
                    rows={soilProfile}
                    columns={columns}
                    pageSize={5}
                    processRowUpdate={handleRowUpdate}
                    disableSelectionOnClick
                  />
                </div>
                <Button
                  onClick={handleRowAdd}
                  variant="success"
                  className="mt-2"
                >
                  Add Row
                </Button>
                <IconButton>
                  Target DEPTH (m){" "}
                  <input
                    type="text"
                    name="Target_Depth"
                    size="1"
                    height="20px"
                    defaultValue={inputValues.Target_Depth}
                    required
                    onChange={handleChange}
                  />
                </IconButton>
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
                <IconButton onClick={downloadSoilProfileData}>
                  <CloudDownload />
                </IconButton>
              </Row>

              <Row>
                <div>
                  <br />
                  <Form.Group
                    as={Row}
                    controlId="Date"
                    style={{
                      display: "flex",
                      flexDirection: "row",
                      alignItems: "center",
                    }}
                  >
                    <Col xs={4}>
                      <Form.Label>
                        {" "}
                        <h6> 2) Water table depth (m)</h6>{" "}
                      </Form.Label>
                    </Col>
                    <Col xs={2}>
                      <Form.Control
                        type="text"
                        name="Ref_Water_Table_Depth"
                        defaultValue={inputValues.Ref_Water_Table_Depth}
                        required
                        onChange={handleChange}
                      />
                    </Col>
                  </Form.Group>
                  <Form.Group
                    as={Row}
                    controlId="Date"
                    style={{
                      display: "flex",
                      flexDirection: "row",
                      alignItems: "center",
                    }}
                  >
                    <Col xs={2}>
                      <Form.Label>
                        {" "}
                        <h6> 3) Halfspace: </h6>{" "}
                      </Form.Label>
                    </Col>
                    <Col xs={2}>
                      <CustomTooltip
                        title="Halfspace shear wave velocity"
                        placement="bottom"
                      >
                        <Form.Label>
                          {" "}
                          V<sub>S</sub> (m/s){" "}
                        </Form.Label>
                      </CustomTooltip>
                    </Col>
                    <Col xs={2}>
                      <Form.Control
                        type="text"
                        name="Ref_Halfspace_Vs"
                        defaultValue={inputValues.Ref_Halfspace_Vs}
                        required
                        onChange={handleChange}
                      />
                    </Col>
                    <Col xs={2}>
                      <CustomTooltip
                        title="Halfspace damping"
                        placement="bottom"
                      >
                        <Form.Label>Damping (%) </Form.Label>
                      </CustomTooltip>
                    </Col>
                    <Col xs={2}>
                      <Form.Control
                        type="text"
                        name="Ref_Halfspace_Damping"
                        defaultValue={inputValues.Ref_Halfspace_Damping}
                        required
                        onChange={handleChange}
                      />
                    </Col>
                  </Form.Group>
                </div>
              </Row>
            </Col>
            <Col xs={4}>
              <Tabs
                id="Profiles"
                defaultActiveKey="Vs_Profile"
                transition={false}
              >
                <Tab eventKey="Vs_Profile" title="Vs">
                  <div style={{ height: 550 }}>
                    <ResponsiveLine
                      data={inputValues.Site_Vs_Profile}
                      margin={{ top: 50, right: 0, bottom: 10, left: 70 }}
                      xScale={{ type: "linear" }}
                      yScale={{ type: "linear", reverse: true }}
                      axisTop={{
                        legend: "Shear wave velocity, Vs (m/s)",
                        legendOffset: -40,
                      }}
                      axisLeft={{ legend: "Depth (m)", legendOffset: -40 }}
                      enablePoints={false}
                      colors={{ datum: "color" }}
                    />
                  </div>
                </Tab>
                <Tab eventKey="Damping_Profile" title="Damping">
                  <div style={{ height: 550 }}>
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
                  </div>
                </Tab>
              </Tabs>
            </Col>
          </Row>

          <Button variant="primary" type="submit">
            Next
          </Button>
        </Form>
      </Tab>
      <Tab eventKey="Target_Site" title="Target site" disabled />
      <Tab eventKey="Ground_Motion" title="Ground  motion" disabled />
      <Tab
        eventKey="Analysis_Parameters"
        title="Analysis parameters"
        disabled
      />
      <Tab eventKey="Results" title="Results" disabled />
    </Tabs>
  );
};

export default TargetSite;
