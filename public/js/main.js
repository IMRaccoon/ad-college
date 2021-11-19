(function () {
  let status = 1;
  let throttling = false;
  let setElement = {};
  let prevMobile, nextMobile;
  let setTop = {
    page1: 0,
    page2: window.innerHeight,
    page3: window.innerHeight * 2,
    page4: window.innerHeight * 3,
    page5: window.innerHeight * 4,
    page6: window.innerHeight * 5,
    page7: window.innerHeight * 6,
  };

  window.addEventListener('load', () => {
    setTimeout(() => {
      window.scrollTo(0, 0);
      disableScroll();
    }, 100);

    setElement = {
      page1: document.getElementById('Page_1'),
      page2: document.getElementById('Page_2'),
      page3: document.getElementById('Page_3'),
      page4: document.getElementById('Page_4'),
      page5: document.getElementById('Page_5'),
      page6: document.getElementById('Page_6'),
    };
  });

  function preventDefaultForScrollKeys(e) {
    if (e.keyCode in [37, 38, 39, 40]) {
      e.preventDefault();
      return false;
    }
  }

  let supportsPassive = false;
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

  function wheelBlock(e) {
    if (status === 7 && e.deltaY + window.scrollY >= setTop.page7) return;
    e.preventDefault();
    if (throttling) {
      throttling = true;
      pageMove(e.deltaY > 0);
    }
  }

  function pageMove(isdown) {
    if (isdown) {
      status += 1;
      if (status !== 7) setElement['page' + status].style.display = 'flex';
      setTimeout(() => {
        window.scrollTo({
          top: setTop['page' + status],
          behavior: 'smooth',
        });
      }, 0);
      setTimeout(() => {
        throttling = false;
      }, 2000);
    } else {
      if (status === 1) {
        throttling = false;
      } else {
        status -= 1;
        setTimeout(() => {
          window.scrollTo({
            top: setTop['page' + status],
            behavior: 'smooth',
          });
        }, 0);
        setTimeout(() => {
          throttling = false;
        }, 2000);
      }
    }
  }

  function touchBlock(e) {
    if (status === 7 && window.scrollY >= setTop.page7) return;
    e.preventDefault();
  }

  let wheelOpt = supportsPassive ? { passive: false, cancelable: true } : false;
  let wheelEvent =
    'onwheel' in document.createElement('div') ? 'wheel' : 'mousewheel';
  // call this to Disable
  function disableScroll() {
    window.addEventListener(wheelEvent, wheelBlock, wheelOpt); // modern desktop
    window.addEventListener('touchmove', touchBlock, wheelOpt); // mobile
    window.addEventListener('keydown', preventDefaultForScrollKeys, false);

    window.addEventListener('touchstart', (e) => {
      prevMobile = e.touches[0].clientY;
    });

    window.addEventListener('touchend', (e) => {
      if (throttling) return;
      nextMobile = e.changedTouches[0].clientY;
      if (prevMobile > nextMobile + 5) {
        throttling = true;
        pageMove(true);
      } else if (prevMobile < nextMobile - 5) {
        if (
          status === 7 &&
          window.scrollY + prevMobile - nextMobile > setTop.page7
        )
          return;
        throttling = true;
        pageMove(false);
      }
    });
  }

  function enableScroll() {
    window.removeEventListener(wheelEvent, wheelBlock, wheelOpt); // modern desktop
    // window.removeEventListener('touchmove', touchBlock, wheelOpt); // mobile
  }
})();
