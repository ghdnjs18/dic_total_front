const query = document.getElementById('search');
const submitBtn = document.getElementById('submit');
const BASE_URL = 'https://dictionary-search-ho.herokuapp.com/api/words';
// const BASE_URL = 'http://localhost:5000/api/words';

// 특수문자 유효성 검사
function checkIfStringHasSpecialCharacter(str) {
    console.log("spectial character")
    const re = /[`!@#$%^&*()_+\-=\[\]{};':"\\|.<>\/?~]/;
    return re.test(str);
}
// 숫자 유효성 검사
function checkIfStringHasNumbers(str) {
    return /\d/.test(str);
}

// 영문자 유효성 검사 / 정규식 뒤에 i를 붙이면 대문자 소문자 상관안한다.
function checkIfStringHasLetters(str) {
    // return /[a-z]/i.test(str);
    return /[a-z]/i.test(str);
}
// 버튼 활성화  
function enableSubmitBtn(state) {
    submitBtn.disabled = state;
}

// 서버 데이터 가져오기
// function getData(baseUrl, sel,  query) {
function getData(baseUrl, query) {
    // 버튼 비활성화
    enableSubmitBtn(true);
    console.log('서버 접속중...')
    // 유효성검사 함수 사용
    if(checkIfStringHasSpecialCharacter(query)) {
        enableSubmitBtn(false);
        return container.innerHTML = "특수문자가 포함되어 있습니다."
    } else if (checkIfStringHasNumbers(query)) {
        enableSubmitBtn(false);
        return container.innerHTML = "숫자가 포함되어 있습니다."
    }  else if (checkIfStringHasLetters(query)) {
        enableSubmitBtn(false);
        return container.innerHTML = "영문이 포함되어 있습니다."
    } 
    // fetch() urL인자와 객체 인자를 받고 promise타입의 객체를 반환
    // api호출이 성공하면 response, 실패하면 error 반환
    // fetch(`${baseUrl}/${sel}/${query}`, {
    fetch(`${baseUrl}/${query}`, {
        headers: {
            "Content-Type": "application/json"
        }
    })
    // rest api들은 json형태의 데이터를 응답하기 때문에, 응답객체는 json메서드를 제공한다.
    // 응답객체로 부터 json 포멧의 응답을 자바스크립트 객체로 변환하여 얻는다.
    .then( res => res.json())
    .then( data => {
        enableSubmitBtn(false);
        console.log(data)
        const {words} = data;
        if (words.length === 0) {
            return container.innerHTML = "검색된 단어가 없습니다."
        }
        // map() 배열 요소에 대해 , 두번째 인수를 실행한 결과들을 새로운 배열로 
        const template = words.map(word => {
            return (
                `
                    <div class="item">
                        <div class="word">
                            <a href=${word.link}>${word.keyword}</a><sup>${word.seq}</sup> 
                            ${word.hanja} 
                            <p>${word.word_class}</p>
                            </div>
                        <p class="description">${word.meaning}</p>
                    </div>
                `
            )
        })
        container.innerHTML = template.join("") // DOM 에 Template 삽입
    })
}
// 검색 버튼 클릭시 이벤트 실행
submitBtn.addEventListener('click', function(){
    console.log(query.value)
    // getData(BASE_URL, selectBox.value, query.value)
    getData(BASE_URL, query.value)
})
// 엔터키로 검색가능하게 하기
query.addEventListener('keypress', function(e) {
    if(e.keyCode === 13) {
        // getData(BASE_URL, selectBox.value, query.value)
        getData(BASE_URL, query.value)
    }
})
// 처음 로딩시 이벤트 발생
window.addEventListener('DOMContentLoaded', function() {
    // setTimeout(function() {
    //     getData(BASE_URL, selectBox.value, query.value)
    // }, 3000);

    // getData(BASE_URL, selectBox.value, query.value);
    getData(BASE_URL, query.value);
});