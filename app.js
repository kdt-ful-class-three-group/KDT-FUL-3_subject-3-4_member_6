import http from 'http';
// 파일 시스템 활용을 위한 라이브러리 불러오기
import fs from 'fs';
// 게시글 데이터 불러오기
import posts from './src/storage/postsData.js';
// content-type 상수 데이터 불러오기
import CONTENT_TYPE from './src/constants/contentTypeConstants.js';
// JSON 파일 불러오는 로직 불러오기
import loadFromJSON from './src/functions/loadFromJson.js';
// POST 데이터 파싱을 위한 querystring 모듈 불러오기
import qs from 'querystring';
// JSON 파일에 저장하는 로직 불러오기
import saveToJSON from './src/functions/saveToJson.js';

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
      const listPage = fs.readFileSync('./views/list.html', 'utf-8'); // list 페이지 읽어오기
      response.writeHead(200, CONTENT_TYPE.HTML);
      // TODO. posts 파일을 가져와 list.html에 정보를 뿌릴 수 있게 조사하기
      loadFromJSON(function (error, posts) {
        if (error === true) {
          response.end(errorPage);
        } else {
          response.end(listPage);
        }
      });
    // ? 글 상세 페이지라면
    // TODO. 상세 페이지이기 때문에 뒤에 게시글id를 가지고 와야 보여줄 수 있다. ex: /post/{id}
    } else if (pathName === "/post") {
      
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
      let body = ""; // 요청 데이터를 문자열로 정리하기 위한 임시 변수
      // * 요청 데이터를 불러와 임시 변수 body에 저장하기
      request.on("data", function (chunk) {
        body = body + chunk;
      });
      // * 쿼리스트링을 이용해 새롭게 작성한 게시글 내용을 파싱해 데이터에 저장하기
      request.on("end", function () {
        const postData = qs.parse(body);
        loadFromJSON(function (error, posts) {
          if (error === true) {
            response.writeHead(500, CONTENT_TYPE.HTML);
            response.end(errorPage);
          } else {
            // 새로운 게시글에 대한 정보를 newPost 변수에 객체로 추가
            const newPost = {
              id: posts.length + 1,
              name: postData.name,
              content: postData.content
            };
            posts.push(newPost); // 원본 배열인 게시글들 목록에 새로운 게시글 내용 추가
            // * 새로운 게시글을 JSON 파일에도 추가하기
            saveToJSON(posts, function (saveError) {
              if (saveError === true) {
                response.writeHead(500, CONTENT_TYPE.HTML);
                response.end(errorPage);
              } else {
                response.writeHead(302, { location: "/list" });
                response.end();
              }
            })
          }
        })
      })
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