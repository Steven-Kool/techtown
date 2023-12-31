const Body = document.getElementById('body');
const mainHolder = document.getElementById('mainHolder');

const pageTitle = document.title;

const Navbar = `
<div id="navbar" class="navbar navbar-before">

   <div class="logo-holder">
      <img alt="logo" src="/images/20.png">
      <div style="text-align: center;">
         <span style="color: #DD2525">Tech</span>
         <span style="color: #01B4D2">Town</span>
      </div>
   </div>

   <div class="link-holder">
      <ul>
         <li><a href="index.html">Home</a></li>
         <li ${pageTitle === 'Android' ? 'style="padding-top: 10px; color: rgb(110, 110, 110)"' : ''}>
            ${pageTitle === 'Android' ? 'Android' : '<a href="android.html">Android</a>'}
         </li>
         <li ${pageTitle === 'Laptop' ? 'style="padding-top: 10px; color: rgb(110, 110, 110)"' : ''}>
            ${pageTitle === 'Laptop' ? 'Laptop' : '<a href="laptop.html">Laptop</a>'}
         </li>
         <li ${pageTitle === 'GamingSet' ? 'style="padding-top: 10px; color: rgb(110, 110, 110)"' : ''}>
            ${pageTitle === 'GamingSet' ? 'Gaming Set' : '<a href="gamingset.html">Gaming Set</a>'}
         </li>
         <li ${pageTitle === 'Accessories' ? 'style="padding-top: 10px; color: rgb(110, 110, 110)"' : ''}>
            ${pageTitle === 'Accessories' ? 'Accessories' : '<a href="accessories.html">Accessories</a>'}
         </li>
      </ul>
   </div>

   <div class="search-holder">
      <div class="cart-holder">
         <img alt="cart" src="/images/cart.png"/>
      </div>
      <button onclick="dropdownSearch()">Search</button>
   </div>

</div>

<div id="lowerPart" class="lower-part">
   <form action="result.html" method="get">
      <input type="text" name="q" placeholder="Search Here..."/>
      <button type="submit">Search</button>
   </form>
</div>`;

Body.insertAdjacentHTML('beforeend', Navbar);

const navbar = document.getElementById("navbar");

const lowerPart = document.getElementById("lowerPart");

const navHeight = navbar.offsetHeight;

// Making dropdown function

let clicked = false;

const dropdownSearch = () => {
   if (clicked === false) {
      lowerPart.style.transform = `translateY(${navHeight}px)`;
      clicked = true;
   } else {
      lowerPart.style.transform = `translateY(-${navHeight}px)`;
      clicked = false;
   }
};

// Making to close the lower part if the user doesn't click that part

document.addEventListener('click', (event) => {
   const clickedPart = event.target;

   if (
     (clickedPart !== lowerPart && !lowerPart.contains(clickedPart)) &&
     (clickedPart !== navbar && !navbar.contains(clickedPart))
   ) {
      lowerPart.style.transform = `translateY(-${navHeight}px)`;
      clicked = false;
   }
});

// Adding footer

const footer = `
<div class="footer">
   <div>@ Tech Town. All Rights Reserved</div>

   <div>
      <img alt="facebook" src="/images/facebook.png" />

      <img alt="instagram" src="/images/instagram.png" />

      <img alt="twitter" src="/images/twitter.png" />

      <img alt="telegram" src="/images/telegram.png" />

      <img alt="mail" src="/images/mail.png" />
   </div>
</div>`;

Body.insertAdjacentHTML('beforeend', footer);

const floatFeedback = `
<div class="float-feedback" onclick="feedbackClick()">
   <img src="/images/feedback.png">
</div>`;

if (pageTitle !== 'Feedback') {
   Body.insertAdjacentHTML('beforeend', floatFeedback);
}

const feedbackClick = () => {
   window.location.href = '/feedback.html';
}

// Data fetching from the json file and render it into the html

fetch('data.json')
   .then((response) => response.json())
   .then((data) => {
      const itemContainer = document.getElementById('itemContainer');

      data.items.forEach((item) => {

         if (item.category === pageTitle.toLowerCase()) {
            const newItem = `
            <div class="img-holder">
               <img alt="item-image" src="${item.image}"/>
            </div>

            <div class="product-detail-holder">
               <div class="product-brand">
                  ${item.product_name} (${item.type_name})
               </div>

               <div class="product-detail">
                  ${item.product_quote}
               </div>

               <div class="product-price">
                  $ ${item.price}
               </div>
            </div>`;

            const div = document.createElement('div');
            div.classList.add('item-holder');
            div.classList.add('hidden');
            div.innerHTML = newItem;

            itemContainer.appendChild(div);

            div.addEventListener('mouseenter', () => {
               div.style
            })
         };
      });

      // Adding Popup Animation

      const itemHolder = document.querySelectorAll('.item-holder');

      const observer = new IntersectionObserver((entries, observer) => {
         entries.forEach((entry) => {
            if (entry.isIntersecting) {
               const visibleHeight = entry.intersectionRatio * entry.target.clientHeight;
               if (visibleHeight >= 0.5 * entry.target.clientHeight) {
                  if (entry.target.classList.contains('hidden')) {
                     entry.target.classList.remove('hidden');
                     entry.target.classList.add('popup');
                     observer.unobserve(entry.target);
                  }
               }
            }
         });
      }, { threshold: 0.5 });

      itemHolder.forEach((element) => observer.observe(element));

   })
   .catch((error) => {
      console.error("Error while Rendering the data: " + error)
   });

// Slide part

const mainSlide = document.getElementById('mainSlide');
const slideMovers = document.querySelectorAll('.slide-move-btn-holder button');

let currentSlide = 0;

slideMovers.forEach(btn => {
   btn.addEventListener('click', () => {
      if (btn.id === "next" && currentSlide < 3) {
         currentSlide += 1;
      } else if (btn.id === "prev" && currentSlide > 0) {
         currentSlide -= 1;
      }

      mainSlide.style.marginLeft = `-${currentSlide * 25}%`;
   });
});
