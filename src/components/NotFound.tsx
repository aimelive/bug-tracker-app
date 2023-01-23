import Lottie from "lottie-react";
import { Link } from "react-router-dom";
import not_found from "../assets/lotties/not_found.json";

const NotFound = () => {
  return (
    <section id="not-found">
      <div className="flex flex-col items-center">
        <Lottie
          animationData={not_found}
          loop={true}
          className="sm:w-1/2 md:w-2/5 m-auto my-10"
        />
        <p>The page you're looking for is not available.</p>
        <Link
          to="/"
          className="bg-blue-900 py-2 px-4 rounded-full my-4 text-white hover:bg-slate-400"
        >
          Go to Home
        </Link>
      </div>
    </section>
  );
};

export default NotFound;
