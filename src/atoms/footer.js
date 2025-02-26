/**
 * @description footer는 고정이기 때문에 변수 받지 않음
 * @return html의 footer 태그 반환 
 */
function footer () {
  const htmlFooter = `
  <footer class="display-flex justify-center font-small">
    <span>ⓒ made by eunbyul.ahn</span>
  </footer>
  `;
  return htmlFooter;
}

export default footer;