import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { cfl } from "../../helpers/shared";
import User from "../../models/user";
import { signOut } from "../../redux/actions/authActions";

const TopNavBar = (props: any) => {
  const handleClickSignOut = async () => {
    await props.signOut();
    window.location.href = "";
  };
  if (props.user && props.user.uid) {
    const user: User = props.user as User;
    return (
      <div className="flex items-center justify-center md:justify-end md:space-x-4">
        <p>{user.displayName ? cfl(user.displayName) : user.email}</p>
        <div className="bg-yellow-400 rounded-full w-10 h-10 flex items-center justify-center font-extrabold cursor-pointer hover:shadow-md hover:shadow-slate-500">
          {user.displayName
            ? user.displayName[0].toUpperCase()
            : user.email[0].toUpperCase()}
        </div>
        <Link to="/#" className="button" onClick={handleClickSignOut}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="w-4 h-4 inline-block mx-1"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M15.75 9V5.25A2.25 2.25 0 0013.5 3h-6a2.25 2.25 0 00-2.25 2.25v13.5A2.25 2.25 0 007.5 21h6a2.25 2.25 0 002.25-2.25V15m3 0l3-3m0 0l-3-3m3 3H9"
            />
          </svg>
          Log out
        </Link>
      </div>
    );
  } else {
    return (
      <div className="flex justify-center md:justify-end">
        <Link to="/login" className="button">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="w-4 h-4 inline-block mx-1"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M15.75 9V5.25A2.25 2.25 0 0013.5 3h-6a2.25 2.25 0 00-2.25 2.25v13.5A2.25 2.25 0 007.5 21h6a2.25 2.25 0 002.25-2.25V15m3 0l3-3m0 0l-3-3m3 3H9"
            />
          </svg>
          Log in
        </Link>
        <Link to="/signup" className="button ml-2">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="w-4 h-4 inline-block mx-1"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M17.982 18.725A7.488 7.488 0 0012 15.75a7.488 7.488 0 00-5.982 2.975m11.963 0a9 9 0 10-11.963 0m11.963 0A8.966 8.966 0 0112 21a8.966 8.966 0 01-5.982-2.275M15 9.75a3 3 0 11-6 0 3 3 0 016 0z"
            />
          </svg>
          Sign up
        </Link>
      </div>
    );
  }
};
const mapStateToProps = (state: any) => state.auth;
const mapDispatchToProps = (dispatch: any) => {
  return {
    signOut: () => dispatch(signOut()),
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(TopNavBar);
