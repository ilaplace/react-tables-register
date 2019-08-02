import React, { Component } from 'react'
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import "react-tabs/style/react-tabs.css";
import Table from './components/Table'

export default class App extends Component {
  render() {
    
    return (
      <Tabs>
      <TabList>
        <Tab>Title 1</Tab>
          
        <Tab>Title 2</Tab>
        <Tab>Title 3</Tab>
      </TabList>
  
      <TabPanel>
        <Table/>
      </TabPanel>
      <TabPanel>
         <Table/>
      </TabPanel>
      <TabPanel>
        <Table />
      </TabPanel>
    </Tabs>
       

    )
  }
}

