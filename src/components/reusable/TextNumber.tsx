import React from "react";
import { connect } from "react-redux";
import { MenuItem, MenuItemType } from "../layouts/Sidebar";

const TextCount: React.FC<MenuItem> = (props: any) => {
  const { type, bugs } = props;
  let len: number = 0;
  switch (type) {
    case MenuItemType.all:
      len = bugs.length;
      break;
    case MenuItemType.notifications:
      len = 0;
      break;
    case MenuItemType.resolved:
      len = bugs.filter((bug: any) => bug.resolved === true).length;
      break;
    default:
      len = 0;
      break;
  }
  if (len < 1) return <></>;
  else return <span>({len})</span>;
};
const mapStateToProps = (state: any) => ({
  bugs: state.bugs,
});
export default connect(mapStateToProps)(TextCount);
