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
import selectPosts from "../functions/post.js";

const errorPage = fs.readFileSync('./views/error.html', 'utf-8'); // 에러페이지

function postUpdate(request, response, parameter) {
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
          let postPage = selectPosts(posts, parameter, errorMsg);
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
}

export default postUpdate;