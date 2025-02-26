import head from "../atoms/html-head.js";
import header from "../atoms/header.js";
import footer from "../atoms/footer.js";

/**
 * @description 포스트 상세보기 페이지를 가져오는 함수
 * @param {objArray} data 가공된 posts.json 데이터
 * @param {string} parsedUrl id=? 형태의 url
 * @param {string} dataCheckMsg 데이터 유효성 검사 메세지
 * @return 글 상세보기 페이지 반환
 */
function selectPosts(data, parsedUrl, dataCheckMsg) {
  let inputId = parsedUrl.split("=")[1]; // id값 뽑아내기
  /**
   * @description find()를 이용해 선택한 포스트의 아이디 값과 일치하는 데이터 가져오기
   * @type {Object}
   */
  let selectedPost = data.find(obj => obj.id == inputId);
  let postPage = `
  <!DOCTYPE html>
  <html lang="en">
  ${head("📄게시글 상세보기 페이지", "../public/css/common.css")}
  <body>
    <div id="root">
      ${header("📄게시글 상세보기")}
      <article class="display-flex justify-center">
        <form method="post">
          <input type="hidden" name="id" value="${selectedPost.id}">
          <span>이름 : </span>
          <input type="text" name="name" value="${selectedPost.name}" placeholder="이름을 입력하세요.">
          <br>
          <span>내용 : </span>
          <input type="text" name="content" value="${selectedPost.content}" placeholder="내용을 입력하세요.">
          <p class="color-red">${dataCheckMsg}</p>
          <div id="btn-set" class="text-center pd-1">
            <button type="submit" formaction="/post?id=${inputId}">수정하기</button>
            <button type="submit" formaction="/delete?id=${inputId}">삭제하기</button>
            <button type="button" onclick="location.href = '/list'">뒤로가기</button>
          </div>
        </form>
      </article>
      ${footer()}
    </div>
  </body>
  </html>`;

  return postPage;
}

export default selectPosts;