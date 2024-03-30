import React from "react";
import SideBar from "../components/SideBar";

export default function layout({ children }) {
 

  return (
    <div className="grid grid-cols-7">
      <SideBar/>
      <div className="col-span-6 ml-64">{children}</div>
    </div>
  );
}
