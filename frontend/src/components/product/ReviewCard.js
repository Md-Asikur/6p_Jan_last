import Rating from "react-rating-stars-component";
import React from "react";
import profilePng from "../images/Profile.png";
import { useSelector } from "react-redux";

const ReviewCard = ({ review }) => {
   const { error, users } = useSelector((state) => state.allUsers);
  console.log(users)

  const options = {
    value: review.rating,
    readOnly: true,
    precision: 0.5,
  };
 const currentUser = sessionStorage.getItem("currentUserPack")
   ? JSON.parse(sessionStorage.getItem("currentUserPack"))
   : {};
  return (
    <div className="reviewCard">
      <img src={profilePng} alt="User" />
      <p>{currentUser?.name}</p>
      <Rating {...options} />
      <span className="reviewCardComment">{review.comment}</span>
    </div>
  );
};

export default ReviewCard;
