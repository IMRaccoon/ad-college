let wrapper,
  ticket,
  packOut,
  packIn,
  startY,
  ticketTop,
  packOutTop,
  packInTop,
  offset,
  sub,
  origin_width;

(function () {
  function getPosition(element) {
    let yPosition = wrapper.offsetHeight + ticketTop - ticket.offsetHeight;
    let p = element.parentElement;

    while (!!p) {
      yPosition += p.offsetTop;
      p = p.parentElement;
    }
    if (window.innerWidth >= 768 && window.innerWidth <= 1024) {
      return yPosition * 0.85;
    }
    return yPosition;
  }

  function setAnimationStart() {
    wrapper = document.getElementById('ticket_wrapper');
    ticket = document.getElementById('ticket');
    packOut = document.getElementById('pack_out');
    packIn = document.getElementById('pack_in');
    const standard = packOut.offsetWidth / 1064;

    if (standard >= 1) {
      ticketTop = -300;
      ticket.style.top = ticketTop + 'px';
      packOutTop = 140;
      packOut.style.top = packOutTop + 'px';
      packInTop = 250;
      packIn.style.top = packInTop + 'px';
      offset = 400;
      wrapper.style.marginBottom = offset + 'px';
    } else {
      ticketTop = -250 * (standard * 1.2);
      ticket.style.top = ticketTop + 'px';
      packOutTop = 140 * standard;
      packOut.style.top = packOutTop + 'px';
      packInTop = 250 * standard;
      packIn.style.top = packInTop + 'px';
      offset = 150 + 250 * standard;
      wrapper.style.marginBottom = offset + 'px';
    }

    startY = getPosition(ticket) - window.innerHeight * 0.4;
  }

  function getScrollAnimation() {
    //  window.outerHeight / 2
    sub = window.scrollY - startY;
    if (sub > 0 && sub < offset) {
      ticket.style.top = ticketTop + sub * 0.85 + 'px';
      packOut.style.top = packOutTop + sub + 'px';
      packIn.style.top = packInTop + sub + 'px';
      ticket.style.transform = 'rotate(' + sub / 24 + 'deg)';
    } else if (sub <= 0) {
      ticket.style.top = ticketTop + 'px';
      packOut.style.top = packOutTop + 'px';
      packIn.style.top = packInTop + 'px';
      ticket.style.transform = 'rotate(0deg)';
    } else {
      ticket.style.top = ticketTop + offset * 0.85 + 'px';
      packOut.style.top = packOutTop + offset + 'px';
      packIn.style.top = packInTop + offset + 'px';
      ticket.style.transform = 'rotate(' + offset / 24 + 'deg)';
    }
  }

  window.addEventListener('load', () => {
    setAnimationStart();
    origin_width = window.outerWidth;
    window.addEventListener('scroll', getScrollAnimation, true);
  });

  window.addEventListener('resize', () => {
    if (origin_width !== window.outerWidth) setAnimationStart();
  });
})();
