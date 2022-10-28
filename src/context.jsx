import React, { useContext, useState } from "react";



const AppContext = React.createContext()

export const AppProvider = ({ children }) => {
    const [modaldata, setmodalData] = useState({})
    const [isopenModal, setIsOpenModal] = useState(false)

    const openModal = (text) => {
        setIsOpenModal(true)
        setmodalData(text)
    }
    const closeModal = () => {
        setIsOpenModal(false)
    }

    return <AppContext.Provider value={{ isopenModal, openModal, closeModal, modaldata, setmodalData }} >{children}</AppContext.Provider>
}

export const useGlobalContext = () => {
    return useContext(AppContext)
}