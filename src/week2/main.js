{
  const accordion = document.querySelector('.accordion');
  const accordionBtn = accordion.querySelectorAll('.toggle');
  const accordionContent = accordion.querySelectorAll('.card__bottom');

  accordionBtn.forEach((btn, i) => {
    btn.addEventListener('click', () => {
      accordionContent[i].classList.toggle('show-text')
      btn.querySelector('img').classList.toggle('rotate');
    })
  })
}