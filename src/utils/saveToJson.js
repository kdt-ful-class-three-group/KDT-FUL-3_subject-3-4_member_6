// fs 모듈 활용을 위해 불러오기
import fs from 'fs';
// 경로제어를 위해 path 모듈 불러오기
import path from 'path';

// * posts 관리하기 위해 JSON 파일로 저장해주는 로직 만들기
function saveToJSON(data, callback) {
  /**
   * TODO. 지식 정리하기
   * ? commonjs 타입을 사용할 경우, __dirname 사용이 가능하다.
   * ? module 타입을 사용할 경우, 상기의 __dirname은 사용불가능하며, path.resolve() 로 대체 가능하다.
   * ? 이번 나의 프로젝트는 module 타입이기때문에 path.resolve()를 사용했다.
   */
  // TODO. path.resolve([...paths]) : 인자를 넣으면 경로를 묶어 root 경로를 고려한 새로운 경로를 반환
  // ? -> 만약 어떤 인자도 전달하지 않는다면 현재 working directory 를 반환
  // ? ex: 현재 파일의 경우에는 'D:\ahn\KDT-FUL-3_subject-3-4_member_6' 를 반환
  const __dirname = path.resolve();

  // TODO. path.join([...paths]) : 인자를 넣으면 하나의 경로를 합쳐 반환
  const filePath = path.join(__dirname, "posts.json");

  // * posts 데이터들을 JSON 파일로 만들기
  // TODO. fs.writeFile(file, data[, options], callback);
  // TODO. JSON.stringify(value, replacer, space) : 객체를 JSON 으로 바꿔줌
  // ? ex: 아래의 경우 공백 문자 두 개를 사용하여 들여쓰기 한다는 의미
  fs.writeFile(filePath, JSON.stringify(data, null, 2), "utf8", function (error) {
    if (error) {
      callback(error);
    } else {
      callback(null);
    }
  });
}
// * JSON 저장 로직 내보내기
export default saveToJSON;