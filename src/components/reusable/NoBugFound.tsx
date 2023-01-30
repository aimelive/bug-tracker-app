import astro from "../../assets/lotties/astro.json";
import Lottie from "lottie-react";
import { motion } from "framer-motion";

const NoBugFound = (props: { text: string }) => {
  return (
    <motion.div
      initial={{ opacity: 0.2, scale: 0.7 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 1.5 }}
    >
      <Lottie
        animationData={astro}
        loop={true}
        className="sm:w-1/2 md:w-2/5 m-auto my-10"
      />
      <p className="text-center">
        No bugs found, {props.text} a bug to display it here
      </p>
    </motion.div>
  );
};

export default NoBugFound;
