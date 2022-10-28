import { Button, Dialog, DialogTitle } from '@mui/material'
import React from 'react'
import { useGlobalContext } from '../../context'
import './modal.css'

const Modal = () => {
  const { isopenModal, closeModal, openModal, modaldata } = useGlobalContext()
  const selectedModal = modaldata[0]
  console.log("data in modal",modaldata)
  return (
    <div>
      {isopenModal &&
        <Dialog onClose={closeModal} open={isopenModal}>
            <section className='modal'>
          <div className="modal_header">
            <img className='modal_img' src={modaldata.links.mission_patch_small}></img>
            <div className='modal_header-right'>
            <h4 className='modal_title'>Name : {modaldata.mission_name}</h4>
            <p className="modal-rocketname">{modaldata.rocket.rocket_name}</p>
            </div>
          </div>
          <div className="modal_body">
            <div className="modal_left">
              <p>{modaldata.details}</p>
            </div>
            <div className="modal-right">
              <div className="id"><strong>Flight Number  </strong> <label htmlFor="">{modaldata.flight_number}</label></div>
              <div className="id"><strong>Mission Name  </strong> <label htmlFor="">{modaldata.mission_name}</label></div>
              <div className="id"><strong>Rocket Type </strong> <label htmlFor="">{modaldata.rocket.rocket_type}</label></div>
              <div className="id"><strong>Rocket Name  </strong><label htmlFor="">{modaldata.rocket.rocket_name}</label></div>
              <div className="id"><strong>Manufacturer  </strong><label htmlFor="">{modaldata.rocket.second_stage.payloads[0].manufacturer}</label></div>
              <div className="id"><strong>Nationality  </strong><label htmlFor="">{modaldata.rocket.second_stage.payloads[0].nationality}</label></div>
              <div className="id"><strong>Launch Date  </strong><label htmlFor="">{modaldata.launch_date_utc}</label></div>
              <div className="id"><strong>Payload Type  </strong><label htmlFor="">{modaldata.rocket.second_stage.payloads[0].payload_type}</label></div>
              <div className="id"><strong>Orbit  </strong><label htmlFor="">{modaldata.rocket.second_stage.payloads[0].orbit}</label></div>
              <div className="id"><strong>Launch Site  </strong><label htmlFor="">{modaldata.launch_site.site_name}</label></div>
            </div>
          </div>
            </section>
        </Dialog>
      }
    </div>
  )
}

export default Modal