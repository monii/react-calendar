## 리액트 달력 :date:
리액트를 사용해서 달력을 구현 했습니다.  

## 결과 
<img src = "https://github.com/monii/react-calendar/blob/master/assets/react_calendar_img.png" width="80%" height="60%">

[![Netlify Status](https://api.netlify.com/api/v1/badges/01714578-b9a8-457d-bb5b-a51c887d2429/deploy-status)](https://app.netlify.com/sites/moniis-calendar/deploys)
배포 페이지 : [react-calendar](moniis-calendar.netlify.app)</br>
❕공휴일API통신으로 처음 기동시 공휴일 데이터 표시까지 시간이 조금 거릴 수 있습니다. :pensive:

## 🔧리팩토링 === 방치한 코드 되돌아보기 프로젝트 :weight_lifting:
1. UI 버그수정
2. 새로고침 시 날아가는 일정 내용 수정
3. 배포 실패 상태 해결
4. CSS 도전하기

:point_right: 자세한것은 노션에 기재하였습니다. [리액트 캘린더 - 방치한 코드 돌아보기](https://monii0312.notion.site/1-7277f19a9c7241eeaacddc399a8e8a85?pvs=4)

----------------------------------
:boom: 이전 회사에 취업 할 때 작성한 리드미 입니다. 추후 삭제 예정입니다. :boom:
## :exclamation: 로컬에서 실행 :exclamation:
로컬에서 실행시 아래의 파일에서 코맨트아웃 처리를 아래와 같이 수정해 주세요 :grinning:
```js
//App.js
function App() {
  return (
    // <div className="App">
    //   <BrowserRouter basename="react-calendar/">
    //     <Routes>
    //       <Route exact path="/" element={<Calndar />} />
    //     </Routes>
    //   </BrowserRouter>
    // </div>

    // 로컬용 App
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route exact path="/" element={<Calndar />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}
```
```js
//api.js
// const END_POINT =
//   "https://cors-anywhere.herokuapp.com/http://apis.data.go.kr/B090041/openapi/service/SpcdeInfoService";

// 로컬용 END_PONT
const END_POINT = "/B090041/openapi/service/SpcdeInfoService";
```
```js
//pagckage.json
 "homepage": "https://monii.github.io/react-calendar",  
 
 :point_up_2: 이부분을 삭제 하지 않고 실행하시면 URL 주소차에서 "http://localhost:3000"으로 실행해주세요
```

위 부분들들 수정하시고 나면 ```npm start```로 로컬에서 ```"http://localhost:3000"``` 으로 실행이 가능합니다.

## 기술 스택
* react-redux 적용

## 기능구현
* 오늘 날짜 하이라이트
* 이전달 / 다음달 / 오늘 버튼 클릭시 각각 이전달로 이동, 다음달로 이동 및 오늘 날짜로 이동
* 일정추가 및 삭제 
* 공휴일 API로 공휴일 표시

## :thinking: proxy문제..
아래의 블로그를 참고해서 ndPoint 앞에 **"https://cors-anywhere.herokuapp.com/"** 붙이는 방법으로 proxy를 임시적으로 우회하는 방법을 적용하고 있습니다.
```js
//api.js
 const END_POINT =
   "https://cors-anywhere.herokuapp.com/http://apis.data.go.kr/B090041/openapi/service/SpcdeInfoService";
```
참고 블로그 :point_right: https://nyang-in.tistory.com/272
