import { motion } from "framer-motion";
import { connect } from "react-redux";
import { routeVariants } from "../../helpers/variants/routesVariants";
import Bug from "../../models/bug";
import { bugRemovedForever, bugRestored } from "../../redux/actions/bugActions";
import NoBugFound from "../reusable/NoBugFound";
import TrashListTile from "../reusable/TrashListTile";

const RemovedBugs = (props: any) => {
  const { bugs, deleteBug, restoreBug, setShowModal } = props;
  const items: Bug[] = bugs;

  const handleDelete = (id: string) => {
    deleteBug(id);
    setShowModal(true);
  };

  return (
    <motion.div
      className="text-center"
      variants={routeVariants}
      initial="initial"
      animate="animate"
      exit="exit"
    >
      <motion.div
        initial={{ x: "-100vw" }}
        animate={{ x: 0 }}
        transition={{ type: "spring", stiffness: 120 }}
      >
        <h1 className="text-2xl">Removed Bugs</h1>
      </motion.div>
      {items.length === 0 ? (
        <NoBugFound text="delete" />
      ) : (
        <div className="mt-8 grid sm:grid-cols-2 md:grid-cols-3 gap-8">
          {items.map((bug: any) => {
            return (
              <TrashListTile
                bug={bug}
                key={bug.id}
                onRestore={() => restoreBug(bug.id)}
                onDelete={() => handleDelete(bug.id)}
              />
            );
          })}
        </div>
      )}
    </motion.div>
  );
};
const mapStateToProps = (state: any) => ({
  bugs: state.bugs.filter((bug: Bug) => bug.status === "deleted"),
});
const mapDispatchToProps = (dispatch: any) => {
  return {
    restoreBug: (id: string) => {
      dispatch(bugRestored(id));
    },
    deleteBug: (id: string) => {
      dispatch(bugRemovedForever(id));
    },
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(RemovedBugs);
