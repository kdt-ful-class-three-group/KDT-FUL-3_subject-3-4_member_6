import http from 'http';
// 환경변수 env 활용하기 위한 라이브러리 불러오기
import dotenv from 'dotenv';

// * 서버 생성하기
const server = http.createServer(function(request, response) {
  
});

// dotenv 패키지 불러오기
dotenv.config();
// PORT 번호 .env 에서 가져오기
const PORT = process.env.PORT;
// * 서버 오픈하기
server.listen(PORT, function() {
  console.log("성공적으로 http://localhost:" + PORT + " 서버가 오픈되었습니다.");
});