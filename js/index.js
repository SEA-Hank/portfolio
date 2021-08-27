var init = () => {
  setTimeout(typewriting, 0);
  window.websiteMenu = new menu();
  window.websiteScrollAnimation = new scrollAnimation();
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
  this.logo = document.getElementById("menu-logo");
  this.logoClose = document.getElementById("menu-logo-close");
  this.layer = document.getElementById("menu-masklayer");
  this.main = document.getElementById("content");

  this.show = () => {
    this.menuBtnAnimate(this.logo, this.logoClose, [0, -45, -90]);
    this.menu.classList.add("show");
    this.layer.classList.add("show");
  };

  this.hide = () => {
    this.menuBtnAnimate(this.logoClose, this.logo, [-90, -45, 0]);
    this.menu.classList.remove("show");
    this.layer.classList.remove("show");
  };

  this.menuBtnAnimate = (current, next, degree) => {
    var options = { fill: "forwards", duration: 150 };
    current
      .animate(
        [
          { transform: `rotate(${degree[0]}deg)`, opacity: 1 },
          { transform: `rotate(${degree[1]}deg)`, opacity: 0 },
        ],
        options
      )
      .finished.then(() => {
        next.animate(
          [
            { transform: `rotate(${degree[1]}deg)`, opacity: 0 },
            { transform: `rotate(${degree[2]}deg)`, opacity: 1 },
          ],
          options
        );
      });
  };

  this.btn.addEventListener("click", this.show);
  this.layer.addEventListener("click", this.hide);

  this.ul = document.getElementById("menu-ul");

  var func = (function menuClick(menu) {
    return function () {
      var section = this.dataset.section;
      var targer = document.getElementById(section);
      console.log(menu.main.offsetTop);
      menu.scroll(
        menu.main.scrollTop,
        section == "home" ? 0 : targer.offsetTop
      );
      for (let li of menu.ul.children) {
        li.className = "";
      }
      this.className = "activated";
      menu.hide();
    };
  })(this);

  this.scroll = (currentY, targetY) => {
    let needScrollTop = targetY - currentY;
    let _currentY = currentY;
    setTimeout(() => {
      const dist = Math.ceil(needScrollTop / 10);
      _currentY += dist;
      this.main.scrollTo({
        top: _currentY,
        left: 0,
      });
      if (needScrollTop > 10 || needScrollTop < -10) {
        this.scroll(_currentY, targetY);
      } else {
        this.main.scrollTo({
          top: targetY,
          left: 0,
        });
      }
    }, 8);
  };

  for (let li of this.ul.children) {
    li.addEventListener("click", func);
  }
};

var scrollAnimation = function () {
  var isInViewPortOfOne = (el) => {
    let viewPortHeight =
      window.innerHeight ||
      document.documentElement.clientHeight ||
      document.body.clientHeight;
    let offsetTop = el.offsetTop;
    let scrollTop = this.contentWrapper.scrollTop;
    let top = offsetTop - scrollTop;
    return top <= viewPortHeight - 150;
  };
  this.contentWrapper = document.getElementById("content");
  this.AnimateDoms = document.getElementsByClassName("portfolio-animate");
  this.contentWrapper.addEventListener("scroll", () => {
    for (dom of this.AnimateDoms) {
      if (
        !dom.classList.contains("portfolio-present") &&
        isInViewPortOfOne(dom)
      ) {
        dom.classList.add("portfolio-present");
      }
    }
  });
};
