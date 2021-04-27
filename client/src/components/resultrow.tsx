import React from "react";
import * as diff from "diff";
// import { isCorrect, arabicFixes, hasDiacritics } from "../functions/util";

interface VerseString {
  verseNumber: number;
  verseString: string;
  verseStringB: string;
}

type Props = {
  verses: Array<VerseString>;
  results: Array<string>;
  start: number;
  index: number;
  showDescription: string;
  ariaExpanded: boolean;
  onClick: () => void;
};
const Row = ({
  verses,
  results,
  start,
  index,
  showDescription,
  ariaExpanded,
  onClick,
}: Props) => {
  let corrector = diff.diffChars(
    verses[start + index].verseString,
    results[index],
    {
      ignoreCase: true,
    }
  );
  return (
    <div className="m-4">
      <div className="faq__question border-b border-gray-400">
        <dt>
          <button
            aria-expanded={ariaExpanded}
            aria-controls={`faq${index + 1}_desc`}
            data-qa="faq__question-button"
            className={[
              "faq__question-button",
              ariaExpanded && "font-bold",
            ].join(" ")}
            onClick={onClick}
          >
            <div className="relative">
              <div style={{ zIndex: 7 }}>
                {corrector.map((part, i) => {
                  let s;
                  if (part.added) {
                    s = {
                      color: "text-red-600",
                      textDecoration: "line-through",
                    };
                  } else if (part.removed) {
                    s = {
                      color: "text-red-600",
                    };
                  } else {
                    s = {
                      color: "seagreen",
                    };
                  }

                  return (
                    <span key={i} style={s}>
                      {part.value}
                    </span>
                  );
                })}
              </div>
              {/* {isCorrect(results[index], verses[start + index].verseString) && (
                <div className="absolute text-red-600 top-0" style={{ zIndex: -1 }}>
                  {verses[start + index].verseString}
                </div>
              )} */}
            </div>
          </button>
        </dt>
        <dd>
          <p
            id={`faq${index + 1}_desc`}
            data-qa="faq__desc"
            className={`faq__desc ${showDescription}`}
          >
            <div>{results[index]}</div>
            <div>{verses[start + index].verseString}</div>
          </p>
        </dd>
      </div>
    </div>
  );
};

export default Row;
