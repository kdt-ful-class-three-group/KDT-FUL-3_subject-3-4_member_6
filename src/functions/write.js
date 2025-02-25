// * 포스트 작성 페이지 가져오는 함수
function writePost() {
  let htmlPage = `
  <!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <link rel="stylesheet" href="../public/css/common.css">
  <title>📝게시글 작성 페이지</title>
</head>
<body>
  <header class="display-flex justify-center">
    <h1>📝게시글 작성</h1>
  </header>
  <article class="display-flex justify-center">
    <form action="/write" method="post">
      <span>이름 : </span>
      <input type="text" name="name" placeholder="이름을 입력하세요.">
      <span>내용 : </span>
      <input type="text" name="content" placeholder="내용을 입력하세요.">
      <div id="btn-set" class="text-center pd-1">
        <button type="submit">작성</button>
        <button type="reset">초기화</button>
        <button type="button" onclick="location.href = '/list'">취소</button>
      </div>
    </form>
  </article>
  <footer class="display-flex justify-center font-small">
    <span>ⓒ made by eunbyul.ahn</span>
  </footer>
</body>
</html>`;
  return htmlPage;
}

export default writePost;