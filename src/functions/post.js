// * 포스트 상세보기 가져오는 함수
function selectPosts(data, parsedUrl) {
  let inputId = parsedUrl.charAt(parsedUrl.length - 1); // id값 뽑아내기
  /**
   * TODO. 2025-02-25 <데이터 로직 변경>
   * TODO. 삭제 기능 추가로 인해 data[inputId - 1] 가 아닌, find()를 이용해 선택한 포스트의 아이디값과 일치하는 데이터 가져오기
   */
  let selectedPost = data.find(obj => obj.id == inputId);
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
    <form method="post">
      <input type="hidden" name="id" value="${selectedPost.id}">
      <span>이름 : </span>
      <input type="text" name="name" value="${selectedPost.name}" placeholder="이름을 입력하세요.">
      <br>
      <span>내용 : </span>
      <input type="text" name="content" value="${selectedPost.content}" placeholder="내용을 입력하세요.">
      <br>
      <div id="btn-set" class="text-center pd-1">
        <button type="submit" formaction="/post?id=${inputId}">수정하기</button>
        <button type="submit" formaction="/delete?id=${inputId}">삭제하기</button>
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