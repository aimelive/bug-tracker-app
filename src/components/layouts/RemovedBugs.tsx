import { connect } from "react-redux";
import Bug from "../../models/bug";
import { bugRemovedForever, bugRestored } from "../../redux/actions/bugActions";
import NoBugFound from "../reusable/NoBugFound";
import TrashListTile from "../reusable/TrashListTile";

const RemovedBugs = (props: any) => {
  const { bugs, deleteBug, restoreBug } = props;
  const items: Bug[] = bugs;

  return (
    <div className="text-center">
      <h1 className="text-2xl">We've got all removed bugs here</h1>
      {items.length === 0 ? (
        <NoBugFound text="delete"/>
      ) : (
        <div className="mt-8 grid sm:grid-cols-2 md:grid-cols-3 gap-8">
          {items.map((bug: any) => {
            return (
              <TrashListTile
                bug={bug}
                key={bug.id}
                onRestore={() => restoreBug(bug.id)}
                onDelete={() => deleteBug(bug.id)}
              />
            );
          })}
        </div>
      )}
    </div>
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
