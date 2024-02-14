import React from "react";

export const utilFormatPostText = (text: string) => {
  return text.split(/\s+/).map((word, index) => {
    if (word.startsWith("https://")) {
      return (
        <>
          <span key={index} className="text-blue-400 text-sm">
            {/* <a href={word}>{word}</a> */}
            {word}
          </span>
          <br />
        </>
      );
    }
    return word + " "; // Add space after each word
  });
};
