import { AnimatePresence, motion } from "framer-motion";
import { X } from "lucide-react";

const backdrop = {
  hidden: { opacity: 0 },
  visible: { opacity: 1 },
  exit: { opacity: 0 },
};

const slide_from_top = {
  hidden: {
    y: "-40vh",
    opacity: 0,
    scale: 0.96,
  },
  visible: {
    y: 0,
    opacity: 1,
    scale: 1,
    transition: { type: "spring", damping: 25, stiffness: 300 },
  },
  exit: {
    y: "-20vh",
    opacity: 0,
    transition: { duration: 0.2 },
  },
};

const Modal = ({ open, title, children, footer, onClose }) => {
  return (
    <AnimatePresence>
      {open && (
        <motion.div
          className="fixed inset-0 z-50 flex items-start justify-center overflow-y-auto bg-black/60 px-4 pt-10 backdrop-blur-sm"
          variants={backdrop}
          initial="hidden"
          animate="visible"
          exit="exit"
        >
          <motion.div
            variants={slide_from_top}
            initial="hidden"
            animate="visible"
            exit="exit"
            className="glass-panel glow-border flex w-full max-w-4xl flex-col overflow-hidden rounded-3xl"
            style={{ minHeight: "200px", maxHeight: "90vh" }}
          >
            <div className="sticky top-0 z-10 flex items-center justify-between border-b border-white/10 bg-surface/90 px-5 py-4 sm:px-6">
              <h2 className="font-heading text-lg font-semibold text-white sm:text-xl">{title}</h2>
              <button type="button" onClick={onClose} aria-label="Close" className="cursor-pointer">
                <X className="h-5 w-5 cursor-pointer text-muted transition hover:text-white" />
              </button>
            </div>
            <div className="overflow-y-auto p-5 sm:p-6">{children}</div>
            {footer && (
              <div className="sticky bottom-0 flex justify-end gap-2 border-t border-white/10 bg-surface/90 px-5 py-4 sm:px-6">
                {footer}
              </div>
            )}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default Modal;
