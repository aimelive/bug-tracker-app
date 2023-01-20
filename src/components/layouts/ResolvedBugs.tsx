import { connect } from "react-redux";
import { bugRemoved } from "../../redux/actions/bugActions";
import ListTile from "../reusable/ListTile";

const ResolvedBugs = (props: any) => {
  const { bugs, removeBug } = props;
  const items: any = bugs;
  return (
    <div className="text-center">
      <h1 className="text-2xl">We've got all resolved bugs here</h1>
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
    </div>
  );
};
const mapStateToProps = (state: any) => ({
  bugs: state.bugs.filter((bug: any) => bug.resolved === true),
});
const mapDispatchToProps = (dispatch: any) => {
  return {
    removeBug: (id: number) => {
      dispatch(bugRemoved(id));
    },
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(ResolvedBugs);
