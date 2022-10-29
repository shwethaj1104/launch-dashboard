import React, { useCallback, useRef, useState } from 'react'
import { AgGridReact } from 'ag-grid-react';
import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-alpine.css';
import './home.css';


import { useEffect } from 'react';
import Modal from '../modal/Modal';
import { useGlobalContext } from '../../context';
import { useNavigate } from 'react-router-dom';

const url = 'https://api.spacexdata.com/v3/launches'

const Home = () => {
    const [launches, setLaunches] = useState([])
    const [rowData, setRowdata] = useState([])
    const [filteredRowData, setFilteredRowData] = useState([])
    const [dropdown, setDropdDown] = useState([])
    const gridRef = useRef();
    const { openModal, closeModal, isopenModal } = useGlobalContext()
    const navigate = useNavigate();

    const timeList = ['past month', 'past 6 months']
    const launchFilterData = ['All Launches', 'Upcoming Launches', 'Successfull Launches', 'Failed Launches']

    const [columnDefs] = useState([
        { headerName: 'No:', field: 'flight_number', width: 100 },
        { headerName: 'Launched (UTC)', field: 'launch_date_utc', width: 210 },
        { headerName: 'Location', valueGetter: 'data.launch_site.site_name', width: 200 },
        { headerName: 'Mission', field: 'mission_name', flex: 1 },
        { headerName: 'Orbit', valueGetter: 'data.rocket.second_stage.payloads[0].orbit', flex: 1 },
        { headerName: 'Launch Status', field: 'launch_success', flex: 1 },
        { headerName: 'Upcoming ? ', field: 'upcoming', flex: 1 },
        { headerName: 'Rocket', valueGetter: 'data.rocket.rocket_name', flex: 1 },
    ]);


    const fetchJobs = async () => {
        const response = await fetch(url);
        const newresponse = await response.json();
        setLaunches(newresponse)
        setRowdata(newresponse)
        setFilteredRowData(newresponse)
    }

    const defaultColDef = {
        resizable: true,
        sortable: true,
    }

    useEffect(() => {
        fetchJobs()
    }, [])

    const onSelectionChanged = useCallback(() => {
        const selectedRows = gridRef.current.api.getSelectedRows();
        console.log("selected...", selectedRows)
        openModal(selectedRows[0])
    }, []);

    const handleClose = () => {
        closeModal()
    };

    const handleChange = (e) => {
        setDropdDown(e.target.value);
        const filteredData = filteredRowData.filter(val => {
            if (e.target.value === 'Upcoming Launches') {
                navigate("/upcoming-Launches")
                return val.upcoming == true
            } else if (e.target.value === 'Successfull Launches') {
                navigate("/succesfull-Launches")
                return val.launch_success == true
            } else if (e.target.value === 'Failed Launches') {
                navigate("/failed-Launches")
                return val.launch_success == false
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
                {rowData.length > 0 ?
                    <div className="ag-theme-alpine">
                        <AgGridReact rowData={rowData} columnDefs={columnDefs}
                            defaultColDef={defaultColDef} paginationAutoPageSize={true}
                            pagination={true}
                            rowSelection={'single'}
                            onSelectionChanged={onSelectionChanged}
                            ref={gridRef}
                        ></AgGridReact>
                    </div> : <div className='loader'></div>
                }
            </div>
            <Modal
                open={isopenModal}
                onClose={handleClose}
            />
        </section>
    )
}

export default Home