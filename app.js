import http from 'http';
// 파일 시스템 활용을 위한 라이브러리 불러오기
import fs from 'fs';
// content-type 상수 데이터 불러오기
import CONTENT_TYPE from './src/constants/contentTypeConstants.js';
// JSON 파일 불러오는 로직 불러오기
import loadFromJSON from './src/utils/loadFromJson.js';
// POST 데이터 파싱을 위한 querystring 모듈 불러오기
import qs from 'querystring';
// JSON 파일에 저장하는 로직 불러오기
import saveToJSON from './src/utils/saveToJson.js';
// 화면을 보이게 해주는 모듈 JS 파일들 불러오기
import listPosts from './src/functions/list.js';
import selectPosts from './src/functions/post.js';
import writePost from './src/functions/write.js';
// 데이터 유효성 검사하는 로직 불러오기
import dataCheck from './src/utils/dataCheck.js';

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
      let body = ""; // 요청 데이터를 문자열로 정리하기 위한 임시 변수
      // * 요청 데이터를 불러와 임시 변수 body에 저장하기
      request.on("data", function (chunk) {
        body = body + chunk;
      });
      // * 쿼리스트링을 이용해 새롭게 작성한 게시글 내용을 파싱해 데이터에 저장하기
      request.on("end", function () {
        const postData = qs.parse(body);
        loadFromJSON(function (error, posts) {
          // ! 에러라면 500 서버 문제 발생 에러 페이지 표기하기
          if (error === true) {
            response.writeHead(500, CONTENT_TYPE.HTML);
            response.end(errorPage);
          // ? 새로운 포스트 Create 하기
          } else {
            /**
             * TODO. 2025-02-25 <데이터 로직 변경>
             * TODO. 삭제 기능 추가로 인해 id 를 posts.length + 1 이 아닌, posts의 맨 마지막 데이터 id에 +1 을 하는 로직으로 변경해야 함!
             * TODO. posts가 아무것도 존재하지 않을 때 (모든 데이터를 삭제했을 경우)의 id값은 1로 고정되게 들어가는 변수가 필요
             */
            // * posts가 아무것도 존재하지 않을때의 id 값에 대한 로직 추가
            let postId; // id 값 변수 만들기
            if (posts.length === 0) { // ! posts 배열에 아무것도 존재하지 않는다면
              postId = 1; // id 를 1로 새롭게 부여하기
            } else {
              postId = posts[posts.length - 1].id + 1; // 아니라면 맨 마지막 값의 id 에 +1 하기
            }
            // 새로운 게시글에 대한 정보를 newPost 변수에 객체로 추가
            const newPost = {
              id: postId,
              name: postData.name,
              content: postData.content
            };
            // * 데이터 유효성 검사하기
            let errorMsg = "";
            let updateFlg = false;
            errorMsg = dataCheck(posts, newPost, updateFlg);
            if (errorMsg !== "") {
              let writePage = writePost(errorMsg);
              return response.end(writePage);
            } else {
              posts.push(newPost); // 원본 배열인 게시글들 목록에 새로운 게시글 내용 추가
            }
            // * 새로운 게시글을 JSON 파일에도 추가하기
            saveToJSON(posts, function (saveError) {
              // ! 에러라면 500 서버 문제 발생 에러 페이지 표기하기
              if (saveError === true) {
                response.writeHead(500, CONTENT_TYPE.HTML);
                response.end(errorPage);
              // ? 문제없이 JSON 파일이 만들어졌다면 /list 로 페이지 이동하기
              } else {
                response.writeHead(302, { location: "/list" });
                response.end();
              }
            })
          }
        });
      })
    // ? 글 수정을 눌렀다면
    } else if (request.url === `/post?${parsedUrl[1]}`) {
      let body = ""; // 요청 데이터를 문자열로 정리하기 위한 임시 변수
      // * 요청 데이터를 불러와 임시 변수 body에 저장하기
      request.on("data", function (chunk) {
        body = body + chunk;
      });
      request.on("end", function () {
        const updateData = qs.parse(body);
        loadFromJSON(function (error, posts) {
          // ! 에러라면 500 서버 문제 발생 에러 페이지 표기하기
          if (error === true) {
            response.writeHead(500, CONTENT_TYPE.HTML);
            response.end(errorPage);
          // ? 수정한 포스트를 Update 하기
          } else {
            // 수정할 정보를 updatePost 변수에 객체로 추가
            const updatePost = {
              id: Number(updateData.id),
              name: updateData.name,
              content: updateData.content
            };
            /**
             * TODO. 2025-02-25 <데이터 로직 변경>
             * TODO. updatePost.id - 1 이 아닌, 해당 데이터의 index를 활용하기위해 forEach() 사용하기
             */
            // * 데이터 유효성 검사하기
            let errorMsg = "";
            let updateFlg = true; // 수정하기 부분이기 때문에 true 지정하기
            errorMsg = dataCheck(posts, updatePost, updateFlg);
            if (errorMsg !== "") {
              let postPage = selectPosts(posts, parsedUrl[1], errorMsg);
              return response.end(postPage);
            } else {
              posts.forEach((list, index) => {
                if (list.id == updatePost.id) {
                  posts.splice(index, 1, updatePost); // 원본 배열인 게시글들 목록에 수정할 게시글 넣기
                  return;
                }
              });
            }
            // * 수정된 게시글 배열을 JSON 파일에도 수정하기
            saveToJSON(posts, function (saveError) {
              // ! 에러라면 500 서버 문제 발생 에러 페이지 표기하기
              if (saveError === true) {
                response.writeHead(500, CONTENT_TYPE.HTML);
                response.end(errorPage);
              // ? 문제없이 JSON 파일이 만들어졌다면 /list 로 페이지 이동하기
              } else {
                response.writeHead(302, { location: "/list" });
                response.end();
              }
            })
          }
        });
      });
    // ? 포스트 삭제하기를 눌렀다면
    } else if (request.url === `/delete?${parsedUrl[1]}`) {
      let body = ""; // 요청 데이터를 문자열로 정리하기 위한 임시 변수
      // * 요청 데이터를 불러와 임시 변수 body에 저장하기
      request.on("data", function (chunk) {
        body = body + chunk;
      });
      request.on("end", function () {
        const deleteData = qs.parse(body);
        loadFromJSON(function (error, posts) {
          // ! 에러라면 500 서버 문제 발생 에러 페이지 표기하기
          if (error === true) {
            response.writeHead(500, CONTENT_TYPE.HTML);
            response.end(errorPage);
          // ? 삭제할 포스트를 Delete 하기
          } else {
            /**
             * TODO. 2025-02-25 <데이터 로직 변경>
             * TODO. deleteIndex 방법 말고 위에서 가져온 삭제할 포스트 정보를 이용해 filter()로 삭제시키기
             */
            // * 원본배열의 값이 '삭제할 데이터'가 아닌 경우에만 해당 데이터들을 가지고 새로운 배열을 만듦
            let filterdPosts = posts.filter((data) => data.id != deleteData.id);
            // * 데이터 삭제 후 수정된 게시글 배열을 JSON 파일에도 수정하기
            saveToJSON(filterdPosts, function (saveError) {
              // ! 에러라면 500 서버 문제 발생 에러 페이지 표기하기
              if (saveError === true) {
                response.writeHead(500, CONTENT_TYPE.HTML);
                response.end(errorPage);
              // ? 문제없이 JSON 파일이 만들어졌다면 /list 로 페이지 이동하기
              } else {
                response.writeHead(302, { location: "/list" });
                response.end();
              }
            })
          }
        });
      });
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