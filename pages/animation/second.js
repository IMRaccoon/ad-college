/* eslint-disable @next/next/no-img-element */
/* eslint-disable @next/next/no-sync-scripts */

import styled from '../../styles/AnimationSecond.module.css';

export default function Second() {
  return (
    <>
      <script type="text/javascript" src="/js/ticket.js" />
      <main className={styled.container}>
        <div className={styled.scroll_wrapper} id="ticket_wrapper">
          <img
            className={styled.pack_in}
            id="pack_in"
            src="/team/7/pack_in.png"
            alt="pack in"
            width="1064"
            height="252"
          />
          <img
            className={styled.pack_out}
            id="pack_out"
            src="/team/7/pack_out.png"
            alt="pack out"
          />
          <img
            className={styled.ticket}
            id="ticket"
            src="/team/7/ticket.png"
            alt="ticket"
            width="973"
            height="363"
          />
        </div>
      </main>
    </>
  );
}
