let intervalId = null;
let i = 0;
let text = "";
let isDone = "";

self.addEventListener("message", (event) => {
  const { generatingtext, words } = event.data;

  // if (generatingtext === "Processing...") {
  //   intervalId = setInterval(() => {
  //     text = generatingtext?.slice(0, i);
  //     i++;
  //     if (i > generatingtext?.length) {
  //       i = 0;
  //     }
  //     console.log(text);
  //     self.postMessage({ text });
  //   }, 1200);
  // } else {
  intervalId = setInterval(() => {
    text = generatingtext?.slice(0, i);
    i++;
    if (i > generatingtext?.length) {
      clearInterval(intervalId);
    }
    // stop generating if the words length is reached to 1500
    if (words == 1500) {
      // console.log("words length reached to 1500");
      clearInterval(intervalId);
    }

    // check if the text generation is finished
    if (i === generatingtext?.length) {
      isDone = "Done";
    }
    console.log("text", text, "i", i, "words", words);

    self.postMessage({ text, isDone });
  }, 50);
  // }
});
