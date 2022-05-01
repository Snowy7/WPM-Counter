import React, { useState, useEffect } from "react";

function Form({ wordsTyped, incrementWordsTyped, wordsList }) {
  const [input, setInput] = useState("");
  const [wordToType, setWordToType] = useState(wordsList[wordsTyped]);
  const [wordsBefore, setWordsBefore] = useState("");
  const [wordsAfter, setWordsAfter] = useState("");
  const [wrong, setWrong] = useState(false);

  useEffect(() => {
    if (input === wordToType) {
      console.log("Word typed correctly!");
      incrementWordsTyped();
      setInput("");
    }
  }, [input, wordToType, incrementWordsTyped]);

  useEffect(() => {
    if (wordsTyped === 0) {
      setInput("");
    }
    setWordToType(wordsList[wordsTyped]);
    let wordsBefore = wordsList.slice(0, wordsTyped);
    wordsBefore = wordsBefore.join(" ");
    let wordsAfter = wordsList.slice(wordsTyped + 1);
    wordsAfter = wordsAfter.join(" ");
    setWordsBefore(wordsBefore);
    setWordsAfter(wordsAfter);
  }, [wordsTyped, wordsList]);

  return (
    <div className="Form">
      <h3 className="words-container">
        <span className="words-before">{wordsBefore}</span>{" "}
        <span className={wrong ? "wrong-word" :" word-to-type"}>{wordToType}</span>{" "}
        <span className="words-after">{wordsAfter}</span>
      </h3>
      <form onSubmit={(e) => e.preventDefault()}>
        <input
          type="text"
          value={input}
          onChange={(e) => {
            if (input.length < 0 || e.target.value === " ") return;
            setInput(e.target.value);
            if (wordToType.slice(0, e.target.value.length) !== e.target.value) {
                setWrong(true);
            } else {
            setWrong(false);
            }
          }}
          autoFocus
        ></input>
      </form>
    </div>
  );
}

export default Form;
