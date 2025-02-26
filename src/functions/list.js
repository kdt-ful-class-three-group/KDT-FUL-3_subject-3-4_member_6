import head from "../atoms/html-head.js";
import header from "../atoms/header.js";
import footer from "../atoms/footer.js";

/**
 * @description 포스트 리스트 가져오는 함수
 * @param {objArray} data 가공된 posts.json 데이터
 * @return 글 리스트 페이지 반환
 */
function listPosts(data) {
  let listHtml = `<ul class="display-flex align-start flex-column flex-wrap overflow-auto">`;
  data.forEach(element => {
    listHtml += `<li><a href="/post?id=${element.id}">✏️${element.name} : ${element.content}</a></li>`;
  });
  listHtml += `</ul>`;

  let listPage = `
  <!DOCTYPE html>
  <html lang="en">
  ${head("📚게시글 목록 페이지", "../public/css/common.css")}
  <body>
    <div id="root">
      ${header("📚게시글 목록")}
      <article>
        <div id="btn-set" class="text-center pd-1">
          <button type="button" onclick="location.href = '/write'">글쓰기</button>
          <button type="button" onclick="location.href = '/'">홈으로</button>
        </div>
        <div id="list-content" class="display-flex justify-center">
        ${listHtml}
        </div>
      </article>
      ${footer()}
    </div>
  </body>
  </html>`;

  return listPage;
}

export default listPosts;