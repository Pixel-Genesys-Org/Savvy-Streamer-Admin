import { createContext, useContext } from 'react';
import Swal from 'sweetalert2';

const SwalContext = createContext();

const base_button_class = "h-[42px] cursor-pointer flex items-center justify-center rounded-full px-6 py-2 border transition-all duration-200 text-sm "

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
                confirmButton: `${base_button_class} bg-error text-white border-error mx-1`,
                cancelButton: `${base_button_class} bg-white/10 text-white border-white/10 mx-1`,

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
