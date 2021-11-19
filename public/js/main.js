(function () {
  let status = 1;
  let moving = false;
  let throttling;
  let setElement = {};
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

    // window.addEventListener('touchstart', (e) => {
    //   prevMobile = e.touches[0].clientY;
    // });

    // window.addEventListener('touchend', (e) => {
    //   nextMobile = e.changedTouches[0].clientY;
    //   if (prevMobile > nextMobile + 5) {
    //     getDirection(true, e);
    //   } else if (prevMobile < nextMobile - 5) {
    //     getDirection(false, e);
    //   }
    // });
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

  let wheelOpt = supportsPassive ? { passive: false } : false;
  let wheelEvent =
    'onwheel' in document.createElement('div') ? 'wheel' : 'mousewheel';

  function touchBlock(e) {
    if (status === 7 && e.deltaY + window.scrollY >= setTop.page7) return;
    e.preventDefault();
    if (throttling) {
      e.stopImmediatePropagation();
    } else {
      throttling = true;
      pageMove(e.deltaY > 0);
    }
  }

  function pageMove(isdown) {
    if (isdown) {
      status += 1;
      if (status !== 7) setElement['page' + status].style.display = 'flex';
      window.scrollTo({
        top: setTop['page' + status],
        behavior: 'smooth',
      });
      setTimeout(() => {
        throttling = false;
      }, 2000);
    } else {
      if (status === 1) {
        throttling = false;
      } else {
        status -= 1;
        window.scrollTo({
          top: setTop['page' + status],
          behavior: 'smooth',
        });
        setTimeout(() => {
          throttling = false;
        }, 2000);
      }
    }
  }

  // call this to Disable
  function disableScroll() {
    window.addEventListener(wheelEvent, touchBlock, wheelOpt); // modern desktop
    // window.addEventListener('touchmove', touchBlock, wheelOpt); // mobile
    window.addEventListener('keydown', preventDefaultForScrollKeys, false);
  }

  function enableScroll() {
    window.removeEventListener(wheelEvent, touchBlock, wheelOpt); // modern desktop
    // window.removeEventListener('touchmove', touchBlock, wheelOpt); // mobile
  }
})();

// window.addEventListener('load', () => {
//   setTimeout(() => {
//     window.scrollTo(0, 0);
//     disableScroll();
//   }, 100);

//   window.addEventListener('touchstart', (e) => {
//     prevMobile = e.touches[0].clientY;
//   });

//   window.addEventListener('touchend', (e) => {
//     nextMobile = e.changedTouches[0].clientY;
//     if (prevMobile > nextMobile + 5) {
//       getDirection(true, e);
//     } else if (prevMobile < nextMobile - 5) {
//       getDirection(false, e);
//     }
//   });

//   page1 = document.getElementById('Page_1');
//   page2 = document.getElementById('Page_2');
//   page3 = document.getElementById('Page_3');
//   page4 = document.getElementById('Page_4');
//   page5 = document.getElementById('Page_5');
//   page6 = document.getElementById('Page_6');
//   page1Top = 0;
//   page2Top = window.innerHeight;
//   page3Top = window.innerHeight * 2;
//   page4Top = window.innerHeight * 3;
//   page5Top = window.innerHeight * 4;
//   page6Top = window.innerHeight * 5;
//   page7Top = window.innerHeight * 6;
// });

// var keys = { 37: 1, 38: 1, 39: 1, 40: 1 };

// function preventDefaultCom(e) {
//   console.log('?');
//   if (status === 7) {
//     let checkScroll = setInterval(() => {
//       if (window.scrollY < page7Top) {
//         clearInterval(checkScroll);
//         moving = true;
//         scrollTo(page6Top).then((_) => {
//           disableScroll();
//           status = 6;
//         });
//       }
//     }, 100);
//   } else {
//     e.preventDefault();
//     if (moving) return;
//     moving = true;
//     getDirection(e.deltaY > 0);
//   }
// }

// function getDirection(isdown, e = null) {
//   if (status === 1) {
//     if (isdown) {
//       scrollTo(page2Top).then((_) => (status = 2));
//       page2.style.display = 'flex';
//     }
//   } else if (status === 2) {
//     if (isdown) {
//       scrollTo(page3Top).then((_) => (status = 3));
//       page3.style.display = 'flex';
//     } else {
//       scrollTo(page1Top).then((_) => (status = 1));
//     }
//   } else if (status === 3) {
//     if (isdown) {
//       scrollTo(page4Top).then((_) => (status = 4));
//       page4.style.display = 'flex';
//     } else {
//       scrollTo(page2Top).then((_) => (status = 2));
//     }
//   } else if (status === 4) {
//     if (isdown) {
//       scrollTo(page5Top).then((_) => (status = 5));
//       page5.style.display = 'flex';
//     } else {
//       scrollTo(page3Top).then((_) => (status = 3));
//     }
//   } else if (status === 5) {
//     if (isdown) {
//       scrollTo(page6Top).then((_) => (status = 6));
//       page6.style.display = 'flex';
//     } else {
//       scrollTo(page4Top).then((_) => (status = 4));
//     }
//   } else if (status === 6) {
//     if (isdown) {
//       scrollTo(page7Top).then((_) => {
//         enableScroll();
//         status = 7;
//         if (e != null) {
//           let checkScroll = setInterval(() => {
//             if (window.scrollY < page7Top) {
//               clearInterval(checkScroll);
//               disableScroll();
//               scrollTo(page6Top).then((_) => {
//                 moving = true;
//                 status = 6;
//               });
//             }
//           }, 100);
//         }
//       });
//     } else {
//       scrollTo(page5Top).then((_) => (status = 5));
//     }
//   }
// }

// function scrollTo(to, func = () => null) {
//   return new Promise((resolve, reject) => {
//     window.scrollTo({ top: to, behavior: 'smooth' });
//     setTimeout(() => {
//       moving = false;
//       func();
//       resolve();
//     }, 1000);
//   });
// }

// function preventDefaultForScrollKeys(e) {
//   if (keys[e.keyCode]) {
//     e.preventDefault();
//     return false;
//   }
// }

// var supportsPassive = false;
// try {
//   window.addEventListener(
//     'test',
//     null,
//     Object.defineProperty({}, 'passive', {
//       get: function () {
//         supportsPassive = true;
//       },
//     }),
//   );
// } catch (e) {}

// var wheelOpt = supportsPassive ? { passive: false } : false;
// var wheelEvent =
//   'onwheel' in document.createElement('div') ? 'wheel' : 'mousewheel';
// console.log(wheelEvent);
// function touchBlock(e) {
//   e.preventDefault();
// }

// // call this to Disable
// function disableScroll() {
//   window.addEventListener('DOMMouseScroll', preventDefaultCom, false); // older FF
//   window.addEventListener(wheelEvent, preventDefaultCom, wheelOpt); // modern desktop
//   window.addEventListener('touchmove', touchBlock, wheelOpt); // mobile
//   window.addEventListener('keydown', preventDefaultForScrollKeys, false);
// }

// function enableScroll() {
//   window.removeEventListener('DOMMouseScroll', preventDefaultCom, false); // older FF
//   window.removeEventListener(wheelEvent, preventDefaultCom, wheelOpt); // modern desktop
//   window.removeEventListener('touchmove', touchBlock, wheelOpt); // mobile
//   window.removeEventListener('keydown', preventDefaultForScrollKeys, false);
// }
