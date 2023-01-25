import { useEffect, useState } from "react";
import ListTile from "../reusable/ListTile";
import { connect } from "react-redux";
import {
  bugAdded,
  bugRemoved,
  bugResolved,
  getAllBugs,
} from "../../redux/actions/bugActions";
import Bug from "../../models/bug";
import NoBugFound from "../reusable/NoBugFound";

const Home = (props: any) => {
  const { bugs, addBug, removeBug, resolveBug, getAllBugs } = props;
  const items: Bug[] = bugs;

  const [itemName, setItemName] = useState("");
  const [error, setError] = useState("");
  useEffect(() => {
    if (props.auth.user && props.auth.user.uid) {
      getAllBugs(props.auth.user.uid);
    }
  });

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (itemName === "") return;
    if (props.auth.user && props.auth.user.uid) {
      addBug(itemName, props.auth.user.uid);
      setItemName("");
    } else {
      setError("Please login to create a bug");
    }
  };

  const handleRemove = (id: string) => {
    removeBug(id);
  };

  const handleResolve = (id: string) => {
    resolveBug(id);
  };

  return (
    <>
      <blockquote className="text-2xl font-semibold italic text-center my-12 mx-5">
        “Experience is the name &nbsp;
        <span className="before:block before:absolute before:-inset-1 before:-skew-y-3 before:bg-yellow-500 relative inline-block">
          <span className="relative mx-2">everyone</span>
        </span>
        &nbsp; gives to their mistakes.” – Oscar Wilde
      </blockquote>

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
      {error && <div className="text-red-500 text-center">{error}</div>}
      {items.length === 0 ? (
        <NoBugFound text="add" />
      ) : (
        // <p className="text-center">No bug yet!</p>
        <div className="mt-8 grid sm:grid-cols-2 md:grid-cols-3 gap-8">
          {items.map((bug: Bug) => {
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

const mapStateToProps = (state: any) => ({
  bugs: state.bugs.filter((bug: Bug) => bug.status === "created"),
  auth: state.auth,
});
const mapDispatchToProps = (dispatch: any) => {
  return {
    getAllBugs: (uid: string) => dispatch(getAllBugs(uid)),
    addBug: (title: string, uid: string) => {
      dispatch(bugAdded(title, uid));
    },
    removeBug: (id: string) => {
      dispatch(bugRemoved(id));
    },
    resolveBug: (id: string) => {
      dispatch(bugResolved(id));
    },
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(Home);
