// * 포스트 리스트 가져오는 함수
function listPosts(data) {
  let html = `<ul class="display-flex align-start flex-column flex-wrap overflow-auto">`;
  data.forEach(element => {
    html += `<li><a href="/post?id=${element.id}">✏️${element.name} : ${element.content}</a></li>`;
  });
  html += `</ul>`
  let htmlPage = `
  <!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <link rel="stylesheet" href="../public/css/common.css">
  <title>📚게시글 목록 페이지</title>
</head>
<body>
  <div id="root">
    <header class="display-flex justify-center">
      <h1>📚게시글 목록</h1>
    </header>
    <article>
      <div id="btn-set" class="text-center pd-1">
        <button type="button" onclick="location.href = '/write'">글쓰기</button>
        <button type="button" onclick="location.href = '/'">홈으로</button>
      </div>
      <div id="list-content" class="display-flex justify-center">
      ${html}
      </div>
    </article>
    <footer class="display-flex justify-center font-small">
      <span>ⓒ made by eunbyul.ahn</span>
    </footer>
  </div>
</body>
</html>`;
  return htmlPage;
}

export default listPosts;