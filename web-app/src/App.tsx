
import React from "react";
import { Box, CssBaseline, ThemeProvider, Tabs, Tab } from "@mui/material";
import { createTheme } from "@mui/material/styles";
import { MemoryRouter, Routes, Route } from "react-router-dom";
import { routes as appRoutes } from "./routes";
import HomeIcon from '@mui/icons-material/Home';
import CategoryIcon from '@mui/icons-material/Category';
import PersonIcon from '@mui/icons-material/Person';
import TabPanel from '@mui/lab/TabPanel';
import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';

import Home from "./pages/Home";
import About from "./pages/About";
import Products from "./pages/Products";


function App() {

  const handleChange = (event: React.SyntheticEvent, newValue: string) => {
    setValue(newValue);
  };
  const [value, setValue] = React.useState('0');


  // componentdidmount
  React.useEffect(() => {
    console.log("App componentdidmount");

    const ver = window.hybridge.getAppVersion();
    console.log("App version", ver);

  }, []);

  // define theme
  const theme = createTheme({
    palette: {
      primary: {
        light: "#63b8ff",
        main: "#0989e3",
        dark: "#005db0",
        contrastText: "#000",
      },
      secondary: {
        main: "#4db6ac",
        light: "#82e9de",
        dark: "#00867d",
        contrastText: "#000",
      },
    },
  });

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <TabContext value={value}>
        <Box height="100vh" display="flex" flexDirection="column-reverse">
          {/* <MemoryRouter
          initialEntries={[
            '/'
          ]}>
          <Routes>
            {appRoutes.map((route) => (
              <Route
                key={route.key}
                path={route.path}
                element={<route.component />}
              />
            ))}
          </Routes>
        </MemoryRouter> */}


          <TabList onChange={handleChange} variant="fullWidth">
            <Tab icon={<HomeIcon />} label="Home" value="0" />
            <Tab icon={<CategoryIcon />} label="Product" value={'1'} />
            <Tab icon={<PersonIcon />} label="Mine" value={'2'} />
          </TabList>

          <Box sx={{ display: 'flex', height: '100vh', alignContent: 'center', textAlign: 'center', alignItems: 'center' }}>
            <TabPanel value={'0'}>
              <Home></Home>
            </TabPanel>


            <TabPanel value={'1'}>
              <Products></Products>
            </TabPanel>

            <TabPanel value={'2'}>
              <About></About>
            </TabPanel>
          </Box>


        </Box>
      </TabContext>
    </ThemeProvider>
  );
}

export default App;