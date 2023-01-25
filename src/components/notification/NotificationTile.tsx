import moment from "moment";
import React from "react";
import { cfl } from "../../helpers/shared";
import Notification from "../../models/notification";

const NotificationTile: React.FC<Notification> = (
  notification: Notification
) => {
  return (
    <div className="flex flex-col space-y-2 m-4 p-4 bg-blue-900 rounded">
      <p>
        {cfl("you")}&nbsp;
        {notification.content}
      </p>
      <p className="text-xs italic text-slate-400">
        {moment(notification.time).calendar()}
      </p>
    </div>
  );
};

export default NotificationTile;
