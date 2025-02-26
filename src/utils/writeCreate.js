// POST 데이터 파싱을 위한 querystring 모듈 불러오기
import qs from "querystring";
// 파일 시스템 활용을 위한 라이브러리 불러오기
import fs from "fs";
// content-type 상수 데이터 불러오기
import CONTENT_TYPE from "../constants/contentTypeConstants.js";
// 만든 함수 가져오기
import loadFromJSON from "./loadFromJson.js";
// JSON 파일에 저장하는 로직 불러오기
import saveToJSON from "./saveToJson.js";
// 데이터 유효성 검사하는 함수 불러오기
import dataCheck from "./dataCheck.js";
import writePost from "../functions/write.js";

const errorPage = fs.readFileSync('./views/error.html', 'utf-8'); // 에러페이지

function writeCreate(request, response) {
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
}

export default writeCreate;