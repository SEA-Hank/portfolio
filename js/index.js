var init = () => {
  window.websiteMenu = new menu();
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

var menu = function () {
  this.menu = document.getElementById("menu");
  this.btn = document.getElementById("menu-trigger");
  this.layer = document.getElementById("menu-masklayer");
  this.btn.addEventListener("click", () => {
    this.menu.classList.add("show");
    this.layer.classList.add("show");
  });
  this.layer.addEventListener("click", () => {
    this.hide();
  });

  this.hide = () => {
    this.menu.classList.remove("show");
    this.layer.classList.remove("show");
  };

  this.ul = document.getElementById("menu-ul");

  var func = (function menuClick(menu) {
    return function () {
      var section = this.dataset.section;
      var targer = document.getElementById(section);
      var main = document.getElementById("content");

      if (main.scrollTo) {
        main.scrollTo({
          top: section == "home" ? 0 : targer.offsetTop,
          left: 0,
          behavior: "smooth",
        });
      } else {
        main.scrollTop = "home" ? 0 : targer.offsetTop;
      }
      for (let li of menu.ul.children) {
        li.className = "";
      }
      this.className = "activated";
      menu.hide();
    };
  })(this);

  for (let li of this.ul.children) {
    li.addEventListener("click", func);
  }
};
