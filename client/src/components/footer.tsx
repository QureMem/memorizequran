import React from "react";
// import Github from "../assets/github-brands.svg";
import { domain } from "../config";
const Footer = () => {
  const creationYear = 2020;
  const currYear = new Date().getFullYear();
  return (
    <>
      <div className="mb-auto"></div>
      <div className="flex flex-row justify-between mt-10 mb-3 max-w-lg mx-auto pr-5 pl-5">
        <div className="max-w-md mx-auto text-center font-medium">
          <a href={domain}>MemorizeQuran</a> {"| "}
          {currYear === creationYear
            ? `${creationYear}`
            : `${creationYear} - ${currYear}`}
        </div>

        {/* <a href="https://github.com/QureMem/memorizequran">
          <img
            src={Github}
            alt="github"
            className="h-5 w-5 text-gray-500"
            style={{
              filter:
                "invert(42%) sepia(93%) saturate(1352%) hue-rotate(218deg) brightness(29%) contrast(41%)",
            }}
          />
        </a> */}
      </div>
    </>
  );
};

export default Footer;
