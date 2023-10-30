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
         <li><a href="index.html">Home</a></li>
         <li ${pageTitle === 'Android | Tech Town' ? 'style="padding-top: 10px; color: rgb(110, 110, 110)"' : ''}>
            ${pageTitle === 'Android | Tech Town' ? 'Android' : '<a href="android.html">Android</a>'}
         </li>
         <li ${pageTitle === 'Laptop | Tech Town' ? 'style="padding-top: 10px; color: rgb(110, 110, 110)"' : ''}>
            ${pageTitle === 'Laptop | Tech Town' ? 'Laptop' : '<a href="laptop.html">Laptop</a>'}
         </li>
         <li ${pageTitle === 'Gaming Set | Tech Town' ? 'style="padding-top: 10px; color: rgb(110, 110, 110)"' : ''}>
            ${pageTitle === 'Gaming Set | Tech Town' ? 'Gaming Set' : '<a href="gamingset.html">Gaming Set</a>'}
         </li>
         <li ${pageTitle === 'Accessories | Tech Town' ? 'style="padding-top: 10px; color: rgb(110, 110, 110)"' : ''}>
            ${pageTitle === 'Accessories | Tech Town' ? 'Accessories' : '<a href="accessories.html">Accessories</a>'}
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

// Get data from the url

const url = new URLSearchParams(window.location.search);

const parameter = decodeURIComponent(url.get("q"));

const filterValue = parameter.toUpperCase();

const searchPara = document.getElementById('searchPara');

searchPara.innerText = parameter;

fetch('data.json')
   .then((response) => response.json())
   .then((data) => {
      const itemContainer = document.getElementById('itemContainer');

      let itemFound = false;

      data.items.forEach((item) => {
         // Check if product_name and type_name exist before converting to uppercase
         const productName = item.product_name ? item.product_name.toUpperCase() : "";
         const typeName = item.type_name ? item.type_name.toUpperCase() : "";

         if (productName.includes(filterValue) || typeName.includes(filterValue)) {
            console.log(item);
            const newItem = `
            <div class="img-holder">
               <img alt="item-image" src="${item.image}"/>
            </div>

            <div class="product-detail-holder">
               <div class="product-brand">
                  ${item.product_name} (${item.type_name})
               </div>

               <div class "product-detail">
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

            itemFound = true;
         }
      });

      if (!itemFound) {
         const div = document.createElement('div');
         div.classList.add('no-result-found');
         div.innerText = 'No Result Found';

         itemContainer.appendChild(div);
      };
   })
   .catch((error) => {
      console.error("Error while Rendering the data:", error);
   });
