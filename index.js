const mainHolder = document.getElementById('mainHolder');

const navbar = document.getElementById('navbar');

window.addEventListener('scroll', () => {
   if (window.scrollY > 100) {
      navbar.classList.add('navbar-after');
   } if (window.scrollY < 100 || window.scrollY == 100) {
      navbar.classList.remove('navbar-after');
   }
});

const slideHolder = document.getElementById('slideHolder');
const slider = document.getElementById('slider');

slideHolder.style.marginLeft = '-100%';

let slideIndex = 0;

const slideShow = (index) => {
   if (clicked) {
      slideHolder.addEventListener('scroll', () => {
         let finalWidth = slideHolder.offsetWidth;
         const userScroll = slideHolder.scrollLeft;

         if ()
      })
   }
}
