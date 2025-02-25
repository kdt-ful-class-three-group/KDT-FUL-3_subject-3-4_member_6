// fs 모듈 활용을 위해 불러오기
import fs from 'fs';
// 경로제어를 위해 path 모듈 불러오기
import path from 'path';
// JSON 파일로 저장시키는 로직 불러오기
import saveToJSON from './saveToJson.js';
// 게시글 데이터 불러오기
import posts from '../storage/postsData.js';

function loadFromJSON(callback) {
  const __dirname = path.resolve();
  const filePath = path.join(__dirname, "posts.json");
  fs.readFile(filePath, "utf8", function (error, data) {
    if (error) {
      // ? filePath에 posts.json 파일이 존재하지 않는다면
      if (error.code === "ENOENT") {
        // * postsData 값을 JSON 파일로 만들어 저장시키는 함수 불러오기
        saveToJSON(posts, function (saveError) {
          if (saveError) {
            callback(saveError);
          } else {
            callback(null, posts);
          }
        });
      } else {
        callback(error);
      }
    } else {
      // TODO. JSON.parse(str, [reviver]) : JSON으로 인코딩 된 객체를 다시 객체로 디코딩
      // ? str : JSON 형태의 문자열
      // ? reviver : 모든(key, value) 쌍을 대상으로 호출되는 function(key, value) 형태의 함수로 값을 변경 
      callback(null, JSON.parse(data));
    }
  });
}

export default loadFromJSON;