import React, { Component } from "react";
import { Form, Button, Col, Row, Tabs, Tab } from "react-bootstrap";
//import { CloudUpload, CloudDownload } from "@mui/icons-material";
//import MaterialTable from "material-table";
import { DataGrid } from "@mui/x-data-grid"; //using it instead of material-table
import { ResponsiveLine } from "@nivo/line";
import { CloudUpload, CloudDownload } from "@mui/icons-material";
import { Tooltip } from "@mui/material";
import { withStyles } from "@mui/styles";
import IconButton from "@mui/material/IconButton";

class Reference_Site extends Component {
  constructor(props) {
    super(props);
    this.state = {
      soilProfile: [],
    };
  }

  componentDidMount() {
    this.setState({
      soilProfile: this.props.inputValues.Reference_Site_Soil_Profile,
    });
  }
  back = (e) => {
    e.preventDefault();
    this.props.prevStep();
  };

  saveAndContinue = (e) => {
    e.preventDefault();
    this.props.nextStep();
  };
  //Table
  processRowUpdate = (newRow, oldRow) => {
    const updatedData = this.state.soilProfile.map((row) =>
      row.id === oldRow.id ? { ...newRow } : row
    );
    this.setState({ soilProfile: updatedData });
    this.props.updateSoilLayers(updatedData);
    return newRow;
  };

  handleRowDelete = (id) => {
    const updatedData = this.state.soilProfile.filter((row) => row.id !== id);
    this.setState({ soilProfile: updatedData });
    this.props.updateSoilLayers(updatedData);
  };

  handleRowAdd = () => {
    const newId = this.state.soilProfile.length + 1;
    const newRow = {
      id: newId,
      Name: newId,
      Thickness: 5,
      Vs: 100,
      Gamma: 20,
      PI: 0,
      OCR: 1,
      Damping: 0.02,
      SoilModel: 1,
    };
    this.setState({ soilProfile: [...this.state.soilProfile, newRow] });
    this.props.updateSoilLayers([...this.state.soilProfile, newRow]);
  };

  render() {
    //columns for table
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
            onClick={() => this.handleRowDelete(params.row.id)}
          >
            Delete
          </Button>
        ),
      },
    ];

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

    return (
      <Tabs id="CSMIP_Tabs" activeKey="Reference_Site" transition={false}>
        <Tab eventKey="Reference_Site" title="Reference site">
          <Box sx={{ flexGrow: 1, p: 3 }}>
            <br />
            <br />
            <br />
            <br />
            <Form onSubmit={this.saveAndContinue} validated>
              <Row>
                <Box>
                  <Col xs={8}>
                    <Row>
                      <p>Table</p>
                      <div style={{ height: 400, width: "100%" }}>
                        <DataGrid
                          key={this.state.soilProfile.length}
                          getRowId={(row) => row.Name}
                          rows={this.state.soilProfile}
                          columns={columns}
                          pageSize={5}
                          processRowUpdate={this.processRowUpdate}
                          disableSelectionOnClick
                        />
                      </div>
                      <Button
                        onClick={this.handleRowAdd}
                        variant="success"
                        className="mt-2"
                      >
                        Add Row
                      </Button>
                      <br />
                      <br />
                      <IconButton component="label">
                        <CloudUpload />
                        <input
                          type="file"
                          hidden
                          name="ReferenceDataFile"
                          accept=".xlsx"
                          onChange={this.props.readSoilProfileData}
                        />
                      </IconButton>
                      <IconButton onClick={this.props.downloadSoilProfileData}>
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
                              defaultValue={
                                this.props.inputValues.Ref_Water_Table_Depth
                              }
                              required
                              onChange={this.props.handleChange}
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
                              defaultValue={
                                this.props.inputValues.Ref_Halfspace_Vs
                              }
                              required
                              onChange={this.props.handleChange}
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
                              defaultValue={
                                this.props.inputValues.Ref_Halfspace_Damping
                              }
                              required
                              onChange={this.props.handleChange}
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
                            data={this.props.inputValues.Site_Vs_Profile}
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
                        </div>
                      </Tab>

                      <Tab eventKey="Damping_Profile" title="Damping">
                        <div style={{ height: 550 }}>
                          <ResponsiveLine
                            data={this.props.inputValues.Site_Damping_Profile}
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
                </Box>
              </Row>
              <p></p>
              <Button variant="primary" type="Submit">
                Next
              </Button>
            </Form>
          </Box>
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
  }
}

export default Reference_Site;
