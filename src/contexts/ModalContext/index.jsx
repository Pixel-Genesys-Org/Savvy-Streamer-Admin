import { createContext, useContext, useState } from "react";
import Modal from "../../components/Wrappers/Modal";

const ModalContext = createContext();

export const ModalProvider = ({ children }) => {

    const [modal, setModal] = useState({
        open: false,
        title: "",
        content: null,
        footer: null,
    });

    const open = (title, content, footer) => {
        setModal({ open: true, title, content, footer });
    };

    const close = () => {
        setModal({ ...modal, open: false });
    };

    return (
        <ModalContext.Provider value={{ open, close }}>
            {children}
            <Modal open={modal.open} title={modal.title} footer={modal.footer} onClose={close}>
                {modal.content ?? null}
            </Modal>
        </ModalContext.Provider>
    );
};

export const useModal = () => useContext(ModalContext);