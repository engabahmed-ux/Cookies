/* Menu content is intentionally kept in one place so prices and products are easy to update. */
const MENU = [{"id":"espresso","name":"Espresso","category":"Coffee","price":65,"tag":"","art":"coffee"},{"id":"americano","name":"Americano","category":"Coffee","price":70,"tag":"","art":"coffee"},{"id":"turkish-coffee-double","name":"Turkish Coffee (Double)","category":"Coffee","price":45,"tag":"","art":"coffee"},{"id":"turkish-coffee-single","name":"Turkish Coffee (Single)","category":"Coffee","price":35,"tag":"","art":"coffee"},{"id":"turkish-coffee-cardamom-double","name":"Turkish Coffee Cardamom (Double)","category":"Coffee","price":50,"tag":"","art":"coffee"},{"id":"turkish-coffee-cardamom-single","name":"Turkish Coffee Cardamom (Single)","category":"Coffee","price":40,"tag":"","art":"coffee"},{"id":"tea","name":"Tea","category":"Coffee","price":20,"tag":"","art":"cup"},{"id":"flavor-tea","name":"Flavor Tea","category":"Coffee","price":25,"tag":"","art":"cup"},{"id":"french-coffee","name":"French Coffee","category":"Coffee","price":50,"tag":"","art":"coffee"},{"id":"hazelnut-coffee","name":"Hazelnut Coffee","category":"Coffee","price":60,"tag":"","art":"coffee"},{"id":"macchiato","name":"Macchiato","category":"Milk Way","price":70,"tag":"","art":"coffee"},{"id":"cortado","name":"Cortado","category":"Milk Way","price":75,"tag":"","art":"coffee"},{"id":"flat-white","name":"Flat White","category":"Milk Way","price":85,"tag":"","art":"coffee"},{"id":"cappuccino","name":"Cappuccino","category":"Milk Way","price":95,"tag":"","art":"coffee"},{"id":"latte","name":"Latte","category":"Milk Way","price":95,"tag":"","art":"coffee"},{"id":"spanish-latte","name":"Spanish Latte","category":"Milk Way","price":110,"tag":"","art":"coffee"},{"id":"salted-caramel-latte","name":"Salted Caramel Latte","category":"Milk Way","price":120,"tag":"","art":"coffee"},{"id":"dark-mocha","name":"Dark Mocha","category":"Milk Way","price":115,"tag":"","art":"coffee"},{"id":"white-mocha","name":"White Mocha","category":"Milk Way","price":115,"tag":"","art":"coffee"},{"id":"toffee-crunch","name":"Toffee Crunch","category":"Milk Way","price":120,"tag":"SIGNATURE","art":"coffee"},{"id":"iced-latte","name":"Iced Latte","category":"Iced Coffee","price":110,"tag":"","art":"coffee"},{"id":"iced-spanish","name":"Iced Spanish","category":"Iced Coffee","price":130,"tag":"","art":"coffee"},{"id":"iced-toffee-crunch","name":"Iced Toffee Crunch","category":"Iced Coffee","price":155,"tag":"SIGNATURE","art":"coffee"},{"id":"iced-dark-mocha","name":"Iced Dark Mocha","category":"Iced Coffee","price":130,"tag":"","art":"coffee"},{"id":"iced-white-mocha","name":"Iced White Mocha","category":"Iced Coffee","price":130,"tag":"","art":"coffee"},{"id":"sea-salted-vanilla-latte","name":"Sea Salted Vanilla Latte","category":"Iced Coffee","price":140,"tag":"SIGNATURE","art":"coffee"},{"id":"iced-salted-caramel-latte","name":"Salted Caramel Latte","category":"Iced Coffee","price":145,"tag":"","art":"coffee"},{"id":"iced-americano","name":"Iced Americano","category":"Iced Coffee","price":80,"tag":"","art":"coffee"},{"id":"iced-pistachio-latte","name":"Iced Pistachio Latte","category":"Iced Coffee","price":150,"tag":"","art":"coffee"},{"id":"speculoos-spanish-latte","name":"Speculoos Spanish Latte","category":"Iced Coffee","price":155,"tag":"SIGNATURE","art":"coffee"},{"id":"iced-creme-brulee","name":"Iced Creme Brulee","category":"Iced Coffee","price":150,"tag":"","art":"coffee"},{"id":"dirty-coffee","name":"Dirty Coffee","category":"Iced Coffee","price":160,"tag":"NEW ITEM","art":"coffee"},{"id":"latte-frappe","name":"Latte Frappe","category":"Frappe Coffee","price":120,"tag":"","art":"coffee"},{"id":"caramel-frappe","name":"Caramel Frappe","category":"Frappe Coffee","price":130,"tag":"","art":"coffee"},{"id":"salted-caramel-frappe","name":"Salted Caramel Frappe","category":"Frappe Coffee","price":140,"tag":"","art":"coffee"},{"id":"sea-salted-vanilla-frappe","name":"Sea Salted Vanilla Frappe","category":"Frappe Coffee","price":150,"tag":"SIGNATURE","art":"coffee"},{"id":"dark-mocha-frappe","name":"Dark Mocha Frappe","category":"Frappe Coffee","price":140,"tag":"","art":"coffee"},{"id":"white-mocha-frappe","name":"White Mocha Frappe","category":"Frappe Coffee","price":140,"tag":"","art":"coffee"},{"id":"spanish-frappe","name":"Spanish Frappe","category":"Frappe Coffee","price":140,"tag":"","art":"coffee"},{"id":"peanut-butter-frappe","name":"Peanut Butter Frappe","category":"Frappe Coffee","price":145,"tag":"","art":"coffee"},{"id":"coconut-frappe","name":"Coconut Frappe","category":"Frappe Coffee","price":145,"tag":"","art":"coffee"},{"id":"tiramisu-frappe","name":"Tiramisu Frappe","category":"Frappe Coffee","price":160,"tag":"SIGNATURE","art":"coffee"},{"id":"vanilla-milk-shake","name":"Vanilla","category":"Milk Shake","price":120,"tag":"","art":"cup"},{"id":"chocolate-milk-shake","name":"Chocolate","category":"Milk Shake","price":130,"tag":"","art":"coffee"},{"id":"strawberry-milk-shake","name":"Strawberry","category":"Milk Shake","price":135,"tag":"","art":"berry"},{"id":"mango-milk-shake","name":"Mango","category":"Milk Shake","price":135,"tag":"","art":"soda"},{"id":"blueberry-milk-shake","name":"Blueberry","category":"Milk Shake","price":145,"tag":"","art":"berry"},{"id":"nutella-milk-shake","name":"Nutella","category":"Milk Shake","price":145,"tag":"","art":"coffee"},{"id":"lotus-milk-shake","name":"Lotus","category":"Milk Shake","price":150,"tag":"","art":"coffee"},{"id":"hot-matcha","name":"Hot Matcha","category":"Matcha","price":100,"tag":"","art":"matcha"},{"id":"matcha-spanish","name":"Matcha Spanish","category":"Matcha","price":120,"tag":"","art":"matcha"},{"id":"matcha-mango","name":"Matcha Mango","category":"Matcha","price":140,"tag":"","art":"matcha"},{"id":"matcha-strawberry","name":"Matcha Strawberry","category":"Matcha","price":140,"tag":"","art":"matcha"},{"id":"matcha-blueberry","name":"Matcha Blueberry","category":"Matcha","price":160,"tag":"","art":"matcha"},{"id":"matcha-white","name":"Matcha White","category":"Matcha","price":150,"tag":"","art":"matcha"},{"id":"matcha-coconut","name":"Matcha Coconut","category":"Matcha","price":150,"tag":"","art":"matcha"},{"id":"matcha-coconut-elderflower","name":"Matcha Coconut Elderflower","category":"Matcha","price":165,"tag":"SIGNATURE","art":"matcha"},{"id":"matcha-latte","name":"Matcha Latte","category":"Matcha","price":110,"tag":"","art":"matcha"},{"id":"mango-lychee","name":"Mango Lychee","category":"Tropical Refresher","price":145,"tag":"","art":"soda"},{"id":"mixed-berry","name":"Mixed Berry","category":"Tropical Refresher","price":145,"tag":"","art":"berry"},{"id":"mango-coconut","name":"Mango Coconut","category":"Tropical Refresher","price":125,"tag":"","art":"soda"},{"id":"mango-blue","name":"Mango Blue","category":"Tropical Refresher","price":135,"tag":"","art":"soda"},{"id":"mango-passion","name":"Mango Passion","category":"Tropical Refresher","price":135,"tag":"","art":"soda"},{"id":"pina-colada","name":"Pina Colada","category":"Tropical Refresher","price":125,"tag":"","art":"cup"},{"id":"lemon-mint","name":"Lemon Mint","category":"Tropical Refresher","price":70,"tag":"","art":"soda"},{"id":"watermelon-mint","name":"Watermelon Mint","category":"Tropical Refresher","price":80,"tag":"","art":"soda"},{"id":"mango-juice","name":"Mango Juice","category":"Soft Drinks & Juices","price":70,"tag":"","art":"soda"},{"id":"strawberry-juice","name":"Strawberry Juice","category":"Soft Drinks & Juices","price":60,"tag":"","art":"berry"},{"id":"redbull","name":"Redbull","category":"Soft Drinks & Juices","price":80,"tag":"","art":"soda"},{"id":"orange-juice","name":"Orange Juice","category":"Soft Drinks & Juices","price":60,"tag":"","art":"soda"},{"id":"water","name":"Water","category":"Soft Drinks & Juices","price":15,"tag":"","art":"cup"},{"id":"classic-cookie","name":"Classic","category":"Cookies & Dessert","price":75,"tag":"","art":"cookie"},{"id":"red-velvet-cookie","name":"Red Velvet","category":"Cookies & Dessert","price":85,"tag":"","art":"cookie"},{"id":"double-chocolate-cookie","name":"Double Chocolate","category":"Cookies & Dessert","price":85,"tag":"","art":"cookie"},{"id":"ferrero-rocher-cookie","name":"Ferrero Rocher","category":"Cookies & Dessert","price":85,"tag":"","art":"cookie"},{"id":"pistachio-cookie","name":"Pistachio","category":"Cookies & Dessert","price":85,"tag":"","art":"cookie"},{"id":"kinder-cookie","name":"Kinder","category":"Cookies & Dessert","price":85,"tag":"","art":"cookie"},{"id":"cookies-casserole","name":"Cookies Casserole","category":"Cookies & Dessert","price":160,"tag":"","art":"cookie"},{"id":"lotus-cookie","name":"Lotus","category":"Cookies & Dessert","price":85,"tag":"","art":"cookie"},{"id":"oreo-cookie","name":"Oreo","category":"Cookies & Dessert","price":85,"tag":"","art":"cookie"},{"id":"turkey-bagel","name":"Turkey Bagel","category":"Breakfast & Sandwiches","price":110,"tag":"","art":"cup"},{"id":"slami-panini","name":"Slami Panini","category":"Breakfast & Sandwiches","price":110,"tag":"","art":"cup"},{"id":"chicken-breasts","name":"Chicken Breasts","category":"Breakfast & Sandwiches","price":130,"tag":"","art":"cup"},{"id":"turkey-sourdough","name":"Turkey Sourdough","category":"Breakfast & Sandwiches","price":110,"tag":"","art":"cup"},{"id":"extra-syrup","name":"Syrup","category":"Extras","price":30,"tag":"EXTRA","art":"cup"},{"id":"extra-puree-sauce","name":"Puree/Sauce","category":"Extras","price":40,"tag":"EXTRA","art":"cup"},{"id":"extra-whipped-cream","name":"Whipped Cream","category":"Extras","price":40,"tag":"EXTRA","art":"cup"},{"id":"extra-milk-alternative","name":"Milk Alternative","category":"Extras","price":50,"tag":"EXTRA","art":"cup"}].map(p=>({
  ...p,
  tag: p.tag || "MENU FAVOURITE",
  description: p.category === "Cookies & Dessert" ? "A sweet treat from our cookies and dessert menu." : p.category === "Breakfast & Sandwiches" ? "A savoury bite from our breakfast and sandwiches menu." : "A favourite from our menu, made for your happy moment."
}));
const CATEGORIES = ["All","Coffee","Milk Way","Iced Coffee","Frappe Coffee","Milk Shake","Matcha","Tropical Refresher","Soft Drinks & Juices","Cookies & Dessert","Breakfast & Sandwiches","Extras"];
const money = value => new Intl.NumberFormat("en-EG",{maximumFractionDigits:0}).format(value);
const state = { category:"All", query:"", selection:{} };
const $ = selector => document.querySelector(selector);
const categoryTabs = $("#categoryTabs");
const productGrid = $("#productGrid");
const selectionBackdrop = $("#selectionBackdrop");


const CATEGORY_META = {
  "All":{icon:"✦",hint:"See the full menu"},"Coffee":{icon:"☕",hint:"Hot coffee & tea"},
  "Milk Way":{icon:"🥛",hint:"Creamy coffee classics"},"Iced Coffee":{icon:"🧊",hint:"Chilled coffee favourites"},
  "Frappe Coffee":{icon:"🍦",hint:"Blended & frothy"},"Milk Shake":{icon:"🍓",hint:"Thick, creamy shakes"},
  "Matcha":{icon:"🍵",hint:"Smooth green goodness"},"Tropical Refresher":{icon:"🍹",hint:"Fruity & refreshing"},
  "Soft Drinks & Juices":{icon:"🍊",hint:"Juices, soda & water"},"Cookies & Dessert":{icon:"🍪",hint:"Freshly baked treats"},
  "Breakfast & Sandwiches":{icon:"🥯",hint:"Easy morning bites"},"Extras":{icon:"✨",hint:"Little finishing touches"}
};
function renderCategories(){
  categoryTabs.innerHTML=CATEGORIES.map(category=>{
    const count=category==="All"?MENU.length:MENU.filter(p=>p.category===category).length;
    const meta=CATEGORY_META[category]||{icon:"✦",hint:"Explore this category"};
    return `<button class="category-card ${state.category===category&&category!=="All"?"active":""}" data-category="${category}" type="button" aria-pressed="${state.category===category}">
      <span class="category-card-icon" aria-hidden="true">${meta.icon}</span><span class="category-card-copy"><strong>${category==="All"?"Full Menu":category}</strong><small>${meta.hint}</small></span><span class="category-card-count">${count}</span><span class="category-card-arrow" aria-hidden="true">→</span></button>`;
  }).join("");
}
function drinkKind(p){
  if(p.category==="Cookies & Dessert")return "cookie";
  if(p.category==="Breakfast & Sandwiches")return "food";
  if(p.category==="Extras")return "extra";
  if(p.category==="Coffee")return /tea/i.test(p.name)?"tea":"hot";
  if(p.category==="Milk Way")return "hot";
  if(p.category==="Iced Coffee")return "iced";
  if(p.category==="Frappe Coffee")return "frappe";
  if(p.category==="Milk Shake")return "shake";
  if(p.category==="Matcha")return "matcha";
  if(p.category==="Tropical Refresher")return "refresher";
  if(p.category==="Soft Drinks & Juices")return /water/i.test(p.name)?"water":/redbull/i.test(p.name)?"can":"juice";
  return "cup";
}
function drinkTone(p){
  const n=p.name.toLowerCase();
  if(/strawberry|red velvet/.test(n))return "strawberry";
  if(/mango|passion|pina colada|orange/.test(n))return "mango";
  if(/blueberry|mixed berry|berry/.test(n))return "berry";
  if(/matcha/.test(n))return "green";
  if(/pistachio/.test(n))return "pistachio";
  if(/chocolate|mocha|oreo|nutella|cocoa/.test(n))return "chocolate";
  if(/caramel|toffee|brulee|lotus|speculoos/.test(n))return "caramel";
  if(/coconut/.test(n))return "coconut";
  if(/lemon|mint|watermelon/.test(n))return "citrus";
  return "classic";
}
function artMarkup(p){
  const kind=drinkKind(p),tone=drinkTone(p);
  if(kind==="cookie")return '<div class="product-art cookie-art"><i></i><i></i><i></i><i></i><i></i></div>';
  if(kind==="food")return `<div class="product-art food-art ${tone}"><span></span><i></i><b></b></div>`;
  if(kind==="extra")return '<div class="product-art extra-art"><span></span><i></i></div>';
  return `<div class="product-art drink-art ${kind} ${tone}" aria-hidden="true"><span class="drink-straw"></span><span class="drink-liquid"></span><span class="drink-ice ice-one"></span><span class="drink-ice ice-two"></span><span class="drink-foam"></span><span class="drink-garnish"></span><span class="drink-label"></span></div>`;
}
function renderProducts(){
  const query=state.query.trim().toLowerCase();
  const filtered=MENU.filter(p=>(state.category==="All"||p.category===state.category)&&(!query||[p.name,p.category,p.description].join(" ").toLowerCase().includes(query)));
  if(state.category==="All"&&!query){
    $("#resultsCount").textContent="PICK A CATEGORY TO SEE ITS MENU";
    productGrid.innerHTML='<div class="menu-prompt"><span>☕</span><strong>Your next favourite is one tap away.</strong><small>Choose a menu above and we’ll take you straight to its treats.</small></div>';
    return;
  }
  $("#resultsCount").textContent=`${filtered.length} LITTLE FAVOURITE${filtered.length===1?"":"S"} TO DISCOVER`;
  productGrid.innerHTML=filtered.length?filtered.map(p=>{
    const qty=state.selection[p.id]||0;
    return `<article class="product-card"><div class="product-visual"><span class="product-tag">${p.tag}</span>${artMarkup(p)}</div>
      <div class="product-info"><div class="product-category">${p.category.toUpperCase()}</div><div class="product-title-row"><h3 class="product-title">${p.name}</h3><span class="product-price">${money(p.price)} EGP</span></div>
      <p class="product-description">${p.description}</p><button class="add-button ${qty?"added":""}" data-add="${p.id}" type="button"><span>${qty?"ADDED · "+qty+" SELECTED":"ADD TO YOUR LIST"}</span><span>${qty?"✓":"＋"}</span></button></div></article>`;
  }).join(""):'<div class="no-results">No treats found. Try another search or category.</div>';
}

/* Small, non-blocking cookie feedback when a menu item is added. */
function launchCookiePop(sourceButton){
  const layer = $("#cookieFlightLayer");
  if (!layer || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
  const rect = sourceButton.getBoundingClientRect();
  const cookie = document.createElement("span");
  cookie.className = "cookie-pop";
  cookie.innerHTML = '<i></i><i></i><i></i><i></i><b></b>';
  const size = 38;
  cookie.style.left = (rect.left + rect.width / 2 - size / 2) + "px";
  cookie.style.top = (rect.top + rect.height / 2 - size / 2) + "px";
  const drift = (Math.random() - .5) * 58;
  layer.appendChild(cookie);
  const animation = cookie.animate([
    { transform: "translate3d(0,0,0) rotate(-12deg) scale(.55)", opacity: 0 },
    { transform: "translate3d(" + drift * .35 + "px,-34px,0) rotate(105deg) scale(1.12)", opacity: 1, offset: .38 },
    { transform: "translate3d(" + drift + "px,-76px,0) rotate(205deg) scale(.92)", opacity: .95, offset: .72 },
    { transform: "translate3d(" + drift * 1.25 + "px,-96px,0) rotate(250deg) scale(.72)", opacity: 0 }
  ], { duration: 760, easing: "cubic-bezier(.2,.75,.25,1)" });
  animation.onfinish = () => cookie.remove();
}

function selectedProducts(){return MENU.filter(p=>state.selection[p.id]>0);}
function totals(){
  const count=Object.values(state.selection).reduce((sum,n)=>sum+n,0);
  const total=selectedProducts().reduce((sum,p)=>sum+p.price*state.selection[p.id],0);
  return {count,total};
}
function renderTotals(){
  const {count,total}=totals();
  $("#selectedCount").textContent=count;
  $("#estimatedTotal").textContent=money(total);
  $("#modalTotal").textContent=money(total);
  $("#emptySelection").hidden=count>0;
  $("#selectionItems").hidden=count===0;
  $("#resetSelection").disabled=count===0;
  $("#selectionItems").innerHTML=selectedProducts().map(p=>`<div class="selection-row">
    <div><h3>${p.name}</h3><small>${money(p.price)} EGP each</small></div>
    <div class="quantity-control"><button type="button" data-quantity="${p.id}" data-change="-1" aria-label="Remove one ${p.name}">−</button><b>${state.selection[p.id]}</b><button type="button" data-quantity="${p.id}" data-change="1" aria-label="Add one ${p.name}">+</button></div>
    <strong class="line-price">${money(p.price*state.selection[p.id])} EGP</strong>
  </div>`).join("");
}
function update(){
  renderProducts();
  renderTotals();
}
categoryTabs.addEventListener("click",event=>{
  const button=event.target.closest("[data-category]");
  if(!button)return;
  state.category=button.dataset.category;
  renderCategories();renderProducts();
  $("#productGrid").scrollIntoView({behavior:"smooth",block:"start"});
});
productGrid.addEventListener("click",event=>{
  const button=event.target.closest("[data-add]");
  if(!button)return;
  const id=button.dataset.add;
  state.selection[id]=(state.selection[id]||0)+1;
  launchCookiePop(button);
  button.classList.remove("just-added");
  void button.offsetWidth;
  button.classList.add("just-added");
  update();
});
$("#productSearch").addEventListener("input",event=>{state.query=event.target.value;state.category="All";renderCategories();renderProducts();if(state.query.trim())$("#productGrid").scrollIntoView({behavior:"smooth",block:"start"});});
function openSelection(){selectionBackdrop.hidden=false;document.body.style.overflow="hidden";$("#closeSelection").focus();}
function closeSelection(){selectionBackdrop.hidden=true;document.body.style.overflow="";}
$("#openSelection").addEventListener("click",openSelection);
$("#closeSelection").addEventListener("click",closeSelection);
selectionBackdrop.addEventListener("click",event=>{if(event.target===selectionBackdrop)closeSelection();});
document.addEventListener("keydown",event=>{if(event.key==="Escape"&&!selectionBackdrop.hidden)closeSelection();});
$("#selectionItems").addEventListener("click",event=>{
  const button=event.target.closest("[data-quantity]");
  if(!button)return;
  const id=button.dataset.quantity;
  state.selection[id]=(state.selection[id]||0)+Number(button.dataset.change);
  if(state.selection[id]<=0)delete state.selection[id];
  update();
});
$("#resetSelection").addEventListener("click",()=>{state.selection={};update();});
$("#backToMenu").addEventListener("click",()=>{closeSelection();$("#menu").scrollIntoView({behavior:"smooth"});});
$("#mobileMenuToggle").addEventListener("click",()=>{
  const nav=$(".main-nav");
  const open=nav.classList.toggle("open");
  $("#mobileMenuToggle").setAttribute("aria-expanded",String(open));
});
document.querySelectorAll(".nav-link").forEach(link=>link.addEventListener("click",()=>{$(".main-nav").classList.remove("open");$("#mobileMenuToggle").setAttribute("aria-expanded","false");}));
const revealObserver=new IntersectionObserver(entries=>entries.forEach(entry=>{if(entry.isIntersecting){entry.target.classList.add("visible");revealObserver.unobserve(entry.target);}}),{threshold:.12});
document.querySelectorAll(".reveal").forEach(el=>revealObserver.observe(el));
const heroCookie=$("#heroCookie");
const heroArt=$(".hero-art");
if(heroArt&&window.matchMedia("(pointer:fine)").matches){
  heroArt.addEventListener("pointermove",event=>{
    const rect=heroArt.getBoundingClientRect();
    const x=(event.clientX-rect.left)/rect.width-.5;
    const y=(event.clientY-rect.top)/rect.height-.5;
    heroCookie.style.setProperty("--pointer-x", (x*18)+"px");
    heroCookie.style.setProperty("--pointer-y", (y*18)+"px");
    heroCookie.style.setProperty("--pointer-rotate", (x*10)+"deg");
  });
  heroArt.addEventListener("pointerleave",()=>{heroCookie.style.removeProperty("--pointer-x");heroCookie.style.removeProperty("--pointer-y");heroCookie.style.removeProperty("--pointer-rotate");});
}

const wanderingCookie=$("#wanderingCookie");
const finePointer=window.matchMedia("(pointer:fine) and (hover:hover)");
const reducedMotion=window.matchMedia("(prefers-reduced-motion: reduce)");
if(wanderingCookie&&finePointer.matches&&!reducedMotion.matches){
  let frame=0,x=0,y=0;
  window.addEventListener("pointermove",event=>{
    x=event.clientX/window.innerWidth-.5;y=event.clientY/window.innerHeight-.5;
    if(frame)return;
    frame=requestAnimationFrame(()=>{
      wanderingCookie.style.setProperty("--mouse-x",(x*10).toFixed(2)+"px");
      wanderingCookie.style.setProperty("--mouse-y",(y*10).toFixed(2)+"px");
      wanderingCookie.style.setProperty("--mouse-tilt",(x*5).toFixed(2)+"deg");frame=0;
    });
  },{passive:true});
}

renderCategories();
update();