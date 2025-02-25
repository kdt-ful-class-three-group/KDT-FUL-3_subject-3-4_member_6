// * null값 체크하는 함수
// ? 반환값 : String 문자열 형태의 에러 메세지(msg)
function nullCheck(inputData) {
  let msg = "";
  if (inputData === "") {
    msg = "이름을 작성해 주세요.";
  }
  return msg;
}
// * 같은 값이 들어왔는지 체크하는 함수 ex:같은 name 들어오는거 방지 체크
// ? 반환값 : String 문자열 형태의 에러 메세지(msg)
function sameDataCheck(originData, inputData) {
  let msg = "";
  if (originData === inputData) {
    msg = "같은 이름이 존재합니다.";
  }
  return msg;
}
// * 이름에 대한 데이터 유효성 검사 함수
// ? 반환값 : String 문자열 형태의 에러 메세지(msg)
function nameCheck(inputName) {
  let msg = "";
  if (/\d/.test(inputName)) { // 이름에 숫자가 포함되어 있다면
    msg = "이름에 숫자가 포함되어 있습니다.";
  } else if (/\s/g.test(inputName)) { // 이름에 공백이 존재한다면
    msg = "이름에 공백이 존재합니다.";
  }
  return msg;
}

// * 데이터 유효성 동시에 검사하는 함수 : 디폴트 함수
// ? 반환값 : String 문자열 형태의 에러 메세지(errorMsg)
function dataCheck(originData, inputData, updateFlg) {
  let errorMsg = "";
  errorMsg = nullCheck(inputData.name);
  if (errorMsg === "") { // ! 들어온 이름값이 null 이 아니라면
    errorMsg = nameCheck(inputData.name);
    if (errorMsg === "") { // ! 들어온 이름값에 숫자나 공백이 포함된게 아니라면
      if (updateFlg === false) { // * 상세보기 화면에서 <수정하기>를 누른게 아니라면
        originData.some((data) => {
          errorMsg = sameDataCheck(data.name, inputData.name);
          if (errorMsg !== "") { // ! 들어온 이름값과 원본 배열안의 이름값이 일치하는게 있다면
            return true;
          }
        });
      }
    }
  }
  return errorMsg;
}

export default dataCheck;