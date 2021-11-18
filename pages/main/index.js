/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable @next/next/no-sync-scripts */
/* eslint-disable @next/next/no-img-element */
import styled from '../../styles/Main.module.css';

export default function Main() {
  return (
    <>
      <script
        type="text/javascript"
        src="https://ad-college.vercel.app/js/pageable.js"
      />
      <script
        type="text/javascript"
        src="https://ad-college.vercel.app/js/main.js"
      />
      <main className={styled.background}>
        <div className={styled.container} id="container">
          <div className={styled.intro} data-anchor="Page 1" />
          <div className={styled.pageLayout} data-anchor="Page 2">
            <div className={styled.snow} id="first-background">
              <div className={styled.firstText} id="first-text" />
              <div className={styled.firstLetter} id="first-letter" />
            </div>
          </div>
          <div className={styled.pageLayout} data-anchor="Page 3">
            <div className={styled.snow} id="second-background">
              <div className={styled.secondText} id="second-text" />
            </div>
          </div>
          <div className={styled.pageLayout} data-anchor="Page 4">
            <div className={styled.snow} id="third-background">
              <div className={styled.thirdText} id="third-text" />
            </div>
          </div>
          <div className={styled.pageLayout} data-anchor="Page 5">
            <div className={styled.snow} id="fourth-background">
              <div className={styled.fourthText} id="fourth-text" />
            </div>
          </div>
          <div className={styled.pageLayout} data-anchor="Page 6">
            <div className={styled.snow} id="fifth-background">
              <div className={styled.fifthText} id="fifth-text" />
            </div>
          </div>
          <div className={styled.category} id="category" data-anchor="Page 7" />
        </div>
      </main>
    </>
  );
}
