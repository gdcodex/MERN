import React from "react";
import Userslist from "../components/userslist";

function Users() {
  const USERS = [
    {
      id: "ul",
      name: "Echo",
      image:
        "https://i.pinimg.com/736x/96/e4/af/96e4af33526e00e4f5e581bbb87e6741.jpg",
      places: 4,
    },
  ];
  return <Userslist items={USERS} />;
}

export default Users;
