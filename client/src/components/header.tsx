import React from "react";
import { domain } from "../config";
const Header = () => {
  return (
    <div className="flex p-3 justify-end">
      <a
        className="pl-6 text-xl font-medium tracking-widest cursor-pointer"
        href={domain}
      >
        MemorizeQuran
      </a>
    </div>
  );
};
export default Header;
