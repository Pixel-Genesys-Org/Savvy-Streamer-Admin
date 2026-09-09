import { motion } from "framer-motion";

const ComingSoon = () => {
  return (
    <div className="flex min-h-[60vh] items-center justify-center px-4">
      <motion.div
        initial={{ opacity: 0, scale: 0.96 }}
        animate={{ opacity: 1, scale: 1 }}
        className="glass-panel glow-border max-w-xl rounded-3xl px-6 py-12 text-center sm:px-10"
      >
        <p className="font-heading gradient-text mb-4 text-4xl font-extrabold sm:text-6xl">
          Coming Soon
        </p>
        <p className="text-base text-muted sm:text-xl">
          We're working hard to bring you a fresh experience. Sit tight — it’ll be worth the wait.
        </p>
      </motion.div>
    </div>
  );
};

export default ComingSoon;
