export const hasDiacritics = (txt: string) => {
  return arabicFixes(txt).length !== txt.length;
};

export const arabicFixes = (txt: string) =>

  txt.trim()
    .replace(/ۗ/g, "")
    .replace(/ ۚ/g, "")
    .replace(/ ۖ/g, "")
    .replace(/([^\u0621-\u063A\u0641-\u064A\u0660-\u0669a-zA-Z 0-9])/g, "")
     // eslint-disable-next-line
    .replace(/  /g, " ");

export const isCorrect = (input: string, correct: string | undefined) => {
    let inputDiacless= arabicFixes(input)
    
    if(correct === undefined) {
        return {correct: false, submit: false};
    }

    if (
        inputDiacless !==
        arabicFixes(correct).slice(0, inputDiacless.length)
    ) {
        return {
            correct: false,
            submit: false
        };
    } else {
        if(inputDiacless.length === arabicFixes(correct).length) {
            return {
                correct: true,
                submit: true
            };
        }
        return {
            correct: true,
            submit: false
        };
    }
  }