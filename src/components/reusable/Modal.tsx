import { AnimatePresence, motion } from "framer-motion";

const backdrop = {
  initial: {
    opacity: 0,
  },
  animate: {
    opacity: 1,
  },
};

const modalVariants = {
  initial: { y: "-100vh", opacity: 0 },
  animate: { y: "200px", opacity: 1, transition: { delay: 0.5 } },
};

const Modal = (props: {
  showModal: boolean;
  setShowModal: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
  const { showModal } = props;
  return (
    <AnimatePresence mode="wait">
      {showModal && (
        <motion.div
          variants={backdrop}
          animate="animate"
          initial="initial"
          exit="initial"
          className="fixed top-0 left-0 w-full h-full opacity-50 z-10 bg-blackOpacity"
        >
          <motion.div
            variants={modalVariants}
            className="max-w-sm my-0 mx-auto py-10 px-5 bg-white rounded-xl text-center"
          >
            <p className="font-bold text-slate-500">
              Bug deleted successfully!
            </p>
            <button
              onClick={() => props.setShowModal(false)}
              className="text-slate-500 border-slate-500 font-bold mt-5 border-2 py-2 px-4 rounded-full"
            >
              Close
            </button>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default Modal;
