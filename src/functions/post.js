// * 포스트 상세보기 가져오는 함수
function selectPosts(data, parsedUrl) {
  let inputId = parsedUrl.charAt(parsedUrl.length - 1);
  let selectedPost = data[inputId - 1];
  let htmlPage = `
  <!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <link rel="stylesheet" href="../public/css/common.css">
  <title>📄게시글 상세보기 페이지</title>
</head>
<body>
  <header class="display-flex justify-center">
    <h1>📄게시글 상세보기</h1>
  </header>
  <article class="display-flex justify-center">
    <form action="/post?id=${inputId}" method="post">
      <input type="hidden" name="id" value="${selectedPost.id}">
      <span>이름 : </span>
      <input type="text" name="name" value="${selectedPost.name}" placeholder="이름을 입력하세요.">
      <br>
      <span>내용 : </span>
      <input type="text" name="content" value="${selectedPost.content}" placeholder="내용을 입력하세요.">
      <br>
      <div id="btn-set" class="text-center pd-1">
        <button type="submit">수정하기</button>
        <button type="button" onclick="location.href = '/list'">뒤로가기</button>
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

export default selectPosts;