import React, { Component } from 'react'
import ReactTable from "react-table";
import "react-table/react-table.css";
import { makeData } from "./utils";
import _ from "lodash";
const rawData = makeData();

const requestData = (pageSize, page, sorted, filtered) => {
    return new Promise((resolve, reject) => {
      
      // To Do: 
      // You can retrieve your data however you want, in this case, we will just use some local data.
      let filteredData = rawData;
  
      // You can use the filters in your request, but you are responsible for applying them.
      if (filtered.length) {
        filteredData = filtered.reduce((filteredSoFar, nextFilter) => {
          return filteredSoFar.filter(row => {
            return (row[nextFilter.id] + "").includes(nextFilter.value);
          });
        }, filteredData);
      }
      // You can also use the sorting in your request, but again, you are responsible for applying it.
      const sortedData = _.orderBy(
        filteredData,
        sorted.map(sort => {
          return row => {
            if (row[sort.id] === null || row[sort.id] === undefined) {
              return -Infinity;
            }
            return typeof row[sort.id] === "string"
              ? row[sort.id].toLowerCase()
              : row[sort.id];
          };
        }),
        sorted.map(d => (d.desc ? "desc" : "asc"))
      );
  
      // You must return an object containing the rows of the current page, and optionally the total pages number.
      const res = {
        rows: sortedData.slice(pageSize * page, pageSize * page + pageSize),
        pages: Math.ceil(filteredData.length / pageSize)
      };
  
      // simulate a server response with 500ms of delay.
      //setTimeout(() => resolve(res), 500);
      resolve(res);
    });
  };
  
export default class Table extends Component {
    constructor(){
        super()
        this.state={
            data: [],
            pages: null,
            loading: true
        };
        this.fetchData = this.fetchData.bind(this)
    }
    fetchData(state, instance) {
        // Whenever the table model changes, or the user sorts or changes pages, this method gets called and passed the current table model.
        // You can set the `loading` prop of the table to true to use the built-in one or show you're own loading bar if you want.
        this.setState({ loading: true });
        // Request the data however you want.  Here, we'll use our mocked service we created earlier
        requestData(
          state.pageSize,
          state.page,
          state.sorted,
          state.filtered
        ).then(res => {
          // Now just get the rows of data to your React Table (and update anything else like total pages or loading)
          this.setState({
            data: res.rows,
            pages: res.pages,
            loading: false
          });
        });
      }

    render() {
        const { data, pages, loading } = this.state;
        return (
          <div>
            <ReactTable
            //  React tables requires Columns prop, which is an array of objects containing the following properties
            // Accessor: eg. (row) => row.propertyName 
            // Id: A unique ID is required if the accessor is not a string or if you would like to override the column name used in server-side calls
            
              columns={[
                {
                  Header: "Açılış Tarihi",
                  accessor: "acilisTarihi"
                },
                {
                  Header: "Konu Özeti",
                  id: "konuOzeti",
                  accessor: d => d.konuOzeti
                },
                {
                  Header: "Durumu",
                  accessor: "durumu"
                },
                {
                  Header: "Destek Grubu",
                  accessor: "destekGrubu"
                },
                {
                  Header: "Atanan Kullanıcı",
                  accesor: "atananKullanici"
                },
                {
                  Header: "Servis",
                  accessor: "servis"
                },
                {
                  Header: "Takip Eden",
                  accessor: "takipeden"
                },
                {
                  Header: "Çözüm Bilgisi",
                  accessor: "cozumTarihi"
                },
                {
                  Header: "Çözüm Tarihi",
                  accessor: "cozumTarihi"
                }

              ]}
              manual // Forces table not to paginate or sort automatically, so we can handle it server-side
              data={data}
              pages={pages} // Display the total number of pages
              loading={loading} // Display the loading overlay when we need it
              onFetchData={this.fetchData} // Request new data when things change
              filterable
              defaultPageSize={10}
              className="-striped -highlight"
            />
            
          </div>
        );
      }
}
