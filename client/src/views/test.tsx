import React, { useEffect, useState } from "react";
import { useParams, useHistory } from "react-router-dom";
import Header from "../components/header";
import ar_text from "../lang/arabic.json";
import Surahs from "../data/surahs.json";
import Footer from "../components/footer";

interface VerseString {
  "verseNumber": number,
  "verseString": string,
  "verseStringB": string
}
interface Surah {
  "verses": Array<VerseString>,
  "nameEnglish": string,
  "nameTrans": string,
  "nameArabic": string,
  "chapterNumber": number,
  "nVerses": number
}
const Test = () => {
  let history = useHistory();
  const params = useParams<any>();
  const [current, setCurrent] = useState(0);
  const [max, setMax] = useState(1);
  const [state, setState] = useState<Surah>();
  const [inputField, setInput] = useState("");
  const format_surah = (n: number) => {
      if(n <10){
        return `00${n}`;
      }
      else if(n < 100) {
        return `0${n}`;
      }
      return `${n}`;
  }

  useEffect(() => {
    const surah = parseInt(params.id);
    const start = parseInt(params.start);
    const end = parseInt(params.end);
    if (isNaN(surah) || isNaN(start) || isNaN(end)) history.push("/error");
    else if (surah < 1 || surah > 114 || start > end || start > Surahs[params.id - 1].total_verses || start < 1 || end > Surahs[params.id - 1].total_verses) history.push("/error");
    else {
      setCurrent(start);
      setMax(end);
      import(`../data/${format_surah(surah)}`).then(d => setState(d))
    }
    // eslint-disable-next-line
  }, []);

  const changeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
      setInput(e.target.value);
  }
  const keydownHandler = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if(e.key === 'Enter' && inputField !== ""){
      nextAya();
    }
  }
  const nextAya = () => {
    if(current === max){
      alert('Good job');
    }
    setCurrent(current+1);
    setInput("");

  }
  
  return (<div className="flex flex-col h-screen">
    <Header/>
    <div className="max-w-xl w-full p-2 mx-auto">
      <h3 className="text-3xl my-8 text-center font-bold">
        {ar_text.testSurah + ' ' + state?.nameArabic}
      </h3>
      <h4 className="text-xl mb-4 text-center">
        {!(current === 1 && (state?.chapterNumber === 1 || state?.chapterNumber === 9)) &&  ((current>1)? 
        "« " + state?.verses[current-1].verseString + " »"
        : ar_text.basmalah)} 
      </h4>
      <div className="w-full flex">
        <div className="flex-grow"><input type="text" value={inputField} onChange={changeHandler} onKeyDown={keydownHandler} className="w-full h-full border-2 border-gray-500	 rounded-r-xl p-3 text-lg outline-none" /></div>
       <div className=""><button className="p-4 bg-emr w-full h-full rounded-l-xl" onClick={nextAya}>N</button></div>
      </div>
      {/* <div>
        {state?.verses[current-1]?.verseString}
      </div>
      <div>{current}/{max} <button onClick={nextAya}>Click</button></div> */}
    </div>
    <Footer/>
    </div>);
};

export default Test;
