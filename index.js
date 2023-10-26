const mainHolder = document.getElementById('mainHolder');
const Body = document.getElementById('body');

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
         <li><a href="/template/index.html">Home</a></li>
         <li ${pageTitle === 'Android | Tech Town' ? 'style="padding-top: 10px; color: rgb(255, 0, 0)"' : ''}>
            ${pageTitle === 'Android | Tech Town' ? 'Android' : '<a href="android.html">Android</a>'}
         </li>
         <li ${pageTitle === 'Laptop | Tech Town' ? 'style="padding-top: 10px; color: rgb(255, 0, 0)"' : ''}>
            ${pageTitle === 'Laptop | Tech Town' ? 'Laptop' : '<a href="laptop.html">Laptop</a>'}
         </li>
         <li ${pageTitle === 'Gaming Set | Tech Town' ? 'style="padding-top: 10px; color: rgb(255, 0, 0)"' : ''}>
            ${pageTitle === 'Gaming Set | Tech Town' ? 'Gaming Set' : '<a href="gamingset.html">Gaming Set</a>'}
         </li>
         <li ${pageTitle === 'Accessories | Tech Town' ? 'style="padding-top: 10px; color: rgb(255, 0, 0)"' : ''}>
            ${pageTitle === 'Accessories | Tech Town' ? 'Accessories' : '<a href="accessories.html">Accessories</a>'}
         </li>
      </ul>
   </div>

   <div class="search-holder">
      <button onclick="dropdownSearch()">Search</button>
   </div>

</div>

<div id="lowerPart" class="lower-part">
   <input type="text" placeholder="Search Here..."/>
   <button type="button">Search</button>
</div>`;



Body.insertAdjacentHTML('beforeend', Navbar);

const navbar = document.getElementById("navbar");

const lowerPart = document.getElementById("lowerPart");

const navHeight = navbar.offsetHeight;

// Making dropdown function

let clicked = false;

const dropdownSearch = () => {
   console.log(navHeight);
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

// Data fetching from the json file and render it into the html

fetch('data.json')
   .then((response) => response.json())
   .then((data) => {
      const itemContainer = document.getElementById('itemContainer');
      const rightItemContainer = document.getElementById('rightItemPart');

      data.forEach((item) => {

         if (pageTitle === "Laptop | Tech Town") {
            const newItem = `
            <div class="img-holder">
               <img alt="item-image" src="${item.image}"/>
            </div>

            <div class="product-detail-holder">
               <div class="product-brand">
                  ${item.type_name}
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
            div.innerHTML = newItem;

            itemContainer.appendChild(div);
         };
      });
   })
   .catch((error) => {
      console.error("Error while Rendering the data: " + error)
   });

const itemHolder = document.getElementsByClassName('item-holder');

