import styles from '../../styles/Main.module.css';
import Image from 'next/Image';

export default function Main() {
  return (
    <main className={styles.container}>
      <div className={styles.bgFirst}></div>
      <div className={styles.bgSecond}>
        <Image
          width="1920"
          height="1080"
          layout="responsive"
          src="/main/main_first_1.png"
          alt="main first first"
        ></Image>
        <Image
          width="1920"
          height="1080"
          layout="responsive"
          src="/main/main_first_2.png"
          alt="main first second"
        ></Image>
        <Image
          width="1920"
          height="1080"
          layout="responsive"
          src="/main/main_first_3.png"
          alt="main first third"
        ></Image>
        <Image
          width="1920"
          height="1080"
          layout="responsive"
          src="/main/main_second_1.png"
          alt="main second first"
        ></Image>
        <Image
          width="1920"
          height="1080"
          layout="responsive"
          src="/main/main_second_2.png"
          alt="main second second"
        ></Image>
      </div>
      <div className={styles.bgThird}></div>
      {/* <Image
        src="/main/main_2.png"
        layout="responsive"
        width="1920"
        height="3481"
        alt="first main"
      ></Image>
      <Image
        src="/main/main_3.png"
        layout="responsive"
        width="1920"
        height="2082"
        alt="first main"
      ></Image>
      <Image
        src="/main/main_4.png"
        layout="responsive"
        width="1920"
        height="2082"
        alt="first main"
      ></Image>
      <Image
        src="/main/main_5.png"
        layout="responsive"
        width="1920"
        height="2082"
        alt="first main"
      ></Image>
      <Image
        src="/main/main_6.png"
        layout="responsive"
        width="1920"
        height="2082"
        alt="first main"
      ></Image> */}
    </main>
  );
}
