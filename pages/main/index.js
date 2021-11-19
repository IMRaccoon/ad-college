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
      <script type="text/javascript" src="/js/main.js" />
      <div className={styled.background}>
        <div className={styled.container}>
          <div id="Page_1">
            <div className={styled.intro}></div>
          </div>
          <div className={styled.pageLayout}>
            <div className={styled.firstbackground} id="Page_2">
              <div className={styled.firsttext}></div>
              <div className={styled.firstletter}></div>
            </div>
          </div>
          <div className={styled.pageLayout}>
            <div className={styled.secondbackground} id="Page_3">
              <div className={styled.secondtext}></div>
            </div>
          </div>
          <div className={styled.pageLayout}>
            <div className={styled.thirdbackground} id="Page_4">
              <div className={styled.thirdtext}></div>
            </div>
          </div>
          <div className={styled.pageLayout}>
            <div className={styled.fourthbackground} id="Page_5">
              <div className={styled.fourthtext}></div>
            </div>
          </div>
          <div className={styled.pageLayout}>
            <div className={styled.fifthbackground} id="Page_6">
              <div className={styled.fifthtext}></div>
            </div>
          </div>
          <div className={styled.sixthcategory}></div>
        </div>
      </div>
    </>
  );
}
