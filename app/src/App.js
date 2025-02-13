import React, { useState, useEffect } from 'react';
import Application from "./components/0_Application";
import './App.css';
import Illustration from './App.png';

import { styled } from '@mui/material/styles';
import DashboardIcon from '@mui/icons-material/Dashboard';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import BarChartIcon from '@mui/icons-material/BarChart';
import DescriptionIcon from '@mui/icons-material/Description';
import LayersIcon from '@mui/icons-material/Layers';
import Grid from '@mui/material/Grid2';
import { experimental_extendTheme as extendTheme } from '@mui/material/styles';
import { AppProvider, DashboardLayout, PageContainer } from '@mui/toolpad-core';

// import { PythonProvider } from "react-py";

// function Codeblock() {
//   const [input, setInput] = useState("");

//   // Use the usePython hook to run code and access both stdout and stderr
//   const { runPython, stdout, stderr, isLoading, isRunning } = usePython();

//   return (
//     <>
//       {isLoading ? <p>Loading...</p> : <p>Ready!</p>}
//       <form>
//         <textarea
//           onChange={(e) => setInput(e.target.value)}
//           placeholder="Enter your code here"
//         />
//         <input
//           type="submit"
//           value={!isRunning ? "Run" : "Running..."}
//           disabled={isLoading || isRunning}
//           onClick={(e) => {
//             e.preventDefault();
//             runPython(input);
//           }}
//         />
//       </form>
//       <p>Output</p>
//       <pre>
//         <code>{stdout}</code>
//       </pre>
//       <p>Error</p>
//       <pre>
//         <code>{stderr}</code>
//       </pre>
//     </>
//   );
// }

function App() {
  const [currentTime, setCurrentTime] = useState(0);

  // useEffect(() => {
  //   fetch('/time').then(res => res.json()).then(data => {
  //     setCurrentTime(data.time);
  //   });
  // }, []);

  useEffect(() => {
    fetch('/api').then(response => {
      if (response.status == 200) {
        return response.json()
      }
    }).then(data => console.log(data))
      .then(error => console.log(error))
  }, [])



  const NAVIGATION = [
    {
      kind: 'header',
      title: 'Main items',
    },
    {
      segment: 'dashboard',
      title: 'Dashboard',
      icon: <DashboardIcon />,
    },
    {
      segment: 'orders',
      title: 'Orders',
      icon: <ShoppingCartIcon />,
    },
    {
      kind: 'divider',
    },
    {
      kind: 'header',
      title: 'Analytics',
    },
    {
      segment: 'reports',
      title: 'Reports',
      icon: <BarChartIcon />,
      children: [
        {
          segment: 'sales',
          title: 'Sales',
          icon: <DescriptionIcon />,
        },
        {
          segment: 'traffic',
          title: 'Traffic',
          icon: <DescriptionIcon />,
        },
      ],
    },
    {
      segment: 'integrations',
      title: 'Integrations',
      icon: <LayersIcon />,
    },
  ];

  const demoTheme = extendTheme({
    colorSchemes: {
      light: {
        palette: {
          primary: { main: '#1976d2' },
        },
      },
    },
  });

  function useDemoRouter(initialPath) {
    const [pathname, setPathname] = React.useState(initialPath);

    const router = React.useMemo(() => {
      return {
        pathname,
        searchParams: new URLSearchParams(),
        navigate: (path) => setPathname(String(path)),
      };
    }, [pathname]);

    return router;
  }

  const Skeleton = styled('div')(({ theme, height }) => ({
    backgroundColor: theme.palette.action.hover,
    borderRadius: theme.shape.borderRadius,
    height,
    content: '" "',
  }));

  const DashboardLayoutBasic = (props) => {
    const { window } = props;

    const router = useDemoRouter('/dashboard');

    // Remove this const when copying and pasting into your project.
    const demoWindow = window ? window() : undefined;

    return (
      <AppProvider
        navigation={NAVIGATION}
        router={router}
        theme={demoTheme}
        window={demoWindow}
      >
        <DashboardLayout>
          <PageContainer>
            <Grid container spacing={1}>
              <Grid size={5} />
              <Grid size={12}>
                <Skeleton height={14} />
              </Grid>
              <Grid size={12}>
                <Skeleton height={14} />
              </Grid>
              <Grid size={4}>
                <Skeleton height={100} />
              </Grid>
              <Grid size={8}>
                <Skeleton height={100} />
              </Grid>

              <Grid size={12}>
                <Skeleton height={150} />
              </Grid>
              <Grid size={12}>
                <Skeleton height={14} />
              </Grid>

              <Grid size={3}>
                <Skeleton height={100} />
              </Grid>
              <Grid size={3}>
                <Skeleton height={100} />
              </Grid>
              <Grid size={3}>
                <Skeleton height={100} />
              </Grid>
              <Grid size={3}>
                <Skeleton height={100} />
              </Grid>
            </Grid>
          </PageContainer>
        </DashboardLayout>
      </AppProvider>
    );
  }
  return (
    <div className="container-fluid">

      <h2> GENERATE INPUT GROUND MOTIONS FOR NUMERICAL ANALYSES </h2>
      A web application for the development of input ground motions for the numerical evaluation of structures in engineering practice    <hr />
      <Navbar></Navbar>
      <Application />

      <br></br>
      <br></br>

      <img src={Illustration} alt="Illustration" width='100%'></img>

      <br></br>
      <br></br>

      <hr />

      <font size="2">

        <h5>Acknowledgements</h5>

        <p>This webtool uses the pyStrata python package (Kottke, 2019) to conduct site response calculations. We thank Dr. Albert R. Kottke for his support with pyStrata during the development of this project.</p>

        <p> The development of this webtool was funded under agreement No. 1020-007 between UC Davis and the Department of Conservation for the California Strong Motion Instrumentation Program (CSMIP) Data
          Interpretation Project “Broadening the Utilization of CSMIP Data: Double Convolution Methodology Towards Developing Input Motions for Site Response and Nonlinear Deformation Analyses.”
          Any opinions, findings, conclusions, or recommendations expressed herein are those of the authors and do not necessarily represent the views of this organization.</p>

        <h5>Contact</h5>

        <p> We appreciate hearing from users, so please do send us an email (skssinha at ucdavis.edu, rpretell at ucdavis.edu, or kziotopoulou at ucdavis.edu) and
          let us know about your applications and experiences. Interested readers are referred to the below publications for details about the background and applications. </p>


        <h5>References</h5>
        <ul>
          <li>Pretell R., Sinha S.K., Ziotopoulou K., and Watson-Lamprey J.A. (2021). <i> Broadening the utilization of CSMIP data: Double convolution methodology towards developing input motions for site response and nonlinear deformation analyses.</i> In Proceedings of SMIP 2021 Seminar on Utilization of Strong-Motion Data (SMIP21), California Geological Survey. (<a target="_blank" href="https://www.conservation.ca.gov/cgs/Documents/Program-SMIP/Seminar/SMIP21-P1-Paper-by-Ziotopoulou-a11y.pdf">pdf</a>)</li>
          <li>Pretell R., Ziotopoulou K., and Abrahamson N. (2019). <i> Methodology for the development of input motions for nonlinear deformation analyses</i>. In Proceedings of 7<sup>th</sup> International Conference on Earthquake Geotechnical Engineering (ICEGE), Rome, Italy. (<a target="_blank" href="https://www.issmge.org/uploads/publications/59/104/ch507.pdf">pdf</a>) </li>
        </ul>

      </font>

    </div>
  );
}



// return (
//   <div className="App">
//     <header className="App-header">
//   <img src={logo} className="App-logo" alt="logo" />
//       <p>
//         Edit <code>src/App.js</code> and save to reload.
//       </p>
//       <p>The current time is {currentTime}.</p>
//       <p>Tabs Demo</p>
//       <Tabs defaultActiveKey="profile" id="uncontrolled-tab-example">
//         <Tab eventKey="home" title="Home">
//         </Tab>
//         <Tab eventKey="profile" title="Profile">
//         </Tab>
//         <Tab eventKey="contact" title="Contact" disabled>
//         </Tab>
//       </Tabs>
//       <Button variant="primary"> Bootstrap </Button>
//     </header>
//   </div>
// );
// }

export default App;