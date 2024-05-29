import React, { Fragment, useRef } from "react";
import { Dialog, Transition } from "@headlessui/react";

const MainModal = ({ modalOpen, setModalOpen, children }) => {
  const closeModal = useRef();
  return (
    <Transition show={modalOpen}>
      <Dialog
        as="div"
        className="fixed inset-0 z-30 overflow-y-auto text-center"
        initialFocus={closeModal}
        onClose={() => setModalOpen(false)}
      >
        <div className="min-h-screen px-4">
          <Transition.Child as={Fragment}>
            <Dialog.Overlay className="fixed inset-0 bg-black opacity-60"></Dialog.Overlay>
          </Transition.Child>
          <span
            className="inline-block h-screen align-middle"
            aria-hidden={true}
          >
            &#8203;
          </span>
          <Transition.Child as={Fragment}>{children}
        
          </Transition.Child>
        </div>

      </Dialog>
    </Transition>
  );
};

export default MainModal;
