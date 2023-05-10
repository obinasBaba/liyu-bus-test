import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';

const Modal = ({
  show,
  children,
  showBackButton,
  closeModal,
  modalClassName = '',
  modalContainerClassName = '',
}) => {
  return (
    <>
      <div
        className={`fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity ${
          show ? '' : 'hidden'
        }`}
      ></div>
      <div
        class={`modal fixed w-full text-white h-full top-0 left-0 flex items-center justify-center ${
          show ? '' : 'hidden'
        } ${modalClassName}`}
      >
        <div
          class={`modal-container bg-[#1C1C1C] mx-auto rounded shadow-lg z-50 overflow-y-auto ${modalContainerClassName} w-max`}
        >
          {showBackButton && (
            <div
              className="w-full flex items-center justify-start mt-1"
              style={{ cursor: 'pointer' }}
            >
              <ChevronLeftIcon
                sx={{
                  color: '#FF6B1B',
                  fontSize: '20px',
                }}
              />
              <span className="text-white font-bold" onClick={closeModal}>
                Back
              </span>
            </div>
          )}
          <div class="modal-content pt-3" style={{ zIndex: 10000 }}>
            {children}
          </div>
        </div>
      </div>
    </>
  );
};

export default Modal;
