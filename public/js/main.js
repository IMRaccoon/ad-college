(function () {
  var m_status = 1;
  var m_throttling = false;
  var m_setElement = {};
  var m_prevMobile, m_nextMobile;
  var m_setTop = {
    page1: 0,
    page2: window.innerHeight,
    page3: window.innerHeight * 2,
    page4: window.innerHeight * 3,
    page5: window.innerHeight * 4,
    page6: window.innerHeight * 5,
    page7: window.innerHeight * 6,
  };
  const m_appHeight = () => {
    var vh = window.innerHeight * 0.01;
    document.documentElement.style.setProperty('--vh', `${vh}px`);
  };

  window.addEventListener('load', () => {
    m_appHeight();
    if (window.scrollY < window.innerHeight * 6) {
      setTimeout(() => {
        window.scrollTo(0, 0);
        disableScrollMobile();
      }, 100);
    } else {
      m_status = 7;
      disableScrollMobile();
    }

    m_setElement = {
      page1: document.getElementById('Page_1'),
      page2: document.getElementById('Page_2'),
      page3: document.getElementById('Page_3'),
      page4: document.getElementById('Page_4'),
      page5: document.getElementById('Page_5'),
      page6: document.getElementById('Page_6'),
    };
  });

  function preventDefaultForScrollKeysMobile(e) {
    if (e.keyCode in [37, 38, 39, 40]) {
      e.preventDefault();
      return false;
    }
  }

  var m_supportsPassive = false;
  try {
    window.addEventListener(
      'test',
      null,
      Object.defineProperty({}, 'passive', {
        get: function () {
          m_supportsPassive = true;
        },
      }),
    );
  } catch (e) {}

  function wheelBlockMobile(e) {
    if (m_status === 7 && e.deltaY + window.scrollY >= m_setTop.page7) return;
    e.preventDefault();
    if (!m_throttling) {
      m_throttling = true;
      pageMoveMobile(e.deltaY > 0);
    }
  }

  function pageMoveMobile(isdown) {
    if (isdown) {
      m_status += 1;
      if (m_status !== 7)
        m_setElement['page' + m_status].style.display = 'flex';
      setTimeout(() => {
        window.scrollTo({
          top: m_setTop['page' + m_status],
          behavior: 'smooth',
        });
      }, 0);
      setTimeout(() => {
        m_throttling = false;
      }, 2000);
    } else {
      if (m_status === 1) {
        m_throttling = false;
      } else {
        m_status -= 1;
        m_setElement['page' + m_status].style.display = 'flex';
        setTimeout(() => {
          window.scrollTo({
            top: m_setTop['page' + m_status],
            behavior: 'smooth',
          });
        }, 0);
        setTimeout(() => {
          m_throttling = false;
        }, 2000);
      }
    }
  }

  function touchBlockMobile(e) {
    if (m_status === 7 && window.scrollY >= m_setTop.page7) return;
    e.preventDefault();
  }

  var m_wheelOpt = m_supportsPassive
    ? { passive: false, cancelable: true }
    : false;
  var m_wheelEvent =
    'onwheel' in document.createElement('div') ? 'wheel' : 'mousewheel';
  // call this to Disable
  function disableScrollMobile() {
    window.addEventListener(m_wheelEvent, wheelBlockMobile, m_wheelOpt); // modern desktop
    window.addEventListener('touchmove', touchBlockMobile, m_wheelOpt); // mobile
    window.addEventListener(
      'keydown',
      preventDefaultForScrollKeysMobile,
      false,
    );

    window.addEventListener('touchstart', (e) => {
      m_prevMobile = e.touches[0].clientY;
    });

    window.addEventListener('touchend', (e) => {
      if (m_throttling) return;
      m_nextMobile = e.changedTouches[0].clientY;
      if (m_prevMobile > m_nextMobile + 5) {
        if (m_status === 7) return;
        m_throttling = true;
        pageMoveMobile(true);
      } else if (m_prevMobile < m_nextMobile - 5) {
        if (
          m_status === 7 &&
          window.scrollY + m_prevMobile - m_nextMobile > m_setTop.page7
        )
          return;
        m_throttling = true;
        pageMoveMobile(false);
      }
    });
  }
})();
