

//갤러리 스크립트
$(document).ready(function(){

  //탭메뉴 서식
  const g_nav = $('.g_navi ul li a');
  const g_list = $('.g_list li a');
  const total_btn = $('.g_navi ul li:first-child a');
  const plan_btn = $('.g_navi ul li:nth-child(2) a');
  const design_btn = $('.g_navi ul li:nth-child(3) a');
  const ui_btn = $('.g_navi ul li:nth-child(4) a');
  const coding_btn = $('.g_navi ul li:last-child a');

  g_nav.click(function(){
    //선택한 현재 a요소에 act서식을 적용하고 부모의 다른 형제요소의 자식요소인 a요소는 act를 제거한다.
    $(this).addClass('act').parent().siblings().find('a').removeClass('act');
  });

  //이미지 목록에 마우스 오버시 caption이 아래에서 위로 올라와야
  g_list.mouseenter(function(){
    $(this).find('.caption').stop().animate({'bottom':'0px'},300);
  });

  //마우스 아웃시 다시 아래로 내려가야
  g_list.mouseleave(function(){
    $('.caption').stop().animate({'bottom':'-40px'},300);
  });

  // 전체 메뉴를 클릭시 .total이 모두 보이게
  total_btn.click(function(){
    $('.total').hide();
    $('.total').fadeIn();
  });

  // 기획 클릭시 .plan이 보이게
  plan_btn.click(function(){
    $('.total').hide();
    $('.plan').fadeIn();
  });

  // 설계 클릭시 .design이 보이게
  design_btn.click(function(){
    $('.total').hide();
    $('.design').fadeIn();
  });

  // 디자인 클릭시 .ui가 보이게
  ui_btn.click(function(){
    $('.total').hide();
    $('.ui').fadeIn();
  });

  // 개발 클릭시 .coding이 보이게
  coding_btn.click(function(){
    $('.total').hide();
    $('.coding').fadeIn();
  });


  // 3. 이미지목록 a요소 클릭시 href값 변수에 담아 modal윈도 띄우기

  g_list.click(function(){
    let img_src = $(this).attr('href');
    // let title = $(this).attr('title');
    let title = $(this).find('span').text();
    let i = $(this).parent().index()+1;


    console.log(i); // index값 출력하기
    console.log(img_src); // href값 출력하기
    console.log(title); // title 제목 출력하기

    let modal=`
    <div class= "modal">
      <div class= "center">
        <h3>${title}</h3>
        <img src= ${img_src} alt= "">
        <i class= "fas fa-times"></i>
        <i class= "fas fa-angle-left"></i>
        <i class= "fas fa-angle-right"></i>
        <span class="p_num">${i}/12</span>
      </div>
    </div>
    `;

    // body태그의 맨뒤에 modal변수값 출력하기
    $('body').append(modal);

    $('.modal i.fa-times').click(function(){
      $('.modal').hide();
    });

    // 좌, 우 버튼 클릭 시 각각 함수 작성하기
    $('.modal i.fa-angle-left').click(function(){
      if(i==12){
        i=1;
      }else{
        i++;
      }
      console.log(i); // 1,12,11,10,9,8,7,6,5,4,3,2,1...
      dataChange(i);
    });

    $('.modal i.fa-angle-right').click(function(){
      if(i==12){
        i=1;
      }else{
        i++;
      }
      console.log(i); // 1,2,3,4,5,6,7,8,9,10,11,12,1...
      dataChange(i);
    });

    // 좌, 우버튼 클릭 시 받아온 i값을 가지고
    // 제목, 이미지, 페이지 번호 변경하기
    function dataChange(i){

      // 1. 페이지 번호
      $('.modal .p_num').text(i+'/12');

      // 2. 인덱스번호에 맞는 제목 변경되어야...
      $('.modal h3').text($('.g_list li').eq(i-1).find('.caption').text());

      // 3. 인덱스번호에 맞는 이미지 출력하기
      if(i==4||i==9||i==11){
        $('.modal img').attr('src','./images/img'+i+'.png');
      }else
        $('.modal img').attr('src','./images/img'+i+'.jpg');

    };



    return false;
  });
  
});