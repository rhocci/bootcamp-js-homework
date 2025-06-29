# 3주차 과제 기록
JavaScript 3주차 과제 기록을 정리한 문서입니다.

## 📚 목차
- [과제 수행 과정](#-과제-수행-과정)
- [3주차 회고](#-3주차-회고)

## 📝 과제 수행 과정
### 구조 잡기
캐러셀 컴포넌트 클론코딩 목표는 메이플스토리의 여름 업데이트 페이지..!로 정했다.<br>가운데 활성화된 카드와 양옆 카드가 보이는 구조로, 원본에선 마우스로 스와이프하며 총 3개의 콘텐츠가 반복 스크롤되는 UI이다.

![Container](https://github.com/user-attachments/assets/12bfa780-455c-4bd3-8aca-970d1c919a4b)

개발자 도구 검사 없이 UI만 보고 생각했던 구조는 다음과 같다.
- 이벤트
  - 캐러셀 리스트 `transform: translateX(카드 크기)`로 이동
  - 활성화된 카드에 `active` 클래스 추가, 이미지/버튼 등 활성화
  - 지나간 카드의 내용을 들어오는 카드에 바인딩

스와이프 기능 대신 버튼을 추가하여 무한 캐러셀처럼 구현해보면 어떨까? 해서 선택하게 되었다. <br>또한 처음에는 컴팩트하게 카드 3개만 마크업해 놓고, 버튼을 누르면 말 그대로 캐러셀 아이템의 내용이 통째로 이동하는 구조를 상상했었다. 가령 아래처럼 객체에 카드의 모든 정보를 담아놓고 마크업해놓은 카드 틀에 바인딩한 후 버튼을 누를 때마다 업데이트시키는 것이다.

```
const cardData = [
  {
    title: '신규 직업 렌',
    desc: '붉은 눈의 유랑자 렌 업데이트. 기다렸던 렌을 생성하고 육성 미션을 달성하세요. 렌 커스텀 PC 등 풍성한 선물의 기회가 찾아옵니다.',
    background: '../assets/images/back1.jpg',
    cardImage: '../assets/images/card1-active.png',
    buttonColor: 'linear-gradient(#EB5583, #E31957, 90deg)',
  },
  {
    title: '2025 여름 버닝 이벤트',
    desc: '하이퍼 버닝 MAX로 260레벨까지 1+4 레벨업, 버닝 비욘드로 270레벨까지 1+1 레벨업. 강력한 혜택으로 돌아온 챌린저스 월드 시즌 투',
    background: '../assets/images/back1.jpg',
    cardImage: '../assets/images/card1-active.png',
    buttonColor: 'linear-gradient(#EB5583, #E31957, 90deg)',
  },
  {
    title: '황혼빛 전야제 이벤트',
    desc: '크로니카의 재림을 위한 황혼빛 전야제에 참가하세요. 다양한 혜택과 선물이 용사님을 기다립니다.',
    background: '../assets/images/back1.jpg',
    cardImage: '../assets/images/card1-active.png',
    buttonColor: 'linear-gradient(#EB5583, #E31957, 90deg)',
  }
]

```

그런데 이 방식은 생각해보니 문제점이 있었다.

![제목 없는 동영상 - Clipchamp로 제작](https://github.com/user-attachments/assets/3c92cec1-e65c-4117-994d-fd7bb2701828)

원본 사이트에선 카드를 넘길 때마다 메인 이미지가 튀어나오는 애니메이션이 있었는데,<br>카드마다 이미지 소스들의 종류와 개수가 달라 객체에 담아 놓기에는 힘들 것 같았다.<br>
때문에 사이트를 참고하여 보여지는 3개의 카드 말고도 양옆에 보이지 않는 카드들을 한 개씩 더 마크업하여<br> 인덱스 조정으로 리스트 전체가 밀리는 효과를 주기로 했다.

### 개선점 알아보기
[원본 사이트](https://maplestory.nexon.com/Promotion/event/2025/20250619/intro)는 이벤트성 페이지라 접근성에는 크게 신경을 쓰지 않은 듯 보였다.<br>
대부분 콘텐츠의 내용이 되는 글자 부분도 전부 이미지에 통으로 들어 있었고, 버튼마저 이미지를 사용해서 활성화되면 색깔이 있는 이미지로 갈아끼우는 방식을 쓴 것 같았다.<br>
따라서 스와이프 UI를 키보드로도 조작 가능한 캐러셀 UI로 개선하고자 했으며 스크린 리더를 쓰는 유저들도 내용을 충분히 얻을 수 있도록 개선점을 잡았다.
- 스와이프 버튼 추가, 방향키로 스와이프 가능하도록 개선
- 이미지로 된 카드에 텍스트 내용 추가, 카드에 포커스 추가
- 카드 '자세히 보기' 버튼 마크업

### HTML 마크업/CSS 스타일링
```
<div class="wrapper">
  <a href="#" class="logo">
    <h1 class="sr-only">메이플스토리</h1>
    <img src="./assets/images/logo.png" alt="" />
  </a>
  <main class="carousel">
    <button type="button" class="carousel__btn carousel__btn--prev">
    </button>

    <div class="carousel__showcase">
      <ul class="carousel__list">
        <li class="card card3">
          <div class="card__image">
            <img src="./assets/images/obj1.png" alt="" />
            <img src="./assets/images/obj2.png" alt="" />
            <img src="./assets/images/obj3.png" alt="" />
            <img src="./assets/images/obj4.png" alt="" />
          </div> 
          <div class="sr-only">
            <h2>2025 여름 버닝 이벤트</h2>
            <p>
              하이퍼 버닝 MAX로 260레벨까지 1+4 레벨업, 버닝 비욘드로 270레벨까지 1+1 레벨업. 강력한 혜택으로 돌아온 챌린저스 월드 시즌 투
            </p>
          </div>
          <a class="card__btn" href="#" tabindex="-1">자세히 보기<span aria-hidden="true">></span></a>
        </li>
        <li class="card card1">...</li>
        <li class="card card2 active" tabindex="0">...</li>
        <li class="card card3">...</li>
        <li class="card card1">...</li>
      </ul>
    </div>

    <button type="button" class="carousel__btn carousel__btn--next">
      <span class="btn__icon">
        <img src="./assets/icons/icon-arrow-l.svg" style="rotate: 180deg;" alt="다음으로" />
      </span>
    </button>
  </main>

  <script src="./scripts/main.js"></script>
</div>
```

계획한대로 양옆엔 페이지 버튼, 가운데는 카드 5개를 `carousel__list` 안에 마크업하고 콘텐츠가 실제 보여지는 `carousel__showcase`에 `max-width`와 `overflow: hidden`속성을 줘 3개만 보이도록 조정했다.<br>

```
.carousel__showcase {
  display: flex;
  max-width: 1340px;
  overflow: hidden;
}

.carousel__list {
  display: flex;
  perspective: 1000px;
  transform: translateX(-566px);
  transition: transform 0.8s ease;
}
```

이 대목에서는 수치 조정에 아주 애를 먹었다..<br>
양옆의 활성화된 카드들에는 `translate3d` 속성을 이용해 `z`축으로 -100px만큼 멀어지게 해서 작아 보이도록 하는 방법을 썼는데,<br>
카드를 5개 마크업한 탓에 정확히 2,3,4번째 카드들만 보이도록 하려면 수치를 어림잡아 하드코딩해야 됐기 때문이다.<br>
또한 캐러셀 구현을 위한 `translateX` 조정은 카드 크기만큼만 하면 되겠지 했는데 실제로는 작아진 카드 크기에서 옆의 카드와 겹친 부분을 뺀 수만큼 조정해야 했다.<br>
따라서 직접 수치를 입력하며 어떨 때 맞아떨어지는 지 찾아보는 과정이 힘들었던 것 같다. 

### 캐러셀 슬라이드 동작 구현하기
`active` 클래스를 붙여주고 카드의 포커싱 활성화를 담당하는 `activateCard`, 캐러셀 리스트를 이동시키는 `moveCarousel`, 버튼을 눌렀을 때의 동작을 정의하는 `movePrevPage`와 `moveNextPage` 함수를 만들었다.
페이지 함수는 `carousel__btn--prev`와 `carousel__btn--next`의 클릭 이벤트 리스너에 각각 할당하였고 키보드 방향키로 발생하는 `keydown` 이벤트의 리스너 역시 구현했다.

```
const carouselList = document.querySelector('.carousel__list');
const carouselPrevBtn = document.querySelector('.carousel__btn--prev');
const carouselNextBtn = document.querySelector('.carousel__btn--next');
const card = document.querySelectorAll('.card');
const wrapper = document.querySelector('.wrapper');

const activateCard = (i) => {
  const activeCard = document.querySelector('.active');
  const activeBtn = card[i].querySelector('.card__btn');
  
  activeCard.classList.remove('active');
  card[i].classList.add('active');
  
  card.forEach(el => {
    const cardBtn = el.querySelector('.card__btn');

    cardBtn.setAttribute('tabindex', '-1');
    el.setAttribute('tabindex', '-1');
  });

  activeBtn.setAttribute('tabindex', '0');
  card[i].setAttribute('tabindex', '0');


  if (card[i].classList.contains('card1')) {
    wrapper.style.background = 'url("./assets/images/back1.webp")';
  }
  if (card[i].classList.contains('card2')) {
    wrapper.style.background = 'url("./assets/images/back2.webp")';
  }
  if (card[i].classList.contains('card3')) {
    wrapper.style.background = '#0c1920 url("./assets/images/back3.png")';
  }

  wrapper.style.backgroundPosition = 'center';
}
```
`activateCard` 에서는 `active` 클래스를 붙이는 것 이외에 활성화 카드와 '자세히 보기' 버튼의 `tabindex`를 0으로 설정하고 나머지는 비활성화하는 기능을 넣었다.<br>
또한 카드를 넘길 때마다 바뀌는 페이지의 배경 이미지는 각각 다른 클래스를 주어 이미지를 할당했다. 이 부분은 더 좋은 방법을 찾아보고 싶다.<br>

```
const moveCarousel = () => {
  const translateX = -((currentIndex - 2) * 450);
  carouselList.style.transform = `translateX(calc(-566px + ${translateX}px))`;
}

let currentIndex = 2;

const movePrevPage = (e) => {
  currentIndex = currentIndex % 5 === 1 ? 3 : currentIndex % 5 - 1;
  activateCard(currentIndex);
  moveCarousel(currentIndex);
}

const moveNextPage = (e) => {
  currentIndex = currentIndex === 3 ? 1 : currentIndex % 5 + 1;
  activateCard(currentIndex);
  moveCarousel(currentIndex);
}
```
`moveCarousel`에선 아까의 `translateX` 수치 조절 이슈로 픽셀을 직접 조정한 것이 아쉽게 느껴진다.<br>
`movePrevPage`와 `moveNextPage`에선 함수 바깥에 정의한 `currentIndex`의 값을 변화시키며 `moveCarousel`에서 밀리는 수치를 조절하도록 했다.<br>
사용자가 5번 이상 클릭했을 경우를 대비하여 `curentIndex`를 5로 나눈 나머지를 다시 재할당했으며,<br>
만약 진행방향의 끝에서 두 번째 위치라면 무한 스크롤을 위해 반대 방향 인덱스로 점프하도록 구현했다.<br>

이 부분에서도 '점프'방식 때문에 경계 인덱스에서 페이지 버튼을 누르면 역방향으로 이동하는 듯한 움직임이 생겨 다소 부자연스럽게 구현되었다.<br>
내용을 찾아 보니 `transition`을 해제하거나 `setTimeout`을 이용하라는 이야기가 있었지만 이 부분은 잘 되지 않아 보류하게 되었다. ㅠ_ㅠ

![제목 없는 동영상 - Clipchamp로 제작 (1)](https://github.com/user-attachments/assets/038005a3-9c93-4183-adf8-095ae2f62e8d)

## 🌈 3주차 회고
컴포넌트 클론 코딩을 생각해 보다가 떠오른 게 최근 업데이트된 메이플 사이트였다..ㅎ<br>
마침 캐러셀이랑 비슷하겠다, 좋아하는 거 재밌게 만들어 봐야지~ 하면서 호기롭게 뛰어들었는데 생각보다 구현에 시간을 많이 쏟았던 것 같다.<br>
무한스크롤에 3d 회전도 그렇고 애니메이션에, 무수한 `position: absolute`에... 재미는 있었지만 미세조정 싸움에 어지러웠던 과제였다..<br>
아직은 구현 로직을 떠오르는 데 꽤나 시간이 걸리는 걸 보니 연습을 많이 해야겠다고 느꼈다. 또 제출 후에도 아쉬웠던 부분 리팩토링을 위해 방법을 계속 찾아봐야겠다!<br>
여유가 된다면 차후 반응형과 swiper 라이브러리 없이 스와이프 기능도 구현해보고 싶다.


