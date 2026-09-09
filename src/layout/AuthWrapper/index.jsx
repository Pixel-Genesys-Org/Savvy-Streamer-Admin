import { motion } from "framer-motion";
import { memo } from "react";
import { images } from "../../assets";

const AuthWrapper = ({ children, title = "Title", subtitle = "Subtitle" }) => {
  return (
    <div className="relative flex min-h-screen items-center justify-center overflow-hidden bg-secondary px-4 py-10">
      <div className="ambient-orb top-[-140px] left-[-80px] h-80 w-80 bg-primary/30 animate-pulse-slow" />
      <div className="ambient-orb right-[-100px] bottom-[-140px] h-96 w-96 bg-cyan/20 animate-pulse-slow" />
      <div className="ambient-orb top-1/2 left-1/2 h-64 w-64 -translate-x-1/2 -translate-y-1/2 bg-deep/50 animate-pulse-slow" />

      <motion.div
        initial={{ opacity: 0, y: 24, scale: 0.98 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.45, ease: "easeOut" }}
        className="glass-panel glow-border relative w-full max-w-md overflow-hidden rounded-3xl"
      >
        <div className="px-6 pt-8 pb-4 text-center sm:px-8">
          <motion.img
            src={images.logo}
            alt="Savvy Streamer"
            className="mx-auto mb-6 h-16 object-contain sm:h-20"
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
          />
          <h2 className="font-heading text-2xl font-bold text-white sm:text-3xl">{title}</h2>
          <p className="mt-2 text-sm text-muted">{subtitle}</p>
        </div>
        <div className="px-6 pb-6 sm:px-8 sm:pb-8">{children}</div>
        <div className="px-8 pb-6 text-center text-sm text-white/40">
          © {new Date().getFullYear()} Savvy Streamer. All rights reserved.
        </div>
      </motion.div>
    </div>
  );
};

export default memo(AuthWrapper);
