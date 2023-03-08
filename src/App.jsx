import React, { useState } from 'react';
import 'scss/site.scss'
import Header from 'common-components/Layout/Header';
import SideBar from 'common-components/Layout/SideBar';
import Content from 'common-components/Layout/Content';
import { PageSettings } from 'config/page-settings.js';
import { Box, useMediaQuery, useTheme, Toolbar } from "@mui/material";
import { BrowserRouter } from 'react-router-dom';

function App() {

  const theme = useTheme()
  const isXsDevices = useMediaQuery(theme.breakpoints.down('sm'));
  const isSmDevices = useMediaQuery(theme.breakpoints.between('sm', 'md'));
  const isMdDevices = useMediaQuery(theme.breakpoints.between('md', 'lg'));
  const isLgDevices = useMediaQuery(theme.breakpoints.between('lg', 'xl'));
  const isXlDevices = useMediaQuery(theme.breakpoints.up('xl'));

  const setAllPageOptions = (value) => {
    setPageOptions(
        pageOptions =>
        ({
            ...pageOptions,
            pageHeader: value,
            pageSidebar: value,
            pageContentFullWidth: !value,
        })
    );
  }
   
  const [pageOptions, setPageOptions] = useState({
    setAllPageOptions: setAllPageOptions,
    setOptions: (option, value) => { setOptions(option, value) },
    setMultipleOptions: (options) => { setMultipleOptions(options) },
    isXsDevices,
    isSmDevices,
    isMdDevices,
    isLgDevices,
    isXlDevices,
    showLoadingScreen: false
  });

  const setOptions = (option, value) => {
      let tempOptions = pageOptions;
      tempOptions[option] = value;
      setPageOptions({ ...pageOptions });
  };

  const setMultipleOptions = (options) => {
      setPageOptions(pageOptions => ({
          ...pageOptions,
          ...options
      }));
  }

  return (
    <PageSettings.Provider value={pageOptions}>
      <Box sx={{width:'100%', height:'100%'}}>
        <Header/>
        <Box sx={{width:'100%', height:'100%', display:'flex'}}>
          <SideBar/>
          <Box display='flex' flexDirection='column' flex={1}>
            <Toolbar/>
            <Content/>
          </Box>
        </Box>
      </Box>
    </PageSettings.Provider>
  )
}

export default App;