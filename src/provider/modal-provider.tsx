"use client"

import { createContext, FC, ReactNode, useContext, useEffect, useState } from "react"

type Props = {}

interface ModalProviderProps {
    children : ReactNode
}

export type ModalData = {}

type ModalContextType = {
    data : ModalData;
    isOpen : boolean;
    setOpen : (modal:ReactNode, formData?: ()=>Promise<any>)=>void;
    setClose : ()=>void;   
}

export const ModalContext = createContext<ModalContextType>({
    data : {},
    isOpen : false,
    setOpen : (modal: ReactNode, fetchData?: ()=>Promise<any>)=>{},
    setClose : ()=>{}
});

const ModalProvider : FC<ModalProviderProps> = ({children})=>{
    const [isOpen, setIsOpen] = useState(false);
    const [data, setData] = useState<ModalData>({});
    const [showingModal,setShowingModal] = useState<ReactNode>(null);
    const [isMounted, setIsMounted] = useState(false);  

    useEffect(()=>{
        setIsMounted(true)
    },[]);

    const setOpen = async (modal : ReactNode,
        fetchData?: ()=> Promise<any>
    )=>{
        if(modal){
            if(fetchData){
                setData({...data, ...(await fetchData())})
            }
            setShowingModal(modal);
            setIsOpen(true); 
        }

    }

    const setClose = ()=>{
        setIsOpen(false);
        setData({});
    }

    if(!isMounted){
        return null;
    }

    return <ModalContext.Provider value={{data, setOpen, setClose,isOpen}}>
        {children}
        {showingModal}
    </ModalContext.Provider>
}

export default ModalProvider



export const useModal = ()=>{
    const context = useContext(ModalContext);
    if(!context){
        throw new Error("useModal must be used within the modal provider.")
    }

    return context;
}