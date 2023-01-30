import { motion } from "framer-motion";
import { useEffect } from "react";
import { connect } from "react-redux";
import { IsLoading } from "../../helpers/shared";
import Notification from "../../models/notification";
import { getAllNotifications } from "../../redux/actions/notificationActions";
import NotificationTile from "./NotificationTile";

const Notifications = (props: any) => {
  const { status, notifications } = props.notification as {
    status: IsLoading;
    notifications: Notification[];
  };

  useEffect(() => {
    if (props.user && props.user.uid) {
      props.getAllNotifications(props.user.uid);
    }
  });

  return (
    <motion.section
      initial={{ y: "-100vh" }}
      animate={{ y: 0 }}
      exit={{ y: "-100vh" }}
      transition={{ duration: 0.5 }}
      id="notifications"
    >
      <div className="container">
        <div className="text-2xl font-semibold my-3 font-sans">
          <p>Notifications</p>
        </div>
        {status === IsLoading.loading && props.user && props.user.uid ? (
          <p>Loading...</p>
        ) : null}
        {!props.user && (
          <motion.p
            initial={{ x: 0 }}
            animate={{
              x: [-10, 0, 10, 0, -10, 0, 10, 0, -10, 0, 10, 0, -10, 0, 10, 0],
            }}
            transition={{ delay: 0.5 }}
            className="text-center"
          >
            Sign in to see your notifications
          </motion.p>
        )}
        {status === IsLoading.failed ? <p>Something went wrong!</p> : null}
        <ul className="notifications">
          {notifications.map((notification, index) => {
            return (
              <li key={notification.id}>
                <NotificationTile notification={notification} index={index} />
              </li>
            );
          })}
        </ul>
      </div>
    </motion.section>
  );
};

const mapStateToProps = (state: any) => ({
  notification: state.notification,
  user: state.auth.user,
});

const mapDispatchToProps = (dispatch: any) => ({
  getAllNotifications: (uid: string) => dispatch(getAllNotifications(uid)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Notifications);
