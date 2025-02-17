import React from "react";
import SideNav from "./SideNav";
import NavBar from "./NavBar";
import { Box, Typography, Link, Grid } from "@mui/material";
const About = () => {
  return (
    <>
      <>
        <NavBar></NavBar>
        <br></br>
        <br></br>
        <Box sx={{ display: "flex" }}>
          <SideNav></SideNav>
          <Grid container>
            <Grid item>
              <Box sx={{ p: 3, mt: 2 }}>
                <Typography variant="h3" fontWeight="bold">
                  GENERATE INPUT GROUND MOTIONS FOR NUMERICAL ANALYSES
                </Typography>

                <Typography
                  variant="body1"
                  sx={{
                    borderBottom: 2,
                    padding: 2,
                    borderColor: "black",
                  }}
                >
                  A web application for the development of input ground motions
                  for the numerical evaluation of structures in engineering
                  practice
                </Typography>
              </Box>
            </Grid>
            <Grid item>
              <Box sx={{ p: 2 }}>
                <Typography variant="h4" gutterBottom>
                  ABOUT THIS TOOL
                </Typography>
                <Typography variant="h5" gutterBottom>
                  Acknowledgements
                </Typography>
                <Typography variant="body1" paragraph>
                  This webtool uses the pyStrata python package (Kottke, 2019)
                  to conduct site response calculations. We thank Dr. Albert R.
                  Kottke for his support with pyStrata during the development of
                  this project.
                </Typography>
                <Typography variant="body1" paragraph>
                  The development of this webtool was funded under agreement No.
                  1020-007 between UC Davis and the Department of Conservation
                  for the California Strong Motion Instrumentation Program
                  (CSMIP) Data Interpretation Project “Broadening the
                  Utilization of CSMIP Data: Double Convolution Methodology
                  Towards Developing Input Motions for Site Response and
                  Nonlinear Deformation Analyses.” Any opinions, findings,
                  conclusions, or recommendations expressed herein are those of
                  the authors and do not necessarily represent the views of this
                  organization.
                </Typography>
                <Typography variant="h5" gutterBottom>
                  Contact
                </Typography>
                <Typography variant="body1" paragraph>
                  We appreciate hearing from users, so please do send us an
                  email (
                  <Link href="mailto:skssinha@ucdavis.edu">
                    skssinha at ucdavis.edu
                  </Link>
                  ,{" "}
                  <Link href="mailto:rpretell@ucdavis.edu">
                    rpretell at ucdavis.edu
                  </Link>
                  , or{" "}
                  <Link href="mailto:kziotopoulou@ucdavis.edu">
                    kziotopoulou at ucdavis.edu
                  </Link>
                  ) and let us know about your applications and experiences.
                  Interested readers are referred to the below publications for
                  details about the background and applications.
                </Typography>
                <Typography variant="h5" gutterBottom>
                  References
                </Typography>
                <Typography component="ul" sx={{ pl: 4 }}>
                  <Typography component="li" paragraph>
                    Pretell R., Sinha S.K., Ziotopoulou K., and Watson-Lamprey
                    J.A. (2021).{" "}
                    <i>
                      Broadening the utilization of CSMIP data: Double
                      convolution methodology towards developing input motions
                      for site response and nonlinear deformation analyses.
                    </i>{" "}
                    In Proceedings of SMIP 2021 Seminar on Utilization of
                    Strong-Motion Data (SMIP21), California Geological Survey. (
                    <Link
                      target="_blank"
                      href="https://www.conservation.ca.gov/cgs/Documents/Program-SMIP/Seminar/SMIP21-P1-Paper-by-Ziotopoulou-a11y.pdf"
                    >
                      pdf
                    </Link>
                    )
                  </Typography>
                  <Typography component="li" paragraph>
                    Pretell R., Ziotopoulou K., and Abrahamson N. (2019).{" "}
                    <i>
                      Methodology for the development of input motions for
                      nonlinear deformation analyses
                    </i>
                    . In Proceedings of 7<sup>th</sup> International Conference
                    on Earthquake Geotechnical Engineering (ICEGE), Rome, Italy.
                    (
                    <Link
                      target="_blank"
                      href="https://www.issmge.org/uploads/publications/59/104/ch507.pdf"
                    >
                      pdf
                    </Link>
                    ){" "}
                  </Typography>
                </Typography>
              </Box>
            </Grid>
          </Grid>
        </Box>
      </>
    </>
  );
};

export default About;
