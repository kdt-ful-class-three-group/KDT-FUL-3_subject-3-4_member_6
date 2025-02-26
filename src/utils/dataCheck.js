/**
 * @description null값 체크하는 함수
 * @param {string} inputName 입력 받은 이름
 * @return {string} 문자열 형태의 에러 메세지(msg)
 */
function nullCheck(inputName) {
  let msg = "";
  if (inputName === "") {
    msg = "이름을 작성해 주세요.";
  }
  return msg;
}

/**
 * @description 같은 값이 들어왔는지 체크하는 함수 ex:같은 name 들어오는거 방지 체크
 * @param {string} originName 기존에 있는 이름
 * @param {string} inputName 입력 받은 이름
 * @return {string} 문자열 형태의 에러 메세지(msg)
 */
function sameDataCheck(originName, inputName) {
  let msg = "";
  if (originName === inputName) {
    msg = "같은 이름이 존재합니다.";
  }
  return msg;
}

/**
 * @description 이름에 대한 데이터 유효성 검사 함수
 * @param {string} inputName 입력 받은 이름
 * @return {string} 문자열 형태의 에러 메세지(msg)
 */
function nameCheck(inputName) {
  let msg = "";
  if (/\d/.test(inputName)) { // 이름에 숫자가 포함되어 있다면
    msg = "이름에 숫자가 포함되어 있습니다.";
  } else if (/\s/g.test(inputName)) { // 이름에 공백이 존재한다면
    msg = "이름에 공백이 존재합니다.";
  }
  return msg;
}

/**
 * @description 데이터 유효성 검사 함수
 * @param {object} originData 
 * @param {object} inputData 
 * @param {boolean} updateFlg 상세보기 화면에서 <수정하기>를 눌렀는지 여부 
 *                            false:수정하기 버튼을 누르지 않음, true:수정하기 버튼을 누름 
 * @return {string} 문자열 형태의 에러 메세지(errorMsg)
 */
// TODO. 2025-02-26 해당 함수 로직 수정 필요
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