import React from "react";
import { connect } from "react-redux";
import Bug from "../../models/bug";
import { MenuItem, MenuItemType } from "../layouts/Sidebar";

const TextCount: React.FC<MenuItem> = (props: any) => {
  const { type, bugs, notifications } = props;
  let len: number = 0;
  switch (type) {
    case MenuItemType.all:
      len = bugs.filter((bug: Bug) => bug.status === "created").length;
      break;
    case MenuItemType.notifications:
      len = notifications.length;
      break;
    case MenuItemType.resolved:
      len = bugs.filter(
        (bug: Bug) => bug.resolved === true && bug.status === "created"
      ).length;
      break;
    case MenuItemType.trash:
      len = bugs.filter((bug: Bug) => bug.status === "deleted").length;
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
  notifications: state.notification.notifications,
});
export default connect(mapStateToProps)(TextCount);
