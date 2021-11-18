(function () {
  let status = 1;
  let moving = false;
  let page1, page2, page3, page4, page5, page6;
  let page1Top, page2Top, page3Top, page4Top, page5Top, page6Top, page7Top;

  window.addEventListener('load', () => {
    setTimeout(() => {
      window.scrollTo(0, 0);
      disableScroll();
    }, 100);

    page1 = document.getElementById('Page_1');
    page2 = document.getElementById('Page_2');
    page3 = document.getElementById('Page_3');
    page4 = document.getElementById('Page_4');
    page5 = document.getElementById('Page_5');
    page6 = document.getElementById('Page_6');
    page1Top = 0;
    page2Top = window.innerHeight;
    page3Top = window.innerHeight * 2;
    page4Top = window.innerHeight * 3;
    page5Top = window.innerHeight * 4;
    page6Top = window.innerHeight * 5;
    page7Top = window.innerHeight * 6;
  });

  var keys = { 37: 1, 38: 1, 39: 1, 40: 1 };

  function preventDefault(e) {
    if (status === 7) {
      let checkScroll = setInterval(() => {
        if (window.scrollY < page7Top) {
          clearInterval(checkScroll);
          moving = true;
          moveFromTo(page7Top, page6Top).then((_) => {
            disableScroll();
            status = 6;
          });
        }
      }, 100);
    } else {
      e.preventDefault();
      if (moving) return;
      moving = true;
      if (status === 1) {
        if (e.deltaY > 0) {
          moveFromTo(page1Top, page2Top).then((_) => (status = 2));
          page2.style.display = 'flex';
        }
      } else if (status === 2) {
        if (e.deltaY > 0) {
          moveFromTo(page2Top, page3Top).then((_) => (status = 3));
          page3.style.display = 'flex';
        } else if (e.deltaY < 0) {
          moveFromTo(page2Top, page1Top).then((_) => (status = 1));
        }
      } else if (status === 3) {
        if (e.deltaY > 0) {
          moveFromTo(page3Top, page4Top).then((_) => (status = 4));
          page4.style.display = 'flex';
        } else if (e.deltaY < 0) {
          moveFromTo(page3Top, page2Top).then((_) => (status = 2));
        }
      } else if (status === 4) {
        if (e.deltaY > 0) {
          moveFromTo(page4Top, page5Top).then((_) => (status = 5));
          page5.style.display = 'flex';
        } else if (e.deltaY < 0) {
          moveFromTo(page4Top, page3Top).then((_) => (status = 3));
        }
      } else if (status === 5) {
        if (e.deltaY > 0) {
          moveFromTo(page5Top, page6Top).then((_) => (status = 6));
          page6.style.display = 'flex';
        } else if (e.deltaY < 0) {
          moveFromTo(page5Top, page4Top).then((_) => (status = 4));
        }
      } else if (status === 6) {
        if (e.deltaY > 0) {
          moveFromTo(page6Top, page7Top).then((_) => (status = 7));
        } else if (e.deltaY < 0) {
          moveFromTo(page6Top, page5Top).then((_) => (status = 5));
        }
      }
    }
  }

  function moveFromTo(from, to, func = () => null) {
    return new Promise((resolve, reject) => {
      window.scrollTo({ top: to, behavior: 'smooth' });
      setTimeout(() => {
        moving = false;
        func();
        resolve();
      }, 1000);
    });
  }

  function preventDefaultForScrollKeys(e) {
    if (keys[e.keyCode]) {
      preventDefault(e);
      return false;
    }
  }

  var supportsPassive = false;
  try {
    window.addEventListener(
      'test',
      null,
      Object.defineProperty({}, 'passive', {
        get: function () {
          supportsPassive = true;
        },
      }),
    );
  } catch (e) {}

  var wheelOpt = supportsPassive ? { passive: false } : false;
  var wheelEvent =
    'onwheel' in document.createElement('div') ? 'wheel' : 'mousewheel';

  // call this to Disable
  function disableScroll() {
    window.addEventListener('DOMMouseScroll', preventDefault, false); // older FF
    window.addEventListener(wheelEvent, preventDefault, wheelOpt); // modern desktop
    window.addEventListener('touchmove', preventDefault, wheelOpt); // mobile
    window.addEventListener('keydown', preventDefaultForScrollKeys, false);
  }

  // call this to Enable
  function enableScroll() {
    window.removeEventListener('DOMMouseScroll', preventDefault, false);
    window.removeEventListener(wheelEvent, preventDefault, wheelOpt);
    window.removeEventListener('touchmove', preventDefault, wheelOpt);
    window.removeEventListener('keydown', preventDefaultForScrollKeys, false);
  }
})();

{
  /* <script
      type="text/javascript"
      src="https://ad-college.vercel.app/js/main.js"
    ></script> */
}
