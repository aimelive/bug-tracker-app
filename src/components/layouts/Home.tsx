import { useState } from "react";
import ListTile from "../reusable/ListTile";
import { connect } from "react-redux";
import {
  bugAdded,
  bugRemoved,
  bugResolved,
} from "../../redux/actions/bugActions";
import astro from "../../assets/lotties/astro.json";
import Lottie from "lottie-react";

const Home = (props: any) => {
  const { bugs, addBug, removeBug, resolveBug } = props;
  const items: any = bugs;
  const [itemName, setItemName] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (itemName === "") return;
    for (let i = 0; i < items.length; i++) {
      if (items[i] === itemName) {
        setError((e) => itemName + " Already exists");
        break;
      }
    }

    if (error === "") {
      addBug(itemName);
      setItemName("");
      setError("");
    }
  };

  const handleRemove = (id: number) => {
    removeBug(id);
  };

  const handleResolve = (id: number) => {
    resolveBug(id);
  };
  // “Experience is the name everyone gives to their mistakes.” – Oscar Wilde
  return (
    <>
      <blockquote className="text-2xl font-semibold italic text-center my-12 mx-5">
        “Experience is the name &nbsp;
        <span className="before:block before:absolute before:-inset-1 before:-skew-y-3 before:bg-yellow-500 relative inline-block">
          <span className="relative mx-2">everyone</span>
        </span>
        &nbsp; gives to their mistakes.” – Oscar Wilde
      </blockquote>
      {error && <p className="text-red">{error}</p>}
      <form className="add-form mb-8" onSubmit={(e) => handleSubmit(e)}>
        <div className="flex items-center justify-center">
          <input
            type="text"
            className="placeholder:italic placeholder:text-slate-400 block bg-white border border-slate-300 rounded-md py-2 px-3 shadow-sm focus:outline-none focus:border-yellow-500 focus:ring-yellow-200 focus:ring-1 sm:text-sm text-black w-full md:w-2/5"
            placeholder="Type bug here"
            name="itemName"
            value={itemName}
            onChange={(e) => setItemName(e.target.value)}
          />
          <button
            type="submit"
            className="flex items-center justify-evenly text-white bg-blue-900 px-4 md:px-8 py-2 border-y border-blue-900 text-sm rounded hover:bg-blue-600 transition ease-out duration-500"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-4 h-4 inline-block"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M12 9v6m3-3H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
            <span> &nbsp;Add </span>
          </button>
        </div>
      </form>
      {items.length === 0 ? (
        <Lottie
          animationData={astro}
          loop={true}
          className="sm:w-1/2 md:w-2/5 m-auto my-10"
        />
      ) : (
        // <p className="text-center">No bug yet!</p>
        <div className="mt-8 grid sm:grid-cols-2 md:grid-cols-3 gap-8">
          {items.map((bug: any) => {
            return (
              <ListTile
                bug={bug}
                key={bug.id}
                onResolve={() => handleResolve(bug.id)}
                onDelete={() => handleRemove(bug.id)}
              />
            );
          })}
        </div>
      )}
    </>
  );
};

const mapStateToProps = (state: any) => ({ bugs: state.bugs });
const mapDispatchToProps = (dispatch: any) => {
  return {
    addBug: (description: string) => {
      dispatch(bugAdded(description));
    },
    removeBug: (id: number) => {
      dispatch(bugRemoved(id));
    },
    resolveBug: (id: number) => {
      dispatch(bugResolved(id));
    },
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(Home);
