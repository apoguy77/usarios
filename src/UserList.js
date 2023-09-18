import React, { useState, useEffect } from "react";

function UserList({ users, onUserClick }) {
  return (
    <ul>
      {users.map((user) => (
        <li key={user.id} onClick={() => onUserClick(user)}>
          {user.name}
        </li>
      ))}
    </ul>
  );
}

export default UserList;
