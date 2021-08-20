var init = () => {
  typewriting();
};
function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

var typewriting = async () => {
  let data = [
    {
      messages: [
        { msg: "Hi, I am Yingheng He (Hank)", msgClass: "typewriter-name" },
      ],
      paragraphClass: "typewriting-paragraph",
    },
    {
      messages: [
        {
          msg: "A professional front-end developer",
          msgClass: "typewriter-occupation",
        },
      ],
      paragraphClass: "typewriting-paragraph",
    },
    {
      paragraphClass: "typewriting-paragraph",
      messages: [
        { msg: "Creative", msgClass: "creative" },
        { msg: "Efficient", msgClass: "efficient" },
        { msg: "Reliable", msgClass: "reliable" },
      ],
    },
  ];
  let articleDom = document.getElementById("typewriting");
  for (let info of data) {
    let paragraph = document.createElement("p");
    paragraph.className = info.paragraphClass;

    let cursor = document.createElement("span");
    cursor.className = "cursor";
    cursor.innerText = "|";

    paragraph.appendChild(cursor);
    articleDom.appendChild(paragraph);

    for (let index in info.messages) {
      let message = info.messages[index];
      let words = document.createElement("span");
      words.className = message.msgClass;
      paragraph.insertBefore(words, cursor);

      for (word of message.msg) {
        words.innerText += word;
        await sleep(100);
      }
      //   if (index != info.messages.length - 1) {
      //     await sleep(1000);
      //   }
    }
    let timer = setInterval(function () {
      if (cursor.innerText == "|") {
        cursor.innerText = "";
      } else {
        cursor.innerText = "|";
      }
    }, 350);
    setTimeout(() => {
      clearInterval(timer);
      cursor.innerText = "";
    }, 1400);

    await sleep(1400);
  }
};
