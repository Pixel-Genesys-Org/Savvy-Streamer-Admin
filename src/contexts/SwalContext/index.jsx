import { createContext, useContext } from 'react';
import Swal from 'sweetalert2';

const SwalContext = createContext();

const base_button_class = "h-[42px] cursor-pointer flex items-center justify-center rounded-md px-6 py-2 border-2 transition-all duration-200 text-sm "

export const SwalProvider = ({ children }) => {

    const confirm = async (options = {}) => {
        const result = await Swal.fire({
            title: options.title || 'Are you sure?',
            text: options.text || '',
            icon: options.icon || 'warning',
            showCancelButton: true,
            confirmButtonText: options.confirm_text || 'Yes, Confirm',
            cancelButtonText: options.cancel_text || 'Cancel',
            reverseButtons: true,
            customClass: {
                popup: "custom-swal",
                confirmButton: `${base_button_class} bg-red-500 text-white border-red-500 mx-1`,
                cancelButton: `${base_button_class} bg-gray-200 text-secondary border-gray-200 mx-1`,

            },
            buttonsStyling: false,
        })
        return result.isConfirmed
    }

    const acknowledge = async (options = {}) => {
        await Swal.fire({
            title: options.title || 'Success',
            text: options.text || '',
            icon: options.icon || 'success',
            imageUrl: options.image,
            imageHeight: 80,
            confirmButtonText: 'Okay',
            customClass: {
                popup: "custom-swal",
                confirmButton: `${base_button_class} bg-primary text-white border-primary`
            },
            buttonsStyling: false,
        })
    }

    return (
        <SwalContext.Provider value={{ confirm, acknowledge }}>
            {children}
        </SwalContext.Provider>
    )
}

export const useSwal = () => useContext(SwalContext);
