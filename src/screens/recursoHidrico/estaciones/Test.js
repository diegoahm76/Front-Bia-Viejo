import React, { useState } from "react";

const Test = () => {
  const [count, setCount] = useState(0);

  const plusOne = () => {
    if (count < 2) {
      setCount(count + 1);
    } else {
      setCount(0);
    }
  };
  return (
    <>
      <p>{count}</p>
      <button onClick={plusOne}>+1</button>
    </>
  );
};

export default Test;
