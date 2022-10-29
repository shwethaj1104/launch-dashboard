import React, { useState } from 'react'
import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-alpine.css';
import './home.css';


import { useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import Table from '../table/Table';

const url = 'https://api.spacexdata.com/v3/launches'

const Home = () => {
    // const [launches, setLaunches] = useState([])
    const [rowData, setRowdata] = useState([])
    const [filteredRowData, setFilteredRowData] = useState([])
    const [dropdown, setDropdDown] = useState([])
    const navigate = useNavigate();
    const location = useLocation()

    const timeList = ['past 6 months']
    const launchFilterData = ['All Launches', 'Upcoming Launches', 'Successfull Launches', 'Failed Launches']
    
    let routerFilterBoolean=false;
    let routefilter =location.pathname;
    let routefilteredData ;

    if(routefilter !== undefined){
        routerFilterBoolean=true;
        const filteredData = filteredRowData.filter(val => {
            if (routefilter === "/upcoming-Launches") {
                return val.upcoming === true
            } else if (routefilter === "/succesfull-Launches") {
                return val.launch_success === true
            } else if (routefilter === "/failed-Launches") {
                return val.launch_success === false
            } else {
                return val
            }
        })
        routefilteredData = filteredData;

    }

    const fetchJobs = async () => {
        const response = await fetch(url);
        const newresponse = await response.json();
        // setLaunches(newresponse)
        setRowdata(newresponse)
        setFilteredRowData(newresponse)
    }

    useEffect(() => {
        fetchJobs()
    }, [])

    const handleChange = (e) => {
        setDropdDown(e.target.value);
        const filteredData = filteredRowData.filter(val => {
            if (e.target.value === 'Upcoming Launches') {
                navigate("/upcoming-Launches")
                return val.upcoming === true
            } else if (e.target.value === 'Successfull Launches') {
                navigate("/succesfull-Launches")
                return val.launch_success === true
            } else if (e.target.value === 'Failed Launches') {
                navigate("/failed-Launches")
                return val.launch_success === false
            } else {
                navigate("/")
                return val
            }
        })
        setRowdata(filteredData)
    }

    return (
        <section>
            <h1>SPACEX</h1><hr></hr>
            <div className="content">
                <div className="filter-section">
                    <select name="time" id="time">
                        {timeList.map(el => <option value={el} key={el}> {el} </option>)}
                    </select>
                    <select name="launchfilter" id="launchfilter"
                        value={dropdown}
                        onChange={handleChange}>
                        {launchFilterData.map(el => <option value={el} key={el}> {el} </option>)}
                    </select>
                </div>
                 {(routerFilterBoolean && rowData.length > 0) ? 
                    <Table rowData={routefilteredData}/>
                    : <div className='loader'></div>}
            </div>
        </section>
    )
}

export default Home