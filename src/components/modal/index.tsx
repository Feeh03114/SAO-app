/* eslint-disable @typescript-eslint/no-empty-function */
import { Dialog, Transition } from "@headlessui/react";
import { Fragment, ReactNode } from "react";
import { IconType } from "react-icons";
import { BsFillPersonPlusFill } from "react-icons/bs";

export interface RegisterModelProps {
    isOpen: boolean;
    onClose: () => void;
    children?: React.ReactNode;
    width?: string;
}

function ModalRoot({ isOpen, onClose, children, width }:RegisterModelProps): JSX.Element {
    return(
        <Transition.Root show={isOpen} as={Fragment}>
            <Dialog as="div" className="relative z-10" onClose={onClose}>
            <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0"
                enterTo="opacity-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100"
                leaveTo="opacity-0"
            >
                <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity"/>
            </Transition.Child>
    
            <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
                <div className="flex min-h-full items-center justify-center p-4 md:items-center md:p-0">
                <Transition.Child
                    as={Fragment}
                    enter="ease-out duration-300"
                    enterFrom="opacity-0 translate-y-4 md:translate-y-0 md:scale-95"
                    enterTo="opacity-100 translate-y-0 md:scale-100"
                    leave="ease-in duration-200"
                    leaveFrom="opacity-100 translate-y-0 md:scale-100"
                    leaveTo="opacity-0 translate-y-4 md:translate-y-0 md:scale-95"
                >
                    <Dialog.Panel className={`p-6 mx-4 mt-4 relative transform rounded-lg bg-white dark:bg-gray-800 text-left shadow transition-all w-full ${width} h-full`}>
                        {children}
                    </Dialog.Panel>
                </Transition.Child>
                </div>
            </div>
            </Dialog>
        </Transition.Root>
    );
}

interface HeaderProps {
    icon: IconType;
    title: string;
}

const headerModal= ({title, icon:Icon=BsFillPersonPlusFill}:HeaderProps)=>{
    return(
        <div className="w-full inline-flex space-x-4 items-center justify-start mb-6">
            <div className="flex items-center justify-center w-10 h-full p-2 bg-teal-50 dark:bg-teal-400 rounded-full">
                <Icon className="flex-1 h-full text-teal-500 dark:text-teal-700"/>
            </div>
            <p className="text-base font-semibold leading-6 text-gray-900 dark:text-white">{title}</p>
        </div>
    )
}

interface ModalBodyProps {
    children: ReactNode;
}

const ModalBody = ({children}: ModalBodyProps) => {
    return(
        <div className="w-full space-y-4 overflow-y-auto flex flex-wrap">
            {children}
        </div>
    )
}

const ModalFooter = () => {
    return(
        <div className="w-full inline-flex space-x-3 mt-4 items-center justify-end px-6 py-3 bg-white dark:bg-gray-800 rounded-b-lg" >
            <button className="flex items-center justify-center px-4 py-2 bg-white shadow border rounded-md border-gray-300"
                // onClick={onClose}
            >
                <p className="text-sm font-medium leading-tight text-gray-700">Cancelar</p>
            </button>
            <button className="flex items-center justify-center px-4 py-2 bg-teal-500 shadow rounded-md"
                // disabled={isSubmitting}
                // onClick={handleStep}
            >
                <p className="text-sm font-medium leading-tight text-white">Cadastrar</p>
            </button>
        </div> 
    )
}

const Modal = {
    Root: ModalRoot,
    Header: headerModal,
    Body: ModalBody,
    Footer: ModalFooter
}

export default Modal;