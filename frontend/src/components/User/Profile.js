import React, { Fragment, useEffect } from "react";
import { useSelector } from "react-redux";
import MetaData from "../layout/MetaData";
import Loader from "../layout/Loader/Loader";
import { Link, useHistory } from "react-router-dom";
import "./Profile.css";
import { useNavigate } from "react-router-dom";
const Profile = () => {
  const { user, loading, isAuthenticated } = useSelector((state) => state.user);
  const currentUser = JSON.parse(localStorage.getItem("currentUserPack"));
// const history=useHistory()
//   useEffect(() => {
//     if (isAuthenticated === false) {
//       history.push("/login");
//     }
//   }, [history, isAuthenticated]);
  const history = useHistory();
  useEffect(() => {
    if (!currentUser) {
      history.push("/login");
    }
  }, [history, currentUser]);
  return (
    <Fragment>
      {loading ? (
        <Loader />
      ) : (
        <Fragment>
          <MetaData title={`${currentUser?.name}'s Profile`} />
          <div className="profileContainer">
            <div>
              <h1>My Profile</h1>
              <img src={currentUser?.avatar?.url} alt={currentUser?.name} />
              <Link to="/me/update">Edit Profile</Link>
            </div>
            <div>
              <div>
                <h4>Full Name</h4>
                <p>{currentUser?.name}</p>
              </div>
              <div>
                <h4>Email</h4>
                <p>{currentUser?.email}</p>
              </div>
              <div>
                <h4>Joined On</h4>
                <p>{String(currentUser?.createdAt).substr(0, 10)}</p>
              </div>

              <div>
                <Link to="/orders">My Orders</Link>
                <Link to="/password/update">Change Password</Link>
              </div>
            </div>
          </div>
        </Fragment>
      )}
    </Fragment>
  );
};

export default Profile;
