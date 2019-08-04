import React, { Component } from 'react'
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import "react-tabs/style/react-tabs.css";
import VakaTable from './components/VakaTable'
import IstemTable from './components/IstemTable'
import VarlikTable from './components/VarlikTable'

export default class App extends Component {
  render() {
    
    return (
      <Tabs>
        <TabList>
          <Tab>Vaka</Tab>
          <Tab>Istem</Tab>
          <Tab>Varlık</Tab>
        </TabList>
  
        <TabPanel>
          <VakaTable />
        </TabPanel>
        <TabPanel>
          <IstemTable />
        </TabPanel>
        <TabPanel>
          <VarlikTable />
        </TabPanel>
    </Tabs>
       

    )
  }
}

