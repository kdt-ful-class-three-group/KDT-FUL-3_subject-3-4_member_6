/**
 * @param {string} title 브라우저 탭에 표시될 제목
 * @param {string} cssPath css 파일이 있는 경로
 * @return html의 head 태그 반환
 */
function head (title, cssPath) {
  const htmlHead = `
  <head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="stylesheet" href="${cssPath}">
    <title>${title}</title>
  </head>
  `;
  return htmlHead;
}

export default head;