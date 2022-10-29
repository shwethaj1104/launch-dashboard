import { AgGridReact } from 'ag-grid-react';
import React, { useCallback, useRef, useState } from 'react'
import { useGlobalContext } from '../../context';
import Modal from '../modal/Modal';
import './table.css';


const Table = ({ rowData }) => {

    const gridRef = useRef();
    const { openModal, closeModal, isopenModal } = useGlobalContext()

    const [columnDefs] = useState([
        { headerName: 'No:', field: 'flight_number', width: 80 },
        { headerName: 'Launched (UTC)', field: 'launch_date_utc', width: 210 },
        { headerName: 'Location', valueGetter: 'data.launch_site.site_name', width: 150 },
        { headerName: 'Mission', field: 'mission_name', width:300},
        { headerName: 'Orbit', valueGetter: 'data.rocket.second_stage.payloads[0].orbit', flex: 1 },
        { headerName: 'Launch Status', field: 'launch_success', 
        cellRenderer: params => {
            if(params.data.upcoming){return <p className='table-status upcoming'>Upcoming</p>}
            else if(params.data.launch_success){return <p className='table-status success'>Success</p>}
            else {return <p className='table-status failure'>Failed</p>}
        } },
        { headerName: 'Rocket', valueGetter: 'data.rocket.rocket_name', flex: 1 },
    ]);

    const defaultColDef = {
        resizable: true,
        sortable: true,
    }

    const onSelectionChanged = useCallback(() => {
        const selectedRows = gridRef.current.api.getSelectedRows();
        openModal(selectedRows[0])
    }, []);

    const handleClose = () => {
        closeModal()
    };

    return (
        <>
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
        </>

    )
}

export default Table