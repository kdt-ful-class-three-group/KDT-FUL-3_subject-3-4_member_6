import http from 'http';
// 환경변수 env 활용하기 위한 라이브러리 불러오기
import dotenv from 'dotenv';

// * 서버 생성하기
const server = http.createServer(function(request, response) {
  const methodUrl = request.method; // method 형식 불러오는 변수
  const parsedUrl = request.url.split('?'); // url 형식 뒤에 파라미터 가져오는 것을 ? 기준으로 짜른 변수
  const pathName = parsedUrl[0]; // url 형식 뒤에 ? 기준으로 쪼개진 것 중 맨 처음 url 값. 기존 주소 변수
  // * GET 요청 처리하기
  if (methodUrl === "GET") {
    // ? 기본 index(main) 페이지라면
    if (pathName === "/") {

    // ? 글 목록 list 페이지라면
    } else if (pathName === "/list") {

    // ? 글 상세 페이지라면
    } else if (pathName === "/post") {
      
    }
  }
});

// dotenv 패키지 불러오기
dotenv.config();
// PORT 번호 .env 에서 가져오기
const PORT = process.env.PORT;
// * 서버 오픈하기
server.listen(PORT, function() {
  console.log("성공적으로 http://localhost:" + PORT + " 서버가 오픈되었습니다.");
});