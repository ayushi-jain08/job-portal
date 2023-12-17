import React from "react";
import Avatar from "@mui/material/Avatar";
import "./AllUser.css";
import { NavLink } from "react-router-dom";
import { Card } from "@mui/material";

const UserCard = ({ user }) => {
  return (
    <Card className="applicants-all-details">
      {user?.pic ? (
        <img src={user?.pic?.url} alt="" />
      ) : (
        <Avatar src="/broken-image.jpg" className="avtar" />
      )}
      <div className="applicant-name-email">
        <NavLink to={`/user/${user._id}`}>
          <span className="name">{user?.name}</span>
          <span>{user?.email}</span>
        </NavLink>
      </div>
    </Card>
  );
};

export default UserCard;
