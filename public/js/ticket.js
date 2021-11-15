let animation_team_7_ticket,
  animation_team_7_packOut,
  animation_team_7_packIn,
  animation_team_7_startY;
let animation_team_7_ticketTop,
  animation_team_7_packOutTop,
  animation_team_7_packInTop;

window.onload = () => {
  animation_team_7_ticket = document.getElementById('animation_team_7_ticket');
  animation_team_7_packOut = document.getElementById(
    'animation_team_7_pack_out',
  );
  animation_team_7_packIn = document.getElementById('animation_team_7_pack_in');

  const animation_team_7_standard = animation_team_7_packOut.offsetWidth / 1064;

  if (animation_team_7_standard === 1) {
    animation_team_7_ticketTop = -300;
    animation_team_7_ticket.style.top = animation_team_7_ticketTop + 'px';
    animation_team_7_packOutTop = 140;
    animation_team_7_packOut.style.top = animation_team_7_packOutTop + 'px';
    animation_team_7_packInTop = 250;
    animation_team_7_packIn.style.top = animation_team_7_packInTop + 'px';
  } else {
    animation_team_7_ticketTop = -250 * (animation_team_7_standard * 1.2);
    animation_team_7_ticket.style.top = animation_team_7_ticketTop + 'px';
    animation_team_7_packOutTop = 140 * animation_team_7_standard;
    animation_team_7_packOut.style.top = animation_team_7_packOutTop + 'px';
    animation_team_7_packInTop = 250 * animation_team_7_standard;
    animation_team_7_packIn.style.top = animation_team_7_packInTop + 'px';
  }

  animation_team_7_startY =
    animation_team_7_packOut.getBoundingClientRect().top -
    document.body.getBoundingClientRect().top;
  window.addEventListener('scroll', getCurrentHeight, true);
};

function getCurrentHeight() {
  let animation_team_7_sub =
    window.scrollY + window.outerHeight / 3 - animation_team_7_startY;

  if (animation_team_7_sub > 0 && animation_team_7_sub < 350) {
    animation_team_7_ticket.style.top =
      animation_team_7_ticketTop + animation_team_7_sub * 0.85 + 'px';
    animation_team_7_packOut.style.top =
      animation_team_7_packOutTop + animation_team_7_sub + 'px';
    animation_team_7_packIn.style.top =
      animation_team_7_packInTop + animation_team_7_sub + 'px';
    animation_team_7_ticket.style.transform =
      'rotate(' + animation_team_7_sub / 24 + 'deg)';
  } else if (animation_team_7_sub <= 0) {
    animation_team_7_ticket.style.top = animation_team_7_ticketTop + 'px';
    animation_team_7_packOut.style.top = animation_team_7_packOutTop + 'px';
    animation_team_7_packIn.style.top = animation_team_7_packInTop + 'px';
    animation_team_7_ticket.style.transform = 'rotate(0deg)';
  } else {
    animation_team_7_ticket.style.top =
      animation_team_7_ticketTop + 350 * 0.85 + 'px';
    animation_team_7_packOut.style.top =
      animation_team_7_packOutTop + 350 + 'px';
    animation_team_7_packIn.style.top = animation_team_7_packInTop + 350 + 'px';
    animation_team_7_ticket.style.transform = 'rotate(14.6deg)';
  }
}
