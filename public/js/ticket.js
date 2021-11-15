let wrapper,
  ticket,
  packOut,
  packIn,
  startY,
  ticketTop,
  packOutTop,
  packInTop,
  offset,
  sub;

(function () {
  function getPosition(element) {
    var yPosition = element.clientHeight / 2;

    while (element) {
      yPosition += element.offsetTop - element.scrollTop + element.clientTop;
      element = element.offsetParent;
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
      offset = 350;
    } else {
      ticketTop = -250 * (standard * 1.2);
      ticket.style.top = ticketTop + 'px';
      packOutTop = 140 * standard;
      packOut.style.top = packOutTop + 'px';
      packInTop = 250 * standard;
      packIn.style.top = packInTop + 'px';
      offset = 250 + 100 * standard;
    }

    startY = getPosition(ticket);
    wrapper.style.marginBottom = offset + 'px';
  }

  function getScrollAnimation() {
    sub = window.scrollY + window.outerHeight / 2 - startY;
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
      ticket.style.transform = 'rotate(14.6deg)';
    }
  }

  window.addEventListener('load', () => {
    setAnimationStart();
    window.addEventListener('scroll', getScrollAnimation, true);
  });

  window.addEventListener('resize', () => {
    setAnimationStart();
  });
})();
