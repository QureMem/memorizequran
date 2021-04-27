import React, { useState, useEffect } from "react";
import { useLocation, Redirect } from "react-router-dom";
import Header from "../components/header";
// import ar_text from "../lang/arabic.json";

import Footer from "../components/footer";
import Row from "../components/resultrow";

interface StateInterface {
  results: string[];
  start: number;
  surah: number;
  max: number;
}
interface Surah {
  verses: Array<VerseString>;
  nameEnglish: string;
  nameTrans: string;
  nameArabic: string;
  chapterNumber: number;
  nVerses: number;
}
interface VerseString {
  verseNumber: number;
  verseString: string;
  verseStringB: string;
}
const Results = () => {
  // let history = useHistory();
  const { state } = useLocation<StateInterface>();
  const [surah, setSurah] = useState<Surah>();
  const [activeIndex, setActiveIndex] = useState(0);

  console.log(state.results);
  const format_surah = (n: number) => {
    if (n < 10) {
      return `00${n}`;
    } else if (n < 100) {
      return `0${n}`;
    }
    return `${n}`;
  };

  useEffect(() => {
    if (state === undefined) {
      return;
    }
    import(`../data/${format_surah(state.surah)}`).then((d) => setSurah(d));
    // eslint-disable-next-line
  }, []);

  if (state === undefined || state.results.length === 0) {
    return <Redirect to="/" />;
  }

  return (
    <div className="flex flex-col h-screen">
      <Header />
      <div className="max-w-xl w-full p-2 mx-auto">
        {state.results.map((e, i) => {
          const showDescription =
            i === activeIndex ? "show-description" : "";

          if (surah === undefined) {
            return <div></div>;
          }
          return (
            <Row
              start={state.start}
              results={state.results}
              index={i}
              verses={surah.verses}
              showDescription={showDescription}
              ariaExpanded={i === activeIndex}
              onClick={() =>  setActiveIndex(i)}
            />
          );
        })}
      </div>
      <Footer />
    </div>
  );
};

export default Results;
