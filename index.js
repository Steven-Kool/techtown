const navbar = document.getElementById('navbar');

window.addEventListener('scroll', () => {
   if (window.scrollY > 50) {
      navbar.classList.add('navbar-after');
      console.log('hello');
   } if (window.scrollY < 50 || window.scrollY == 50) {
      navbar.classList.remove('navbar-after');
   }
});
