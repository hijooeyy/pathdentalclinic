/* =========================
WHY PATH 애니메이션

목표
- 스크롤을 내리면 양쪽 영상이 먼저 올라옴
- 이후 가운데 텍스트가 등장
- 애니메이션 동안 화면 고정
- 스크롤을 올리면 자연스럽게 되감김
- 다시 내리면 다시 진행
- 횟수 제한 없이 반복
- OUR TREATMENTS와 같은 scrub 방식
========================= */


/* =========================
1. 요소 선택
========================= */

// WHY PATH 전체 영역
const whyPath = document.querySelector("#why_path");

// 왼쪽 영상
const whyPathLeft = document.querySelector(".why_path_left");

// 오른쪽 영상
const whyPathRight = document.querySelector(".why_path_right");

// 가운데 텍스트
const whyPathText = document.querySelector(".why_path_text");


/* =========================
2. 요소가 모두 있을 때만 실행
========================= */

if (
    whyPath &&
    whyPathLeft &&
    whyPathRight &&
    whyPathText
) {

    /* =========================
    3. 처음 화면 상태
    ========================= */

    // 양쪽 영상은
    // 최종 위치보다 70px 아래에서 시작
    // 너무 멀리 숨기지 않아서
    // 갈색 배경만 오래 보이는 느낌을 줄임
    gsap.set(
        [whyPathLeft, whyPathRight],
        {
            y: 70,
            autoAlpha: 0
        }
    );


    // 가운데 텍스트는
    // 최종 위치보다 80px 아래에서 시작
    gsap.set(whyPathText, {
        y: 80,
        autoAlpha: 0
    });


    /* =========================
    4. ScrollTrigger + Timeline
    ========================= */

    const whyPathTimeline = gsap.timeline({
        scrollTrigger: {

            // WHY PATH 영역을 기준으로 실행
            trigger: whyPath,

            // 섹션 상단이
            // 화면 상단에 닿으면 시작
            start: "top top",

            // 애니메이션에 사용할
            // 전체 스크롤 거리
            //
            // 너무 길면 갈색 배경이
            // 오래 유지되는 느낌이 생기므로
            // TREATMENTS보다 짧게 설정
            end: "+=800",

            // 애니메이션이 끝날 때까지
            // WHY PATH 화면을 고정
            pin: true,

            // pin 종료 후
            // 다음 섹션을 위한 공간 유지
            pinSpacing: true,

            // 스크롤과 애니메이션 진행도를 연결
            //
            // 아래로 스크롤 → 앞으로 진행
            // 위로 스크롤 → 자연스럽게 되감김
            // 다시 아래로 → 다시 진행
            scrub: 0.6,

            // pin 시작 시
            // 화면이 튀는 현상 완화
            anticipatePin: 1,

            // 브라우저 크기가 바뀌면
            // ScrollTrigger 위치 다시 계산
            invalidateOnRefresh: true

            // 위치 확인이 필요할 때만 사용
            // markers: true
        }
    });


    /* =========================
    5. 1단계
    양쪽 영상 먼저 등장
    ========================= */

    whyPathTimeline.to(
        [whyPathLeft, whyPathRight],
        {
            // 원래 위치로 이동
            y: 0,

            // 완전히 보이게
            autoAlpha: 1,

            // scrub에서는 실제 0.4초가 아니라
            // 전체 타임라인에서 차지하는 비율
            duration: 0.4,

            // 스크롤 움직임과
            // 최대한 직접 연결
            ease: "none"
        }
    );


    /* =========================
    6. 영상 잠깐 유지
    ========================= */

    whyPathTimeline.to(
        {},
        {
            // 영상과 텍스트가
            // 너무 동시에 등장하지 않도록
            // 아주 짧게 텀을 줌
            duration: 0.1
        }
    );


    /* =========================
    7. 가운데 텍스트 등장
    ========================= */

    whyPathTimeline.to(
        whyPathText,
        {
            // 원래 위치로 이동
            y: 0,

            // 완전히 보이게
            autoAlpha: 1,

            duration: 0.35,

            ease: "none"
        }
    );


    /* =========================
    8. 완성 화면 유지
    ========================= */

    whyPathTimeline.to(
        {},
        {
            // 영상 + 텍스트가
            // 모두 등장한 화면을
            // 잠시 보여준 뒤
            // 다음 섹션으로 넘어가게 함
            duration: 0.55
        }
    );

}


/* =========================
AOS 초기화

WHY PATH SUB 애니메이션 설정

✔ 스크롤을 내리면 등장
✔ 다시 위로 올리면 사라짐
✔ 다시 내리면 다시 등장 (반복 가능)
✔ 천천히 부드럽게 올라오는 효과
========================= */

AOS.init({

  /* =========================
     once

     false
     → 스크롤을 다시 내릴 때마다
       애니메이션 반복 실행

     true
     → 최초 1회만 실행
  ========================= */

  once: false,


  /* =========================
     mirror

     true
     → 화면에서 요소가 벗어나면
       다시 숨겨짐

       다시 스크롤하면
       애니메이션이 재생됨

     false
     → 요소가 화면을 벗어나도
       그대로 유지
  ========================= */

  mirror: true,
  
  
  /* =========================
     easing

     끝으로 갈수록
     부드럽게 감속

     현재 가장 자연스러운 설정
  ========================= */

  easing: "ease-out-cubic",


  /* =========================
     offset

     요소가 화면 아래에서

     60px 정도 들어왔을 때

     애니메이션 시작

     숫자가 작을수록
     더 일찍 시작

     숫자가 클수록
     더 늦게 시작
  ========================= */

  offset: 60,
});


/* =========================
   OUR TREATMENTS 애니메이션
   양쪽 이미지 → 가운데 글자
========================= */

// OUR TREATMENTS 전체 영역
const treatments = document.querySelector("#treatments");

// 왼쪽 신경치료 카드
const treatmentsEndo = document.querySelector(".treatments_endo");

// 오른쪽 임플란트 카드
const treatmentsImplant = document.querySelector(".treatments_implant");

// 가운데 타이틀 영역
const treatmentsText = document.querySelector(".treatments_text");

// 요소가 모두 존재할 때만 실행
if (
    treatments &&
    treatmentsEndo &&
    treatmentsImplant &&
    treatmentsText
) {

    /* =========================
       처음 화면 상태
    ========================= */

    // 양쪽 카드를 아래에 숨김
    gsap.set(
        [treatmentsEndo, treatmentsImplant],
        {
            y: 200,
            autoAlpha: 0
        }
    );

    // 가운데 글자를 아래에 숨김
    gsap.set(treatmentsText, {
        y: 120,
        autoAlpha: 0
    });

    /* =========================
       ScrollTrigger 생성
    ========================= */

    const treatmentsTimeline = gsap.timeline({
        scrollTrigger: {
            trigger: treatments,

            // 섹션이 화면 상단에 닿으면 애니메이션 시작
            start: "top top",

            // WHY PATH보다 조금 더 긴 스크롤 구간 확보
            end: "+=1700",

            // 애니메이션이 끝날 때까지 화면 고정
            pin: true,
            pinSpacing: true,

            // 스크롤과 애니메이션을 자연스럽게 연결
            scrub: 0.6,

            anticipatePin: 1,
            invalidateOnRefresh: true

            // 위치 확인할 때만 사용
            // markers: true
        }
    });

    /* =========================
       1단계
       양쪽 카드가 동시에 등장
    ========================= */

    treatmentsTimeline.to(
        [treatmentsEndo, treatmentsImplant],
        {
            y: 0,
            autoAlpha: 1,
            duration: 0.6,
            ease: "none"
        }
    );

    /* =========================
       2단계
       양쪽 카드를 잠시 유지
    ========================= */

    treatmentsTimeline.to({}, {
        duration: 0.4
    });

    /* =========================
       3단계
       가운데 타이틀 등장
    ========================= */

    treatmentsTimeline.to(treatmentsText, {
        y: 0,
        autoAlpha: 1,
        duration: 0.9,
        ease: "none"
    });

    /* =========================
       4단계
       완성 화면을 잠시 유지
    ========================= */

    treatmentsTimeline.to({}, {
        duration: 1.5
    });
}


/* =========================
PATH EXPERIENCE 애니메이션

최종 조정 버전

목표
- TOP 영역이 먼저 등장
- TOP이 어느 정도 올라온 시점에 BOTTOM이 자연스럽게 이어서 등장
- TOP / BOTTOM이 완전히 따로 노는 느낌은 없게
- 전체 속도는 조금 더 느리고 부드럽게
- 다시 위로 올라갔다가 내려오면 애니메이션 재실행
- pin은 기존처럼 별도로 유지
========================= */


/* PATH EXPERIENCE 전체 영역 */
const place = document.querySelector("#place");


/* =========================
TOP 영역 요소
========================= */

/* 왼쪽 위 이미지 */
const placeTopLeft = document.querySelector(
  ".place_top > div:first-child"
);

/* 오른쪽 위 이미지 */
const placeTopRight = document.querySelector(
  ".place_top > div:last-child"
);


/* =========================
BOTTOM 영역 요소
========================= */

/* 왼쪽 아래 이미지 */
const placeBottomLeft = document.querySelector(
  ".place_bottom > div:first-child"
);

/* 오른쪽 아래 텍스트 */
const placeText = document.querySelector(
  ".place_bottom > div:last-child"
);


/* 필요한 요소가 모두 있을 때만 실행 */
if (
  place &&
  placeTopLeft &&
  placeTopRight &&
  placeBottomLeft &&
  placeText
) {

  /* =========================
     1. 처음 화면 상태

     화면 밖에서 크게 들어오는 방식이 아니라
     최종 위치 근처에서 살짝 움직이도록 설정

     처음에는 완전히 보이지 않음
  ========================= */


  /* 왼쪽 위 이미지
     최종 위치보다 35px 위에서 시작 */
  gsap.set(placeTopLeft, {
    x: -100,
    autoAlpha: 0
  });


  /* 오른쪽 위 이미지
     최종 위치보다 40px 오른쪽에서 시작 */
  gsap.set(placeTopRight, {
    x: 140,
    autoAlpha: 0
  });


  /* 왼쪽 아래 이미지
     최종 위치보다 40px 왼쪽에서 시작 */
  gsap.set(placeBottomLeft, {
    y: 100,
    autoAlpha: 0
  });


  /* 오른쪽 아래 텍스트
     최종 위치보다 35px 아래에서 시작 */
  gsap.set(placeText, {
    y: 100,
    autoAlpha: 0
  });



  /* =========================
     2. 전체 등장 타임라인 생성

     paused: true
     → ScrollTrigger가 실행되기 전까지
       애니메이션은 멈춰 있음
  ========================= */

  const placeTimeline = gsap.timeline({
    paused: true
  });



  /* =========================
     3. TOP 영역 먼저 등장

     TOP 왼쪽 + 오른쪽이 동시에 움직임

     duration: 1.1
     → 기존 1초보다 조금 더 천천히

     power1.out
     → power2.out보다 초반 가속이 덜해서
       전체적으로 더 차분하고 부드럽게 이동
  ========================= */

  placeTimeline.to(
    [
      placeTopLeft,
      placeTopRight
    ],
    {
      /* 원래 위치로 이동 */
      x: 0,
      y: 0,

      /* 완전히 보이게 */
      autoAlpha: 1,

      /* 천천히 등장 */
      duration: 1.1,

      /* 급하게 튀지 않고 부드럽게 감속 */
      ease: "power1.out"
    }
  );



  /* =========================
     4. BOTTOM 영역 등장

     TOP이 완전히 끝난 후 시작하는 게 아니라
     TOP 애니메이션이 진행 중일 때 겹쳐서 시작

     "-=0.6"
     → TOP 종료 시점보다 0.6초 먼저 시작

     TOP duration이 1.1초이므로
     약 0.5초 정도 지난 시점에서
     BOTTOM이 자연스럽게 이어서 시작됨

     결과적으로

     TOP 시작
     ↓
     잠깐 뒤
     ↓
     BOTTOM 시작

     순서는 느껴지지만
     기다리는 느낌은 거의 없음
  ========================= */

  placeTimeline.to(
    [
      placeBottomLeft,
      placeText
    ],
    {
      /* 원래 위치로 이동 */
      x: 0,
      y: 0,

      /* 완전히 보이게 */
      autoAlpha: 1,

      /* TOP과 같은 속도로 통일 */
      duration: 1.1,

      /* TOP과 동일한 easing */
      ease: "power1.out"
    },

    /* TOP과 0.6초 겹쳐서 실행 */
    "-=0.6"
  );



  /* =========================
     5. 등장 ScrollTrigger

     PATH EXPERIENCE가 화면에 들어오면서
     애니메이션 시작

     once:true를 사용하지 않음

     → 다시 위로 올라갔다가
       내려오면 애니메이션 재실행 가능
  ========================= */

  ScrollTrigger.create({
    trigger: place,

    /* PATH EXPERIENCE 상단이
       화면 높이의 75% 지점에 도달하면 시작 */
    start: "top 75%",

    /* =========================
       아래로 내려오면서 진입했을 때

       restart()
       → 타임라인을 처음부터 다시 실행
    ========================= */

    onEnter: () => {
      placeTimeline.restart();
    },


    /* =========================
       다시 위로 올라가서
       PATH EXPERIENCE 영역을 벗어나면 초기화

       pause(0)
       → 타임라인을 처음 위치로 되돌리고 정지

       다시 내려왔을 때
       처음부터 애니메이션 재실행 가능
    ========================= */

    onLeaveBack: () => {
      placeTimeline.pause(0);
    }

    /* 위치 확인할 때만 사용 */
    // markers: true
  });



  /* =========================
     6. PATH EXPERIENCE 화면 고정

     등장 애니메이션과 pin은 분리

     애니메이션은 화면에 들어오는 동안 시작하고

     #place가 화면 상단에 정확히 닿으면
     그때부터 pin 시작
  ========================= */

  ScrollTrigger.create({
    trigger: place,

    /* 섹션 상단이 화면 상단에 닿으면 고정 */
    start: "top top",

    /* 완성된 화면을 보여줄 스크롤 거리 */
    end: "+=800",

    /* 화면 고정 */
    pin: true,

    /* pin 종료 후
       다음 섹션을 위한 공간 유지 */
    pinSpacing: true,

    /* pin 시작 시 화면이 튀는 현상 완화 */
    anticipatePin: 1,

    /* 브라우저 크기 변경 시
       위치 다시 계산 */
    invalidateOnRefresh: true

    /* 위치 확인할 때만 사용 */
    // markers: true
  });

}


/* =========================
NIGHT 섹션 텍스트 애니메이션
========================= */

const night = document.querySelector("#night");
const nightInner = document.querySelector(".night_inner");

if (night && nightInner) {

    /* 처음 상태 */
    gsap.set(nightInner, {
        y: 80,
        autoAlpha: 0
    });

    /* 스크롤에 따라 텍스트 전체가 같이 올라옴 */
    gsap.to(nightInner, {
        y: 0,
        autoAlpha: 1,
        ease: "none",

        scrollTrigger: {
            trigger: night,

            /* NIGHT 섹션이 화면에 들어오면 시작 */
            start: "top 65%",

            /* 기존 애니메이션과 비슷한 체감 */
            end: "+=350",

            /* 스크롤과 자연스럽게 연결 */
            scrub: 0.6,

            invalidateOnRefresh: true

            // markers: true
        }
    });

}