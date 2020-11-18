import React from "react";
import { Link } from "react-router-dom";
import ar_text from "../lang/arabic.json";
import Header from "../components/header";
import Surahs from "../data/surahs.json";
import Footer from "../components/footer";

const Homepage = () => {
  let Surahs1, Surahs2, Surahs3;
  Surahs1 = Surahs.slice(0, 38);
  Surahs2 = Surahs.slice(38, 76);
  Surahs3 = Surahs.slice(76, 114);
  return (
    <div className="flex flex-col h-screen">
      <Header />
      <div>
        <div className="max-w-md mx-auto flex p-6 mt-7 mb-7">
          <div className="ml-6 pt-1">
            <h1 className="text-4xl text-emr leading-tight font-semibold">
              {ar_text.basmalah}
            </h1>
            <p className="pr-2 text-base text-gray-700 leading-normal">
              {ar_text.description}
            </p>
          </div>
        </div>
      </div>
      <div className="container mx-auto flex md:flex-row flex-col px-5 md:justify-between">
        <div className="flex flex-col">
          {Surahs1.map((e, i) => {
            return (
              <div
                className="text-2xl p-3 text-emr font-semibold hover:underline"
                key={`1${i}`}
              >
                <Link to={`/pretest/${i + 1}`}>{`${e.number}. ${e.name}`}</Link>
              </div>
            );
          })}
        </div>
        <div className="flex flex-col">
          {Surahs2.map((e, i) => {
            return (
              <div
                className="text-2xl p-3 text-emr font-semibold hover:underline"
                key={`2${i}`}
              >
                <Link to={`/pretest/${i + 1}`}>{`${e.number}. ${e.name}`}</Link>
              </div>
            );
          })}
        </div>
        <div className="flex flex-col">
          {Surahs3.map((e, i) => {
            return (
              <div
                className="text-2xl p-3 text-emr font-semibold hover:underline"
                key={`3${i}`}
              >
                <Link to={`/pretest/${i + 1}`}>{`${e.number}. ${e.name}`}</Link>
              </div>
            );
          })}
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Homepage;
