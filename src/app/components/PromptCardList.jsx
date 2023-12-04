import React from "react";
import PromptCard from "./PromptCard";

const PromptCardList = ({ data }) => {
  return (
    <div className="mt-16 prompt_layout">
      {data.map((prompt, i) => (
        <PromptCard key={prompt.id} />
      ))}
    </div>
  );
};

export default PromptCardList;
