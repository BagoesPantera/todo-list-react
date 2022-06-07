import Swal from "sweetalert2";
import withReactContent from 'sweetalert2-react-content'

import { clearState } from "../actions/todoAction";

// https://github.com/sweetalert2/sweetalert2-react-content#usage-example
const MySwal = withReactContent(Swal)

export const swalLoading = () => {
    MySwal.fire({
        title: 'Loading',
        allowEscapeKey: false,
        allowOutsideClick: false,
        didOpen: () => {
            MySwal.showLoading();
        }
    })
}

export function swalAlert(icon, text, dispatch) {
    console.log("masuk alert");
    MySwal.fire({
      icon,
      text,
      heightAuto: false,
    }).then((result) => {
        if ( dispatch != undefined ) {
            if (result.isConfirmed || result.isDismissed || result.isDenied) {
                dispatch(clearState());
            }
        }
        
    });
}

export function swalAlertAuth(icon, text, dispatch, clearError) {
    MySwal.fire({
      icon,
      text,
      heightAuto: false,
    }).then((result) => {
        if (result.isConfirmed || result.isDismissed || result.isDenied) {
            dispatch(clearError());
        }
    });
}

export const swalConfirmDelete = (id, dispatch, deleteTodo) => {

    MySwal.fire({
        title: 'Are you sure?',
        text: "You won't be able to revert this!",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes, delete it!'
    }).then((result) => {
        if (result.isConfirmed) {
            dispatch(deleteTodo(id));
            MySwal.fire(
                'Deleted!',
                'Your file has been deleted.',
                'success'
            )
        }
    })
}

export const swalClose = () => {
    MySwal.close();
}
