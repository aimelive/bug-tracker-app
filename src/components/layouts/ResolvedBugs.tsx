import { connect } from "react-redux";
import Bug from "../../models/bug";
import { bugRemoved } from "../../redux/actions/bugActions";
import ListTile from "../reusable/ListTile";
import NoBugFound from "../reusable/NoBugFound";

const ResolvedBugs = (props: any) => {
  const { bugs, removeBug } = props;
  const items: any = bugs;
  return (
    <div className="text-center">
      <h1 className="text-2xl">We've got all resolved bugs here</h1>
      {items.length === 0 ? (
        <NoBugFound text="resolve"/>
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
    </div>
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
