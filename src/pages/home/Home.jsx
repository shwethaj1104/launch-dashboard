import React, { useCallback, useRef, useState } from 'react'
import { AgGridReact } from 'ag-grid-react';
import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-alpine.css';


import { useEffect } from 'react';
import Modal from '../modal/Modal';
import { useGlobalContext } from '../../context';

const url = 'https://api.spacexdata.com/v3/launches'

const Home = () => {
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
    // const [loading, setLoading] = useState(true);
    const [launches, setLaunches] = useState([])
    const [rowData, setRowdata] = useState([])
    const gridRef = useRef();
    const {openModal, closeModal, isopenModal } = useGlobalContext()

    // const [value, setValue] = useState(0);
    const fetchJobs = async () => {
        const response = await fetch(url);
        const newresponse = await response.json();
        console.log("newJobs", newresponse)
        setLaunches(newresponse)
        setRowdata(newresponse)
    }

    useEffect(() => {
        fetchJobs()
    }, [])
    const defaultColDef = {
        resizable: true,
        sortable: true,
    }
    const timeList = ['past month', 'past 6 months']
    const launchFilterData = ['All Launches', 'Upcoming Launches', 'Successfull Launches', 'Failed Launches']
    const onSelectionChanged = useCallback(() => {
        const selectedRows = gridRef.current.api.getSelectedRows();
        console.log("selected...", selectedRows)
        openModal(selectedRows[0])
    }, []);
    const handleClose = () => {
        closeModal()
    };
    return (
        <section>
            <h1>SPACEX</h1>
            <div className="filter">
                <select name="time" id="time">
                    {timeList.map(el => <option value={el} key={el}> {el} </option>)}
                </select>
                <select name="launchfilter" id="launchfilter">
                    {launchFilterData.map(el => <option value={el} key={el}> {el} </option>)}
                </select>
            </div>
            <div className="ag-theme-alpine">
                <AgGridReact rowData={rowData} columnDefs={columnDefs}
                    defaultColDef={defaultColDef} paginationAutoPageSize={true}
                    pagination={true}
                    rowSelection={'single'}
                    onSelectionChanged={onSelectionChanged}
                    ref={gridRef}
                ></AgGridReact>
            </div>
            <Modal
                open={isopenModal}
                onClose={handleClose}
            />
        </section>
    )
}

export default Home