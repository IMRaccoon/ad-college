(function () {
  //   document.location.href = '/main';
  let pageable, lastTop;
  window.addEventListener('load', () => {
    if (document.location.hash !== '') {
      document.location.hash = '';
    }
    pageable = pageAction();
  });

  function pageAction() {
    return new Pageable('#container', {
      childSelector: '[data-anchor]', // CSS3 selector string for the pages
      pips: false, // display the pips
      animation: 700, // the duration in ms of the scroll animation
      delay: 0, // the delay in ms before the scroll animation starts
      throttle: 50, // the interval in ms that the resize callback is fired
      orientation: 'vertical', // or horizontal
      swipeThreshold: 50, // swipe / mouse drag distance (px) before firing the page change event
      freeScroll: false, // allow manual scrolling when dragging instead of automatically moving to next page
      navPrevEl: false, // define an element to use to scroll to the previous page (CSS3 selector string or Element reference)
      navNextEl: false, // define an element to use to scroll to the next page (CSS3 selector string or Element reference)
      infinite: false, // enable infinite scrolling (from 0.4.0)
      slideshow: false,
      events: {
        wheel: true, // enable / disable mousewheel scrolling
        mouse: true, // enable / disable mouse drag scrolling
        touch: true, // enable / disable touch / swipe scrolling
        keydown: true, // enable / disable keyboard navigation
      },
      easing: function (currentTime, startPos, endPos, interval) {
        // the easing function used for the scroll animation
        return (
          -endPos * (currentTime /= interval) * (currentTime - 2) + startPos
        );
      },
      onUpdate: function () {},
      onBeforeStart: function () {
        // do something before scrolling begins
      },
      onStart: function (turn) {
        console.log(turn);
        if (turn === 'page-2') {
          document.getElementById('first-text').style.display = 'block';
          document.getElementById('first-letter').style.display = 'block';
        } else if (turn === 'page-3') {
          document.getElementById('second-text').style.display = 'block';
        } else if (turn === 'page-4') {
          document.getElementById('third-text').style.display = 'block';
        } else if (turn === 'page-5') {
          document.getElementById('fourth-text').style.display = 'block';
        } else if (turn === 'page-6') {
          document.getElementById('fifth-text').style.display = 'block';
        }
        // do something when scrolling begins
      },
      onScroll: function () {
        // do something during scroll
      },
      onFinish: function (data) {
        if (data.index === 6) {
          limitation(data);
        }
      },
    });
  }

  function limitation(data) {
    console.log(data);
    lastTop = data.scrolled;
    pageable.freeScroll = true;
    pageable.destroy();
    window.addEventListener('scroll', scrollAction);
  }

  function scrollAction() {
    if (window.scrollY < lastTop) {
      pageable.init();
      window.removeEventListener('scroll', scrollAction);
    }
  }
})();
