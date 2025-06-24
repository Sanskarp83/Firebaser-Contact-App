import { AiOutlineClose } from 'react-icons/ai';
import { createPortal } from 'react-dom';

const Modal = ({ onClose, isOpen, children }) => {
  if (!isOpen) return null;

  return createPortal(
    <>
      {/* Backdrop */}
      <div
        
        className="fixed inset-0 bg-black bg-opacity-50 backdrop-blur-sm z-40"
      />

      {/* Modal Container */}
      <div className="fixed top-1/2 left-1/2 z-50 w-[90%] max-w-lg -translate-x-1/2 -translate-y-1/2 bg-white p-5 rounded-lg shadow-lg">
        <div className="flex justify-end">
          <AiOutlineClose
            onClick={onClose}
            className="text-2xl cursor-pointer"
          />
        </div>
        {children}
      </div>
    </>,
    document.getElementById('modal-root')
  );
};

export default Modal;
