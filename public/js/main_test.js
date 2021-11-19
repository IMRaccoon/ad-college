(function () {
  let vh = 0;
  let status = 1;
  let throttling = false;
  let pages = {};

  window.addEventListener('load', () => {
    window.removeEventListener('keydown', preventDefaultForScrollKeys, false);
    appHeight();

    pages = {
      1: document.getElementById('Page_1'),
      2: document.getElementById('Page_2'),
      3: document.getElementById('Page_3'),
      4: document.getElementById('Page_4'),
      5: document.getElementById('Page_5'),
      6: document.getElementById('Page_6'),
    };

    window.addEventListener('message', (e) => {
      if (e.data === 'restart') {
        disableScroll();
        status = 6;
        pages[status].dataset.finish = '';
      } else if (e.data === 'end') {
        status = 6;
        pages[1].style.display = 'none';
        pages[6].style.display = 'flex';
        pageMove(true);
        enableScroll();
      } else {
        disableScroll();
      }
    });
  });

  const appHeight = () => {
    vh = window.innerHeight * 0.01;
    document.documentElement.style.setProperty('--vh', `${vh}px`);
  };

  function preventDefaultForScrollKeys(e) {
    if (e.keyCode in [37, 38, 39, 40]) {
      e.preventDefault();
      return false;
    }
  }

  function wheelBlock(e) {
    e.preventDefault();
    if (!throttling) {
      throttling = true;
      pageMove(e.deltaY > 0);
    }
  }

  function pageMove(isdown) {
    if (isdown) {
      if (status < 6) {
        pages[status].dataset.finish = 'true';
        pages[++status].style.display = 'flex';
        setTimeout(() => {
          pages[status - 1].style.display = 'none';
        }, 1000);
        setTimeout(() => {
          throttling = false;
        }, 2000);
      } else {
        status = 7;
        throttling = false;
        enableScroll();
        setTimeout(() => {
          window.scrollTo({ top: window.innerHeight, behavior: 'smooth' });
        }, 10);
      }
    } else {
      if (status > 1) {
        pages[status].style.display = 'none';
        pages[status - 1].dataset.finish = '';
        pages[--status].style.display = 'flex';
        setTimeout(() => {
          throttling = false;
        }, 2000);
      } else {
        throttling = false;
      }
    }
  }

  function outsideCheck(e) {
    e.preventDefault();
    // if (e.deltaY < 0 && window.scrollY < window.innerHeight / 2) {
    //   disableScroll();
    //   status = 6;
    //   pages[status].dataset.finish = '';
    //   setTimeout(() => {
    //     window.scrollTo({ top: 0, behavior: 'smooth' });
    //   }, 10);
    // }
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
  let wheelOpt = supportsPassive ? { passive: false, cancelable: true } : false;
  let wheelEvent =
    'onwheel' in document.createElement('div') ? 'wheel' : 'mousewheel';
  // call this to Disable
  function disableScroll() {
    window.removeEventListener(wheelEvent, outsideCheck, wheelOpt);
    window.addEventListener(wheelEvent, wheelBlock, wheelOpt);
  }

  function enableScroll() {
    window.removeEventListener(wheelEvent, wheelBlock, wheelOpt);
    window.addEventListener(wheelEvent, outsideCheck, wheelOpt);
    window.parent.postMessage('finish', '*');
  }
})();
