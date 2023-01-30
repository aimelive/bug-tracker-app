import { motion } from "framer-motion";
import { connect } from "react-redux";
import { routeVariants } from "../../helpers/variants/routesVariants";
import Bug from "../../models/bug";
import { bugRemoved } from "../../redux/actions/bugActions";
import ListTile from "../reusable/ListTile";
import NoBugFound from "../reusable/NoBugFound";

const ResolvedBugs = (props: any) => {
  const { bugs, removeBug } = props;
  const items: any = bugs;
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
        <NoBugFound text="resolve" />
      ) : (
        <div className="mt-8 grid sm:grid-cols-2 md:grid-cols-3 gap-8">
          {items.map((bug: any) => {
            return (
              <ListTile
                bug={bug}
                key={bug.id}
                onDelete={() => removeBug(bug.id)}
              />
            );
          })}
        </div>
      )}
    </motion.div>
  );
};
const mapStateToProps = (state: any) => ({
  bugs: state.bugs.filter(
    (bug: Bug) => bug.resolved === true && bug.status === "created"
  ),
});
const mapDispatchToProps = (dispatch: any) => {
  return {
    removeBug: (id: string) => {
      dispatch(bugRemoved(id));
    },
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(ResolvedBugs);
