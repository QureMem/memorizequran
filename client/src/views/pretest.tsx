import React, { useEffect, useState } from "react";
import { useParams, useHistory } from "react-router-dom";
import Header from "../components/header";
import ar_text from "../lang/arabic.json";
import Surahs from "../data/surahs.json";
import Footer from "../components/footer";
const Pretest = () => {
  let history = useHistory();
  const params = useParams<any>();
  const [start, setStart] = useState(1);
  const [end, setEnd] = useState(2);
  const [errStart, setErrStart] = useState(false);
  const [errEnd, setErrEnd] = useState(false);
  const [max, setMax] = useState(2);

  useEffect(() => {
    const surah = parseInt(params.id);
    if (isNaN(surah)) history.push("/error");
    else if (surah < 1 || surah > 114) history.push("/error");
    else {
      setMax(Surahs[params.id - 1].total_verses);
      setEnd(Surahs[params.id - 1].total_verses);
    }
    // eslint-disable-next-line
  }, []);
  const handleStart = (i: string) => {
    const n = parseInt(i);
    if (isNaN(n)) return;
    setStart(n);
  };

  const handleEnd = (i: string) => {
    const n = parseInt(i);
    if (isNaN(n)) return;
    setEnd(n);
  };

  const handleSubmit = (e: React.MouseEvent) => {
    e.preventDefault();
    if (start < 1 || start > max) setErrStart(true);
    else setErrStart(false);

    if (end > max || max < start) setErrEnd(true);
    else setErrEnd(false);

    if (!(start < 1 || start > max || end > max || max < start))
      history.push(`/test/${params.id}/${start}/${end}`);
  };
  return (
    <div className="flex flex-col h-screen">
      <Header />
      <div className="container mx-auto mt-6 px-5">
        <div className="text-3xl text-emr leading-tight font-semibold">
          {ar_text.pretestTitle}
        </div>

        <div className="pr-2 text-base text-gray-700 leading-normal">
          {ar_text.pretestDescription}
        </div>
        <div className="md:mt-8 mt-4 flex max-w-lg mx-auto">
          <form className="flex flex-auto flex-col">
            <label htmlFor="start" className="text-xl">
              {ar_text.pretestStart}:
            </label>
            <input
              type="number"
              name="start"
              id="start"
              className={"flex border-b border-solid h-10 p-3".concat(
                errStart
                  ? " border-red-600 text-red-600"
                  : " border-gray-500 text-black"
              )}
              value={start}
              onChange={(e) => handleStart(e.target.value)}
            />
            {errStart && (
              <p className="pt-1 text-red-600">{ar_text.pretestStartError}</p>
            )}

            <div className="mt-6"></div>
            <label htmlFor="end" className="text-xl">
              {ar_text.pretestEnd}:
            </label>
            <input
              type="number"
              name="end"
              id="end"
              className={"flex border-b border-solid h-10 p-3".concat(
                errEnd
                  ? " border-red-600 text-red-600"
                  : " border-gray-500 text-black"
              )}
              value={end}
              onChange={(e) => handleEnd(e.target.value)}
            />
            {errEnd && (
              <p className="pt-1 text-red-600">{ar_text.pretestEndError}</p>
            )}

            <div className="mt-6"></div>
            <button
              type="submit"
              onClick={(e) => handleSubmit(e)}
              className="bg-emr rounded text-white font-bold leading-loose"
            >
              {ar_text.pretestSubmit}
            </button>
          </form>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Pretest;
