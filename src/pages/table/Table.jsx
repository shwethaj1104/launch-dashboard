import { AgGridReact } from 'ag-grid-react';
import React, { useCallback, useRef, useState } from 'react'
import { useGlobalContext } from '../../context';
import Modal from '../modal/Modal';

const Table = ({ rowData }) => {
    
    const gridRef = useRef();
    const { openModal, closeModal, isopenModal } = useGlobalContext()

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