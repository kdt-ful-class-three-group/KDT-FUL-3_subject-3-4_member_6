/**
 * @param {string} title 헤더의 제목
 * @return html의 header 태그 반환
 */
function header (title) {
  const htmlHeader = `
  <header class="display-flex justify-center">
    <h1>${title}</h1>
  </header>
  `;
  return htmlHeader;
}

export default header;