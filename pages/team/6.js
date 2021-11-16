import styled from '../../styles/Team_6.module.css';
import Image from 'next/image';

export default function Page() {
  return (
    <main className={styled.container}>
      <Image
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
        src="/team/3/first_content.png"
        width="1920"
        height="820"
        layout="responsive"
        alt="Team3 First Content"
      ></Image>
      <Image
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
      <iframe src="/animation/third" className={styled.frame} />
      <Image
        src="/team/3/second_content_text.png"
        width="1920"
        height="2308"
        layout="responsive"
        alt="Team3 Second Content Text"
      ></Image>
    </main>
  );
}
