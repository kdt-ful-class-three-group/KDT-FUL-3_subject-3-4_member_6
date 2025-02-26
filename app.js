import http from 'http';
// 파일 시스템 활용을 위한 라이브러리 불러오기
import fs from 'fs';
// content-type 상수 데이터 불러오기
import CONTENT_TYPE from './src/constants/contentTypeConstants.js';
// JSON 파일 불러오는 로직 불러오기
import loadFromJSON from './src/utils/loadFromJson.js';
// 화면을 보이게 해주는 모듈 JS 파일들 불러오기
import listPosts from './src/functions/list.js';
import selectPosts from './src/functions/post.js';
import writePost from './src/functions/write.js';
// 글 작성 POST 작업을 도와주는 함수 불러오기
import writeCreate from './src/utils/writeCreate.js';
// 글 수정 POST 작업을 도와주는 함수 불러오기
import postUpdate from './src/utils/postUpdate.js';
// 글 삭제 POST 작업을 도와주는 함수 불러오기
import postDelete from './src/utils/postDelete.js';

// * 서버 생성하기
const server = http.createServer(function(request, response) {
  const methodUrl = request.method; // method 형식 불러오는 변수
  const parsedUrl = request.url.split('?'); // url 형식 뒤에 파라미터 가져오는 것을 ? 기준으로 짜른 변수
  const pathName = parsedUrl[0]; // url 형식 뒤에 ? 기준으로 쪼개진 것 중 맨 처음 url 값. 기존 주소 변수
  const errorPage = fs.readFileSync('./views/error.html', 'utf-8'); // 에러페이지
  // * GET 요청 처리하기
  if (methodUrl === "GET") {
    // ? 기본 index(main) 페이지라면
    if (pathName === "/") {
      const indexPage = fs.readFileSync('./views/index.html', 'utf-8'); // index 페이지 읽어오기
      response.writeHead(200, CONTENT_TYPE.HTML);
      response.end(indexPage);
    // ? 글 목록 list 페이지라면
    } else if (pathName === "/list") {
      response.writeHead(200, CONTENT_TYPE.HTML);
      loadFromJSON(function (error, posts) {
        if (error === true) {
          response.end(errorPage);
        } else {
          let listPage = listPosts(posts); // list 페이지 읽어오기
          response.end(listPage);
        }
      });
    // ? 글 상세 페이지라면
    } else if (pathName === "/post") {
      let blankMsg = "";
      response.writeHead(200, CONTENT_TYPE.HTML);
      loadFromJSON(function (error, posts) {
        if (error === true) {
          response.end(errorPage);
        } else {
          let postPage = selectPosts(posts, parsedUrl[1], blankMsg); // post(상세보기) 페이지 읽어오기
          response.end(postPage);
        }
      });
    // ? 글 작성 페이지라면
    } else if (pathName === "/write") {
      let blankMsg = "";
      let writePage = writePost(blankMsg);
      response.writeHead(200, CONTENT_TYPE.HTML);
      response.end(writePage);
    // ? common.css 불러오기
    } else if (pathName === "/public/css/common.css") {
      const cssPage = fs.readFileSync('public/css/common.css'); // css 페이지 읽어오기
      response.writeHead(200, CONTENT_TYPE.CSS);
      response.end(cssPage);
    // ! 잘못 접근했다면 404 에러 페이지 표기하기
    } else {
      response.writeHead(404, CONTENT_TYPE.HTML); // 잘못 접근하였을 경우
      response.end(errorPage); // 페이지에 Not found 표기하기
    }
  }
  // * POST 요청 처리하기
  if (methodUrl === "POST") {
    // ? 글 작성 write 페이지라면
    if (pathName === "/write") {
      writeCreate(request, response);
    // ? 글 수정을 눌렀다면
    } else if (request.url === `/post?${parsedUrl[1]}`) {
      postUpdate(request, response, parsedUrl[1]);
    // ? 포스트 삭제하기를 눌렀다면
    } else if (request.url === `/delete?${parsedUrl[1]}`) {
      postDelete(request, response);
    // ! 잘못 접근했다면 404 에러 페이지 표기하기  
    } else {
      response.writeHead(404, CONTENT_TYPE.HTML); // 잘못 접근하였을 경우
      response.end(errorPage); // 페이지에 Not found 표기하기
    }
  }
});

// * 서버 오픈하기
server.listen(8000, function() {
  console.log("성공적으로 http://localhost:8000 서버가 오픈되었습니다.");
});