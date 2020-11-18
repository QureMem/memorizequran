import React from "react";
import { useHistory } from "react-router-dom";
// import { domain } from "../config";
const Header = () => {
  let history = useHistory();
  return (
    <div className="flex p-3 justify-end">
      <p
        className="pl-6 text-xl font-medium tracking-widest cursor-pointer"
        // href={domain}
        onClick={() => history.push("/")}
      >
        MemorizeQuran
      </p>
    </div>
  );
};
export default Header;
