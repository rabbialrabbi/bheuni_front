import Swal from 'sweetalert2'

let confirmation = {

  'delete': (title = null, message = null) => {
    return Swal.fire({
      title: title || 'Are you sure !',
      text: message || 'Do you want to delete ?',
      showCancelButton: true,
      confirmButtonText: 'Delete',
      confirmButtonColor: '#cc1342',
    })
  },

  'general': (message = null) => {
    return Swal.fire({
      title: 'Are you sure !',
      text: message || 'Do you want to update ?',
      showCancelButton: true,
      confirmButtonText: 'Yes',
      confirmButtonColor: '#cc1342',
    })
  },

    'remove': (message = null) => {
        return Swal.fire({
            title: 'Are you sure !',
            text: message || 'Do you want to remove ?',
            showCancelButton: true,
            confirmButtonText: 'Remove',
            confirmButtonColor: '#cc1342',
        })
    },

  'message': (title = null, message = null) => {
    return Swal.fire(title, "", message)
  },

}


export default confirmation
