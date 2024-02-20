import { ToastContainer, Zoom } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

export default function Toast() {
  return (
    <ToastContainer
      position='top-right'
      autoClose={3000}
      hideProgressBar={true}
      newestOnTop={false}
      closeOnClick
      rtl={false}
      pauseOnFocusLoss
      draggable
      theme='light'
      transition={Zoom}
    />
  )
}
