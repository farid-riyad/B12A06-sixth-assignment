//DOM Elements
let allCategoryContainer = document.querySelector(".all-category");
let mobileAllCategoryContainer = document.querySelector(".mobile-all-category");
let categoryBtn = document.querySelector(".category-btn");
let cardContainer = document.querySelector(".card-container");
let cartContainer = document.querySelector(".cart-container");
let totalCart = document.querySelector(".total-cart");
let totalPrice = document.querySelector(".total-price");
let dialogBox = document.getElementById("card_details");

//Cart Array
let cart = [];

//Spinner
function showSpinner(container, show){
  if(show){
    container.innerHTML = '<div class="text-center mt-20"><span class="loading loading-dots loading-xl"></span></div>';
  } else {
    container.innerHTML = '';
  }
}

//Load Categories
function loadCategory(){
  showSpinner(allCategoryContainer, true);
  fetch("https://openapi.programming-hero.com/api/categories")
    .then(function(response){ return response.json(); })
    .then(function(data){
      showSpinner(allCategoryContainer, false);
      displayCategory(data.categories);
    });
}

//Display Categories
function displayCategory(categories){
  // প্রথমে All Trees
  let allTrees = '<li onclick="loadCategoryItem(\'plants\')" id="plants" class="category cursor-pointer bg-gray-200 md:bg-transparent hover:bg-green-700 hover:text-white py-2 px-3 rounded-sm">All Trees</li>';
  
  let html = '';
  for(let i=0; i<categories.length; i++){
    let cat = categories[i];
    html += '<li onclick="loadCategoryItem('+cat.id+')" id="'+cat.id+'" class="category cursor-pointer bg-gray-200 md:bg-transparent hover:bg-green-700 hover:text-white py-2 px-3 rounded-sm">'+cat.category_name+'</li>';
  }

  allCategoryContainer.innerHTML = allTrees + html;
  mobileAllCategoryContainer.innerHTML = allTrees + html;
}

//Mobile Toggle
categoryBtn.addEventListener("click", function(){
  document.querySelector(".arrow-down").classList.toggle("rotate-180");
  mobileAllCategoryContainer.classList.toggle("min-h-[0px]");
  mobileAllCategoryContainer.classList.toggle("max-h-[250px]");
});

//Load Items
function loadCategoryItem(id){
  showSpinner(cardContainer, true);
  
  let url = id === 'plants' 
    ? 'https://openapi.programming-hero.com/api/'+id 
    : 'https://openapi.programming-hero.com/api/category/'+id;

  fetch(url)
    .then(function(response){ return response.json(); })
    .then(function(data){
      showSpinner(cardContainer, false);
      displayItems(data.plants);
      highlightCategory(id);
    });
}

//Display Items
function displayItems(items){
  let html = '';
  for(let i=0; i<items.length; i++){
    let item = items[i];
    html += '<div class="card-item p-3 bg-white rounded-md shadow-md">'+
            '<div class="w-full max-h-[230px] overflow-hidden">'+
            '<img src="'+item.image+'" class="w-full h-full object-cover rounded-md">'+
            '</div>'+
            '<h2 onclick="loadDetails('+item.id+')" class="font-bold mt-3 cursor-pointer">'+item.name+'</h2>'+
            '<p class="text-sm text-gray-700 mb-3">'+item.description+'</p>'+
            '<div class="flex justify-between items-center">'+
            '<span class="text-green-700 bg-green-100 py-2 px-3 rounded-full">'+item.category+'</span>'+
            '<span class="font-medium">$'+item.price+'</span>'+
            '</div>'+
            '<button onclick="addToCart(\''+item.name+'\','+item.price+',\''+item.id+'\')" class="bg-green-700 text-white w-full py-3 rounded-full mt-3">Add to Cart</button>'+
            '</div>';
  }
  cardContainer.innerHTML = html;
}

//Highlight Active Category
function highlightCategory(id){
  let categories = document.querySelectorAll(".category");
  for(let i=0; i<categories.length; i++){
    categories[i].classList.remove("bg-green-700","text-white");
    categories[i].classList.add("bg-gray-200","md:bg-transparent");
  }
  let active = document.getElementById(id);
  if(active){
    active.classList.remove("bg-gray-200","md:bg-transparent");
    active.classList.add("bg-green-700","text-white");
  }
}

//Cart Functions
function addToCart(name, price, id){
  let found = false;
  for(let i=0; i<cart.length; i++){
    if(cart[i].id === id){
      cart[i].count += 1;
      cart[i].price += price;
      found = true;
      break;
    }
  }
  if(!found){
    cart.unshift({id:id, name:name, price:price, count:1});
  }
  updateCart();
}

function removeCart(id){
  cart = cart.filter(function(item){ return item.id !== id; });
  updateCart();
}

function updateCart(){
  let html = '';
  for(let i=0; i<cart.length; i++){
    let item = cart[i];
    html += '<div class="flex justify-between items-center p-2 bg-green-50 rounded-sm">'+
            '<div><h2 class="font-bold mb-1">'+item.name+'</h2>'+
            '<span>$'+(item.price/item.count)+' x '+item.count+' = $'+item.price+'</span></div>'+
            '<span onclick="removeCart(\''+item.id+'\')" class="cursor-pointer text-red-600"><i class="fa-solid fa-trash"></i></span>'+
            '</div>';
  }
  cartContainer.innerHTML = html;
  totalCart.innerText = cart.length;

  let total = 0;
  for(let i=0; i<cart.length; i++){ total += cart[i].price; }
  totalPrice.innerText = total;
}

//Load Details
function loadDetails(id){
  dialogBox.showModal();
  fetch('https://openapi.programming-hero.com/api/plant/'+id)
    .then(function(response){ return response.json(); })
    .then(function(data){
      showDetails(data.plants);
    });
}

function showDetails(detail){
  dialogBox.innerHTML = '<div class="modal-box p-3">'+
                        '<h1 class="text-2xl font-bold mb-2">'+detail.name+'</h1>'+
                        '<div class="w-full max-h-[320px] overflow-hidden">'+
                        '<img src="'+detail.image+'" class="w-full h-full object-cover rounded-md">'+
                        '</div>'+
                        '<p><b>Category:</b> '+detail.category+'</p>'+
                        '<p><b>Price:</b> $'+detail.price+'</p>'+
                        '<p><b>Description:</b> '+detail.description+'</p>'+
                        '<div class="modal-action">'+
                        '<form method="dialog"><button class="btn">Close</button></form>'+
                        '</div>'+
                        '</div>';
}

//Initialize
loadCategory();
loadCategoryItem('plants');