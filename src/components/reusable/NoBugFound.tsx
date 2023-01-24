import astro from "../../assets/lotties/astro.json";
import Lottie from "lottie-react";

const NoBugFound = (props: { text: string }) => {
  return (
    <>
      <Lottie
        animationData={astro}
        loop={true}
        className="sm:w-1/2 md:w-2/5 m-auto my-10"
      />
      <p className="text-center">
        No bugs found, {props.text} a bug to display it here
      </p>
    </>
  );
};

export default NoBugFound;
