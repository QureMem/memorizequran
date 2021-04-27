import React, { useEffect, useState } from "react";
import { useParams, useHistory } from "react-router-dom";
import Header from "../components/header";
import ar_text from "../lang/arabic.json";
import Surahs from "../data/surahs.json";
import Footer from "../components/footer";
import { ReactComponent as Arrow } from "../assets/left-arrow.svg";
import { isCorrect } from "../functions/util";

interface VerseString {
  verseNumber: number;
  verseString: string;
  verseStringB: string;
}
interface Surah {
  verses: Array<VerseString>;
  nameEnglish: string;
  nameTrans: string;
  nameArabic: string;
  chapterNumber: number;
  nVerses: number;
}
const Test = () => {
  let history = useHistory();
  const params = useParams<any>();
  const [current, setCurrent] = useState(0);
  const [max, setMax] = useState(1);
  const [state, setState] = useState<Surah>();
  const [inputField, setInput] = useState("");
  const [correct, setCorrect] = useState(false);

  const [results, setResults] = useState<string[]>([]);
  const format_surah = (n: number) => {
    if (n < 10) {
      return `00${n}`;
    } else if (n < 100) {
      return `0${n}`;
    }
    return `${n}`;
  };

  useEffect(() => {
    const surah = parseInt(params.id);
    const start = parseInt(params.start);
    const end = parseInt(params.end);
    if (isNaN(surah) || isNaN(start) || isNaN(end)) history.push("/error");
    else if (
      surah < 1 ||
      surah > 114 ||
      start > end ||
      start > Surahs[params.id - 1].total_verses ||
      start < 1 ||
      end > Surahs[params.id - 1].total_verses
    )
      history.push("/error");
    else {
      setCurrent(start);
      setMax(end);
      import(`../data/${format_surah(surah)}`).then((d) => setState(d));
    }
    // eslint-disable-next-line
  }, []);

  useEffect(() => {
    if (current > max) return;
    const res = isCorrect(inputField, state?.verses[current].verseString);
    setCorrect(res.correct);

    if (res.submit) {
      nextAya();
    }
    // eslint-disable-next-line
  }, [inputField]);

  useEffect(() => {
    if (results.length === parseInt(params.end) - parseInt(params.start) + 1) {
      exit();
    }
    // eslint-disable-next-line
  }, [results]);

  const changeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (current > max) return;
    setInput(e.target.value);
  };
  const keydownHandler = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (current > max) return;
    if (e.key === "Enter" && inputField !== "") {
      nextAya();
    }
  };
  const nextAya = () => {
    setCurrent(current + 1);
    setResults((res) => [...res, inputField]);
    setInput("");
  };
  const exit = () => {
    history.push('/results', {
      results: inputField.length ? [...results, inputField]: results,
      start: parseInt(params.start),
      surah: parseInt(params.id),
      max: inputField.length ? current: current-1
    } )
  };
  return (
    <div className="flex flex-col h-screen">
      <Header />
      <div className="max-w-xl w-full p-2 mx-auto">
        <div className="flex justify-between items-center my-8 ml-2">
          <div>
            {" "}
            <h3 className="text-3xl font-bold">
              {Surahs[parseInt(params.id) - 1].name}
            </h3>
          </div>

          <div onClick={exit}>X</div>
        </div>

        <h4 className="text-xl mb-4 text-center">
          {!(
            current === 1 &&
            (state?.chapterNumber === 1 || state?.chapterNumber === 9)
          ) &&
            (current > 1
              ? "« " + state?.verses[current - 1].verseString + " »"
              : ar_text.basmalah)}
        </h4>
        <div className="w-full flex">
          <div className="flex-grow">
            <input
              type="text"
              value={inputField}
              onChange={changeHandler}
              onKeyDown={keydownHandler}
              autoFocus
              autoCorrect="off"
              className={[
                "w-full h-full border-2 rounded-r-xl p-3 text-lg outline-none",
                inputField.length === 0
                  ? "border-gray-700"
                  : correct
                  ? "border-emr"
                  : "border-red-600",
              ].join(" ")}
            />
          </div>
          <div className="">
            <button
              className={[
                "p-4 w-full h-full rounded-l-xl",
                inputField.length === 0
                  ? "bg-gray-700"
                  : correct
                  ? "bg-emr"
                  : "bg-red-600",
              ].join(" ")}
              onClick={nextAya}
            >
              <Arrow fill="white" className="w-4" />
            </button>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Test;
