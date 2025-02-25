## 프로젝트 구조 설명

    KDT-FUL-3_subject-3-4_member_6
    ├─ public\css (디자인 관련 폴더)
    │  └─ common.css
    ├─ src (소스 관련 폴더)
    │  ├─ constants (상수 집합 폴더)
    │  │  └─ contentTypeConstants.js (content-type 상수 자스)
    │  ├─ functions (화면 구현 함수들 집합 폴더)
    │  │  ├─ list.js (목록 화면 자스)
    │  │  ├─ post.js (상세보기 화면 자스)
    │  │  └─ write.js (글쓰기 화면 자스)
    │  ├─ storage (데이터 관련 폴더)
    │  │  └─ postsData.js (json 데이터 만들기 위한 테스트 데이터 자스)
    │  └─ utils (유틸리티 함수들 집합 폴더)
    │     ├─ dataCheck.js (데이터 유효성 검사 자스)
    │     ├─ loadFromJson.js (json파일 읽어들이는 자스)
    │     └─ saveToJson.js (json파일로 파일 저장하는 자스)
    ├─ views (화면단 관련 폴더)
    │  ├─ error.html (에러 페이지 화면)
    │  └─ index.html (메인 페이지 화면)
    ├─ app.js (서버 관련 파일)
    ├─ package.json
    ├─ posts.json (만들어진 json 데이터)
    └─ README.md (마크다운 파일)

## 실행 방법
- app.js를 가동시켜 server.listen을 통해 'http://localhost:8000' 서버를 오픈시킵니다.
- 메인 페이지인 `/` 로의 이동을 통해 index.html을 첫 화면으로 보여줍니다.
## 구현 기능 목록
- 아래와 같은 순서대로 기능을 구현하였습니다.
  - method가 `GET, POST` 일 때를 나누어서 라우팅 진행하였습니다.
  - Read 기능으로 `list` 화면을 보여주며 posts.json을 읽어들인 후 list.js에 백틱화면을 리턴시켰습니다.
  - list 파일쪽의 `글쓰기`를 누르면 Create 기능으로 `write` 화면을 보여준 후 form 을 이용해 POST로 데이터를 넘겨 구현하였습니다.
  - 게시글 목록에서 리스트를 누르면 `상세보기`화면이 보여지며, `수정하기`와`삭제하기`버튼을 구현해 Update 및 Delete 기능을 구현하였습니다.
## 학습 내용 정리
맨 처음에는 화면단을 보이는 것을 모두 html로 만들어 fs.readFileSync를 이용해 page 자체를 리턴시키려고 했습니다. <br>
그러나 변수의 값을 담아서 보이는 것에 한계가 생겨 html이 아닌 js 파일로 바꿔 리턴시키는 방식으로 변경하였습니다. <br>
api를 이용해 데이터 주고받기를 해보려고 했으나, fetch api에 대한 정보미숙상태로 강사님의 json read,save 기능을 참고해 구현했습니다. <br>
이번 학습을 통해 CRUD에 대한 패턴 이해와 서버 통신 구현을 할 수 있게 되었고, git 관리 `이슈,마일스톤,프로젝트` 등을 할 수 있어 도움이 되었습니다!