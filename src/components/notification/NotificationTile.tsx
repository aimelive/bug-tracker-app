import { motion } from "framer-motion";
import moment from "moment";
import { cfl } from "../../helpers/shared";
import Notification from "../../models/notification";

const NotificationTile = (props: {
  notification: Notification;
  index: number;
}) => {
  return (
    <motion.div
      initial={{ x: "100vw" }}
      animate={{ x: 0 }}
      transition={{ duration: props.index / 3, delay: 0.5 }}
      className="flex flex-col space-y-2 m-4 p-4 bg-blue-900 rounded"
    >
      <p>
        {cfl("you")}&nbsp;
        {props.notification.content}
      </p>
      <p className="text-xs italic text-slate-400">
        {moment(props.notification.time).calendar()}
      </p>
    </motion.div>
  );
};

export default NotificationTile;
