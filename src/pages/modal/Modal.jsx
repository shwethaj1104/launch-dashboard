import { Dialog } from '@mui/material'
import React from 'react'
import { useGlobalContext } from '../../context'
import './modal.css'
import YouTubeIcon from '@material-ui/icons/YouTube';
import LanguageIcon from '@material-ui/icons/Language';
import WbAutoIcon from '@material-ui/icons/WbAuto';

let status;
const Modal = () => {
  const { isopenModal, closeModal, openModal, modaldata } = useGlobalContext()
  
  if (modaldata.upcoming) { status = 'Upcoming' }
  else if (modaldata.launch_success) { status = 'Success' }
  else { status = 'Failure' }

  return (
    <div>
      {isopenModal &&
        <Dialog onClose={closeModal} open={isopenModal}>
          <section className='modal'>
            <div className="modal_header">
              <img className='modal_img' src={modaldata.links.mission_patch_small}></img>
              <div className='modal_header-right'>
                <div className="modal_header-rightSection">
                  <h4 className='modal_title'> {modaldata.mission_name}</h4>
                  {status === 'Upcoming' ? <p className='upcoming statusInfo'>{status}</p> :
                    <>
                      {status === 'Success' ? <p className='success statusInfo'>{status}</p> : <p className='failure statusInfo'>{status}</p>}
                    </>}
                  <button className='closeBtn' onClick={closeModal}>&#10005;</button>
                </div>
                <p className="modal-rocketname">{modaldata.rocket.rocket_name}</p>
                <div className='media-links'>
                  {modaldata.links.reddit_launch ? <a className='web-links' target="_blank" href={modaldata.links.reddit_launch}><LanguageIcon /></a> : <></>}
                  {modaldata.links.wikipedia ? <a className='web-links' target="_blank" href={modaldata.links.wikipedia}><WbAutoIcon /></a> : <></>}
                  {modaldata.links.video_link ? <a className='web-links' target="_blank" href={modaldata.links.video_link}><YouTubeIcon /></a> : <></>}
                </div>
              </div>
            </div>
            <div className="modal_body">
              <div className="modal_left">
                <p>{modaldata.details}</p>
                {modaldata.links.wikipedia ? <a className='wiki' target="_blank" href={modaldata.links.wikipedia}>Wikipedia</a> : <></>}
              </div>
              <div className="modal_right">
                <div className="modal-right_items">Flight Number  <label htmlFor="">{modaldata.flight_number}</label></div><hr></hr>
                <div className="modal-right_items">Mission Name  <label htmlFor="">{modaldata.mission_name}</label></div><hr></hr>
                <div className="modal-right_items">Rocket Type <label htmlFor="">{modaldata.rocket.rocket_type}</label></div><hr></hr>
                <div className="modal-right_items">Rocket Name <label htmlFor="">{modaldata.rocket.rocket_name}</label></div><hr></hr>
                <div className="modal-right_items">Manufacturer <label htmlFor="">{modaldata.rocket.second_stage.payloads[0].manufacturer}</label></div><hr></hr>
                <div className="modal-right_items">Nationality <label htmlFor="">{modaldata.rocket.second_stage.payloads[0].nationality}</label></div><hr></hr>
                <div className="modal-right_items">Launch Date <label htmlFor="">{modaldata.launch_date_utc}</label></div><hr></hr>
                <div className="modal-right_items">Payload Type <label htmlFor="">{modaldata.rocket.second_stage.payloads[0].payload_type}</label></div><hr></hr>
                <div className="modal-right_items">Orbit <label htmlFor="">{modaldata.rocket.second_stage.payloads[0].orbit}</label></div><hr></hr>
                <div className="modal-right_items">Launch Site <label htmlFor="">{modaldata.launch_site.site_name}</label></div>
              </div>
            </div>
          </section>
        </Dialog>
      }
    </div>
  )
}

export default Modal