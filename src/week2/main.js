document.querySelectorAll('.toggle').forEach((v, i) => {
  v.addEventListener('click', (e) => {
    document.querySelectorAll('.card__bottom')[i].classList.toggle('show-text');
    e.currentTarget.classList.toggle('rotate');
  })
})