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

const errorPage = fs.readFileSync('./views/error.html', 'utf-8'); // 에러페이지

function postDelete(request, response) {
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
}

export default postDelete;