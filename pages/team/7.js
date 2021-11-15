/* eslint-disable @next/next/no-img-element */
import styled from '../../styles/Team_7.module.css';

export default function Page() {
  return (
    <>
      {/* eslint-disable-next-line @next/next/no-sync-scripts */}
      <script type="text/javascript" src="/js/ticket.js"></script>
      <main className={styled.container}>
        {/* <Image
          src="/team/3/header.png"
          width="1920"
          height="128"
          layout="responsive"
          alt="Team3 Header"
        />
        <Image
          src="/team/3/intro.png"
          width="1920"
          height="414"
          layout="responsive"
          alt="Team3 Intro"
        ></Image>
        <Image
          src="/team/3/first_introduce.png"
          width="1920"
          height="2479"
          layout="responsive"
          alt="Team3 First Introduce"
        ></Image>
        <Image
          src="/team/3/first_keytext.png"
          width="1920"
          height="285"
          layout="responsive"
          alt="Team3 First KeyText"
        ></Image>
        <Image
          src="/team/7/ticket_preview.png"
          alt="preview"
          width="1059"
          height="430"
          layout="responsive"
        /> */}
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
        {/* <Image
          src="/team/3/first_content_text.png"
          width="1920"
          height="773"
          layout="responsive"
          alt="Team3 First Content Text"
        ></Image>
        <Image
          src="/team/3/second_introduce.png"
          width="1920"
          height="2308"
          layout="responsive"
          alt="Team3 Second Introduce"
        ></Image>
        <Image
          src="/team/3/second_content_text.png"
          width="1920"
          height="2308"
          layout="responsive"
          alt="Team3 Second Content Text"
        ></Image> */}
      </main>
    </>
  );
}
