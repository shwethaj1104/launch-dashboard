// import { Button, Dialog, DialogTitle } from '@mui/material'
// import React from 'react'
// import { useGlobalContext } from '../../context'
// // import { useGlobalContext } from './context'

// const Modal = () => {
//   const { isopenModal, closeModal, openModal, modaldata } = useGlobalContext()
//   const selectedModal = modaldata[0]
//   return (
//     <div>
//       {isopenModal &&
//         <Dialog onClose={closeModal} open={isopenModal}>
//           <div className="modal_header">
//             <DialogTitle className='modal_title'>Name : name here</DialogTitle>
//           </div>
//           <div className="modal">
//             <div className="modal_left">
//               {/* <img className='modal_img' src={selectedModal.strDrinkThumb}></img> */}
//             </div>
//             {/* <div className="modal-right">
//               <div className="id"><strong>ID : </strong> <label htmlFor="">{selectedModal.idDrink}</label></div>
//               <div className="id"><strong>Is Alcoholic ? </strong> <label htmlFor="">{selectedModal.strAlcoholic}</label></div>
//               <div className="id"><strong>Category : </strong> <label htmlFor="">{selectedModal.strCategory}</label></div>
//               <div className="id"><strong>Glass : </strong><label htmlFor="">{selectedModal.strGlass}</label></div>
//               <div className="id"><strong>Ingredient 1 : </strong><label htmlFor="">{selectedModal.strIngredient1}</label></div>
//               <div className="id"><strong>Ingredient 2 : </strong><label htmlFor="">{selectedModal.strIngredient2}</label></div>
//               <div className="id"><strong>Ingredient 3 : </strong><label htmlFor="">{selectedModal.strIngredient3}</label></div>
//               <div className="id"><strong>Ingredient 4 : </strong><label htmlFor="">{selectedModal.strIngredient4}</label></div>
//               <div className="id"><strong>Instructions : </strong><label htmlFor="">{selectedModal.strInstructions}</label></div>
//               <div className="id"><strong>Measure : </strong><label htmlFor="">{selectedModal.strMeasure1}</label></div>
//               <div className="id"><strong>Creative Commons Confirmed ? </strong><label htmlFor="">{selectedModal.strCreativeCommonsConfirmed}</label></div>
//             </div> */}
//           </div>
//         </Dialog>
//       }
//     </div>
//   )
// }

// export default Modal