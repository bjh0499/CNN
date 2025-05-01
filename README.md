![swearing](https://github.com/user-attachments/assets/658bcb9d-fcf2-44a5-92fb-7ae0a44011e4)

# CNN
브라우저를 이용 중인 사용자가 마우스 커서로 가리키거나 CSS selector로 수동 입력한 HTML 요소들을 출력하지 않도록 하는 확장 프로그램  
  
## 개발 취지
인터넷 접속자 간의 자유로운 의견 교환은 인터넷의 중요한 기능이자 가치이지만, 이러한 자유를 악용하는 일부 악성 사용자들이 비도덕적이거나 주제와 동떨어진 의견을 무분별하게 설파하여 많은 사용자들의 눈쌀을 찌푸리게 하고 있다. 이러한 현상에 지속적인 피로를 느낀 끝에 민감해진 사용자들은 불필요한 마찰은 물론 부적절한 의견이 시야에 노출되는 것조차 꺼리는 상황에 이르렀는데, 이 확장 프로그램은 이러한 사용자들이 불미스러운 요소를 화면에서 비활성화하고, 원하는 핵심 정보를 취하길 바라는 취지에서 제작했다.  
  
## 사용 방법
### Firefox 적용 방법
1. 해당 저장소의 Release에서 최신 버전 다운로드  
2. 주소창에 about:debugging 입력  
3. 좌측 메뉴의 '이 Firefox' 클릭  
4. 상단에 있는 '임시 부가 기능 로드' 버튼을 누르고 다운받은 압축 파일 지정  
  
### Chrome 적용 방법
1. 해당 저장소의 Release에서 최신 버전 다운로드 후 압축 해제  
2. 메뉴에서 '확장 프로그램' 선택  
3. '압축해제된 확장 프로그램을 로드합니다.'를 클릭하고, 압축 해제된 폴더 지정  
  
## 구동 예시
### 기본 사용법
![1](https://github.com/user-attachments/assets/6ba735c7-9836-430e-a38d-6a5c994626b5)  
네이버 뉴스 홈페이지의 한 기사에 달린 댓글창을 기준으로 하였다.  
  
![5](https://github.com/user-attachments/assets/c3b2377c-4b43-4cf7-9197-7ab16f817ce0)  
확장 프로그램을 활성화시킨 상태에 뜨는 툴바 아이콘을 누르면 팝업 창을 볼 수 있다. 여기서 사용자가 Select를 클릭하면 어떤 HTML 요소를 지울지 고르는 선택 모드가 된다.  
  
![2](https://github.com/user-attachments/assets/e3a59c02-1efd-44ce-944c-da118018151c)  
![15](https://github.com/user-attachments/assets/c7ab6884-4263-4b32-91a0-f1c25205bb24)  
원하는 영역에 클릭 시 해당 요소의 차단 목록 등록 여부를 묻는 창이 나와 사용자에게 선택하도록 한다.  
  
![6](https://github.com/user-attachments/assets/376662e7-07cf-4bc1-a5da-9719c44e7465)  
![3](https://github.com/user-attachments/assets/41441ca4-eb1f-4a46-af25-5d3cb239f07c)  
차단하고자 하는 요소를 등록한 뒤, 팝업 창의 Clear 버튼을 누르면 차단 목록에 올린 요소들이 화면에서 지워진다.  
  
![4](https://github.com/user-attachments/assets/24479b55-ca86-40de-a71c-577ace6cb6a9)  
다른 기사에 가도, 웹 페이지 구조 자체는 동일하므로 이전 기사에서 가렸던 HTML 요소는 여전히 보이지 않게 된다.  
  
![7](https://github.com/user-attachments/assets/7864382b-58b5-4b1b-b0a1-32bbf571ff74)  
![1](https://github.com/user-attachments/assets/6ba735c7-9836-430e-a38d-6a5c994626b5)  
Reset 버튼을 누르면 다시 화면에 나타나게 된다.  
  
### CSS selector를 이용한 수동 차단 방법
![8](https://github.com/user-attachments/assets/0e3ac4ca-6583-4307-a867-cc7e76e99634)  
![12](https://github.com/user-attachments/assets/ed29cb02-ffdb-41e6-b1f9-c68242311eba)  
HTML, CSS에 대한 기본 지식이 있는 사용자, 또는 마우스 커서로 가리키기 어려운 HTML 요소 제거를 원하는 사용자를 위한 기능으로, 팝업 창의 Options를 눌러 차단 목록을 관리하는 옵션 창에 진입할 수 있다.  
  
![9](https://github.com/user-attachments/assets/a4d3041e-04a1-4958-ac7a-54facf9fac7c)  
웹 브라우저 개발자 도구로 특정 HTML 요소의 ID 또는 CSS selector를 볼 수 있다.  
  
![13](https://github.com/user-attachments/assets/b754cd90-7345-419b-8c9b-440eb4319d5d)  
![11](https://github.com/user-attachments/assets/7db7f54a-56c7-424e-971d-49805a323150)  
이러한 방법으로 차단 목록에 등록된 HTML 요소 역시 확장 프로그램에 의해 화면에서 가려지게 된다.  
  
![14](https://github.com/user-attachments/assets/8e5b41d5-3309-4e0a-93d1-60250ecb4722)  
![10](https://github.com/user-attachments/assets/6da72ac7-d95c-4695-adf9-9f4fbb4ff5c3)  
차단 목록에 올라온 HTML 요소에 대해 임시적으로 체크를 해제하거나 삭제할 경우, 그 요소는 실시간으로 숨겨지거나 드러난다.  
  
## 일정
11월 2주차: 확장 프로그램 작성을 위한 web extension 기술 조사, HTML 요소 미표시 기능 구현(v1.0.0 ~ v1.1.0)  
11월 3주차: localStorage를 통한 차단 목록 저장 기능 구현(v1.2.0)  
11월 4주차~12월 1주차: 사용자 편의를 위한 inspector 구현(v1.3.0)  
12월 2주차: 버그 수정, UI/UX 개선, 문서 작성  
  
## 개발 환경
OS: CentOS 7  
사용 개발 언어: HTML, CSS, JavaScript  
사용 편집기: Visual Studio Code  
사용 형상 관리 시스템: Git  
기타 사용 프로그램: rollup  
  
## 동작 원리
### Web extension 동작 과정
![Untitled 1](https://github.com/user-attachments/assets/547dce58-76c3-4c61-995f-34e94a0789fd)  
![Untitled 2](https://github.com/user-attachments/assets/6e46b410-b711-4937-837f-021e139d65c5)  
웹 브라우저가 웹 확장 프로그램을 실행할 때, 먼저 해당하는 프로그램의 설정 파일을 참조하여, 어떤 파일을 어디에서 구동하는지에 대한 정보, 그리고 권한을 확인한다. 설정에 따라 HTML, CSS, JavaScript 파일들은 웹 브라우저 탭의 페이지, 또는 툴바 창이나 설정 창 등에서 동작하게 된다.  
  
### CNN 동작 과정
![Untitled 6](https://github.com/user-attachments/assets/da7da065-1274-40b2-98e2-13d66a22ce2b)  
이 확장 프로그램에서는 사용자의 입력을 즉각적으로 반영하기 위해 event listener를 도입했는데, 툴바 버튼 클릭을 감지하는 listener와 localstorage 내에 저장된 차단 목록의 변화를 확인하는 listener를 구현했다.  
  
![Untitled 7](https://github.com/user-attachments/assets/d3a3e004-e78d-488d-8fda-4a39d535fb19)  
![Untitled 3](https://github.com/user-attachments/assets/d0eb1802-7307-4d27-b892-ed21005f7082)  
event listener와 특정 HTML 요소를 비활성화하는 스크립트는 서로 별개의 환경에서 구동되므로, listener는 message를 전달해야 스크립트를 동작시킬 수 있다. 이때 스크립트는 HTML 파일에 작성된 정적 HTML 요소는 물론, fetch 등으로 동적 생성되는 HTML 요소까지 실시간으로 감시하며 차단 목록과 대조해서 비활성화할 요소들을 찾아내 차단 스크립트를 실행한다.  
  
## 아이콘 이미지 출처
<a href="https://www.flaticon.com/free-icons/rude" title="rude icons">Rude icons created by Smashicons - Flaticon</a>  
<a href="https://www.flaticon.com/free-icons/forbidden" title="forbidden icons">Forbidden icons created by prettycons - Flaticon</a>  
