//외부스크립트 slide.js

// 1. 변수선언
const slide = document.querySelector('.slide');//상품목록의 부모요소
const slide_img = document.querySelectorAll('.slide li');
//상품목록
const l_btn=document.getElementById('l_btn');//이전
const r_btn=document.getElementById('r_btn');//다음

// stop버튼변수
const stop_btn = document.querySelector('.fa-stop');
// play버튼변수
const play_btn = document.querySelector('.fa-play'); // class는 querySelector로 가능


const img_n = slide_img.length; //li개수를 변수에 담음.
console.log(img_n); //5

const img_w = 360; //상품 사진의 너비
const m = 60; // 여백너비
const s_count = 3; // 한 페이지에 보여질 상품 개수

let count = 0; // 이전, 다음 클릭 시 사용할 변수값 설정

slide.style.width = (img_w+m)*img_n-m+'px'; /* 반응형으로 바꾸기 4. px => % */

// 왼쪽으로 움직이는 슬라이드 함수 작성하기
function mslide(n){
    slide.style.left = (img_w+m)*-n+'px';
    count=n;
    console.log(count); // 이전 버튼 클릭 시 2, 1, 0순으로 나오게
    console.log(slide.style.left);
    // -360+60*1 -420
    // -360+60*2 -840
    // -360+60*3 -1260
}

// 이전 버튼 클릭 시 왼쪽으로 슬라이드 이동
l_btn.addEventListener('click', function(){
    if(count>0){ // 만약에 카운트 값이 -보다 크면 
        mslide(count-1); // 카운트값에 1을 빼서 mslide에 넘김
    }else{
        mslide(img_n-s_count); // li개수 -3
    }
});

// 다음 버튼 클릭 시 왼쪽으로 슬라이드 이동
r_btn.addEventListener('click', function(){
    if(count < img_n-s_count){ // 0보다 li개수가 많다면
        mslide(count+1); // 0+1해서 넘김
    }else{ // 그렇지 않다면
        mslide(0); //0을 대입하여 처음으로 돌아가게 함
    } //1, 2, 0순으로 반복
});

// 3초마다 자동으로 슬라이드 움직이게 하기
// 3초마다 시간함수 반복시켜줌 => 시간객체 = setInterval(함수명, 반복시간)

let Timer = setInterval(function(){
    console.log('반복호출실행');
    if(count==2){
        count=0;
    }else{
        count++;
    }
    mslide(count); // mslide에 count값을 넘겨서 자동으로 움직이게 한다.
    // console.log(count);
}, 3000);

// stop_btn클릭시 시간을 제거하여 멈추게함
stop_btn.addEventListener('click', function(){
    clearInterval(Timer);
});

// play_btn클릭시 시간을 다시 생성하여 자동으로 움직이게 함.
play_btn.addEventListener('click', function(e){ //e=event객체
    // 기존 자동재생이 되고 있다면 제거하고
    clearInterval(Timer);
    Timer = setInterval(function(){
        console.log('반복호출실행');
        if(count==2){
            count=0;
        }else{
            count++;
        }
        mslide(count); // mslide에 count값을 넘겨서 자동으로 움직이게 한다.
        // console.log(count);
    }, 3000);
    e.preventDefault(); // 이벤트 중복현상을 제거
});