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
    <section id="notifications">
      <div className="container">
        <div className="text-2xl font-semibold my-3 font-sans">
          <p>Notifications</p>
        </div>
        {status === IsLoading.loading && props.user && props.user.uid ? (
          <p>Loading...</p>
        ) : null}
        {!props.user && (
          <p className="text-center">Sign in to see your notifications</p>
        )}
        {status === IsLoading.failed ? <p>Something went wrong!</p> : null}
        <ul className="notifications">
          {notifications.map((notification) => {
            return (
              <li key={notification.id}>
                <NotificationTile {...notification} />
              </li>
            );
          })}
        </ul>
      </div>
    </section>
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
