import { Card } from "@mui/material";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchAllEmployer } from "../../Redux/Slices/User";
import "./AllUser.css";
import UserCard from "./UserCard";
import Loading from "../Loading/Loading";

const AllEmployers = () => {
  const dispatch = useDispatch();
  const users = useSelector((state) => state.user);
  const { AllEmployeers, loading } = users;
  useEffect(() => {
    dispatch(fetchAllEmployer());
  }, [dispatch]);

  return (
    <div className="employer-page">
      {loading ? (
        <div style={{ marginTop: "150px" }}>
          <Loading />
        </div>
      ) : (
        <>
          {AllEmployeers && AllEmployeers?.length < 1 ? (
            <h4 style={{ marginTop: "10px" }}>No employee found</h4>
          ) : (
            <div className="all-employer">
              {AllEmployeers?.map((item, i) => (
                <UserCard key={i} user={item} />
              ))}
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default AllEmployers;
