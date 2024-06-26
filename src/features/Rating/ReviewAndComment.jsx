import React, { useEffect, useRef, useState } from "react";

function ReviewAndComment() {
  const [myCommentvalue, setMyCommentTaBox] = useState("");
  const ref = useRef();

  let MIN_TEXTAREA_HEIGHT = 12;

  const handleTaHeight = (e) => {
    setMyCommentTaBox(e.target.value);
  };

  // const textBoxHeight = () => {
    
  //   ref.current.style.height = "inherit";
  //   // Set height
  //   ref.current.style.height = `${Math.max(
  //     ref.current.scrollHeight,
  //     MIN_TEXTAREA_HEIGHT
  //   )}px`;
  // };

  // useEffect(() => {
  //   textBoxHeight();
  // }, []);

  return (
    <>
      <h3>Write your comment</h3>
      <textarea
        name="commentandreview"
        id=""
        rows={1}
        placeholder="Please leave a comment here..."
        onChange={handleTaHeight}
        value={myCommentvalue}
        style={{
          minHeight: MIN_TEXTAREA_HEIGHT,
          resize: "none",
        }}
      ></textarea>
    </>
  );
}

export default ReviewAndComment;
