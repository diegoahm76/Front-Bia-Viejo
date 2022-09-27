import React from 'react'
import ReactModal from 'react-modal'
import { useSelector } from 'react-redux'

const Modal = ({children, title}) => {
    const isModalActive = useSelector(state => state.modal.isModalActive)
  return (
    <ReactModal
            className="row max-vh-100 px-4"
            isOpen={isModalActive}
            parentSelector={() => document.getElementById("root")}
            style={{ overlay: { overflowY: "scroll", zIndex: "9999" } }}
          >
            <div className="col-lg-8 col-md-10 col-12 mx-auto bg-white">
              <h3 className="mt-3 mb-0 text-center mb-6">
                {title}
              </h3>
              {children}
            </div>
    </ReactModal>
  )
}

export default Modal
