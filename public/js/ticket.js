(function () {
  let ticket, packOut, packIn, startY;
  let ticketTop, packOutTop, packInTop;
  window.onload = () => {
    ticket = document.getElementById('ticket');
    packOut = document.getElementById('pack_out');
    packIn = document.getElementById('pack_in');
    const standard = packOut.offsetWidth / 1064;
    if (standard === 1) {
      ticketTop = -300;
      ticket.style.top = ticketTop + 'px';
      packOutTop = 140;
      packOut.style.top = packOutTop + 'px';
      packInTop = 250;
      packIn.style.top = packInTop + 'px';
    } else {
      ticketTop = -250 * (standard * 1.2);
      console.log(ticketTop);
      ticket.style.top = ticketTop + 'px';
      packOutTop = 140 * standard;
      packOut.style.top = packOutTop + 'px';
      packInTop = 250 * standard;
      packIn.style.top = packInTop + 'px';
    }

    startY =
      packOut.getBoundingClientRect().top -
      document.body.getBoundingClientRect().top;
    window.addEventListener('scroll', getCurrentHeight, true);
  };

  function getCurrentHeight() {
    let sub =
      window.scrollY +
      Math.min(window.outerWidth, window.outerHeight) / 3 -
      startY;
    if (sub > 0 && sub < 350) {
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
      ticket.style.top = ticketTop + 350 * 0.85 + 'px';
      packOut.style.top = packOutTop + 350 + 'px';
      packIn.style.top = packInTop + 350 + 'px';
      ticket.style.transform = 'rotate(14.6deg)';
    }
  }
})();
