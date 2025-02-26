import head from "../atoms/html-head.js";
import header from "../atoms/header.js";
import footer from "../atoms/footer.js";

/**
 * @description 포스트 작성 페이지를 가져오는 함수
 * @param {string} dataCheckMsg 데이터 유효성 검사 메세지
 * @return 글 작성 페이지 반환
 */
function writePost(dataCheckMsg) {
  let writePage = `
  <!DOCTYPE html>
  <html lang="en">
  ${head("📝게시글 작성 페이지", "../public/css/common.css")}
  <body>
    <div id="root">
      ${header("📝게시글 작성")}
      <article class="display-flex justify-center">
        <form action="/write" method="post">
          <span>이름 : </span>
          <input type="text" name="name" placeholder="이름을 입력하세요.">
          <span>내용 : </span>
          <input type="text" name="content" placeholder="내용을 입력하세요.">
          <p class="color-red">${dataCheckMsg}</p>
          <div id="btn-set" class="text-center pd-1">
            <button type="submit">작성</button>
            <button type="reset">초기화</button>
            <button type="button" onclick="location.href = '/list'">취소</button>
          </div>
        </form>
      </article>
      ${footer()}
    </div>
  </body>
  </html>`;

  return writePage;
}

export default writePost;