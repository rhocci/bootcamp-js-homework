{
  const carouselList = document.querySelector('.carousel__list');
  const carouselPrevBtn = document.querySelector('.carousel__btn--prev');
  const carouselNextBtn = document.querySelector('.carousel__btn--next');
  const card = document.querySelectorAll('.card');
  const wrapper = document.querySelector('.wrapper');
  
  let currentIndex = 2;
  
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

  const moveCarousel = () => {
    const translateX = -((currentIndex - 2) * 450);
    carouselList.style.transform = `translateX(calc(-566px + ${translateX}px))`;
  }

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

  carouselPrevBtn.addEventListener('click', movePrevPage);
  carouselNextBtn.addEventListener('click', moveNextPage);

  document.addEventListener('keydown', (e) => {
    if (e.key === 'ArrowLeft') {
      movePrevPage();
    }
    if (e.key === 'ArrowRight') {
      moveNextPage();
    }
  });
}
