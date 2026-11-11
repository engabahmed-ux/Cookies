/* Menu content is intentionally kept in one place so prices and products are easy to update. */
const MENU = [{"id":"espresso","name":"Espresso","category":"Coffee","price":65,"tag":"coffee","art":"coffee"},{"id":"americano","name":"Americano","category":"Coffee","price":70,"tag":"coffee","art":"coffee"},{"id":"turkish-coffee-double","name":"Turkish Coffee (Double)","category":"Coffee","price":45,"tag":"coffee","art":"coffee"},{"id":"turkish-coffee-single","name":"Turkish Coffee (Single)","category":"Coffee","price":35,"tag":"coffee","art":"coffee"},{"id":"turkish-coffee-cardamom-double","name":"Turkish Coffee Cardamom (Double)","category":"Coffee","price":50,"tag":"coffee","art":"coffee"},{"id":"turkish-coffee-cardamom-single","name":"Turkish Coffee Cardamom (Single)","category":"Coffee","price":40,"tag":"coffee","art":"coffee"},{"id":"tea","name":"Tea","category":"Coffee","price":20,"tag":"cup","art":"cup"},{"id":"flavor-tea","name":"Flavor Tea","category":"Coffee","price":25,"tag":"cup","art":"cup"},{"id":"french-coffee","name":"French Coffee","category":"Coffee","price":50,"tag":"coffee","art":"coffee"},{"id":"hazelnut-coffee","name":"Hazelnut Coffee","category":"Coffee","price":60,"tag":"coffee","art":"coffee"},{"id":"macchiato","name":"Macchiato","category":"Milk Way","price":70,"tag":"coffee","art":"coffee"},{"id":"cortado","name":"Cortado","category":"Milk Way","price":75,"tag":"coffee","art":"coffee"},{"id":"flat-white","name":"Flat White","category":"Milk Way","price":85,"tag":"coffee","art":"coffee"},{"id":"cappuccino","name":"Cappuccino","category":"Milk Way","price":95,"tag":"coffee","art":"coffee"},{"id":"latte","name":"Latte","category":"Milk Way","price":95,"tag":"coffee","art":"coffee"},{"id":"spanish-latte","name":"Spanish Latte","category":"Milk Way","price":110,"tag":"coffee","art":"coffee"},{"id":"salted-caramel-latte","name":"Salted Caramel Latte","category":"Milk Way","price":120,"tag":"coffee","art":"coffee"},{"id":"dark-mocha","name":"Dark Mocha","category":"Milk Way","price":115,"tag":"coffee","art":"coffee"},{"id":"white-mocha","name":"White Mocha","category":"Milk Way","price":115,"tag":"coffee","art":"coffee"},{"id":"toffee-crunch","name":"Toffee Crunch","category":"Milk Way","price":120,"tag":"SIGNATURE","art":"coffee"},{"id":"iced-latte","name":"Iced Latte","category":"Iced Coffee","price":110,"tag":"coffee","art":"coffee"},{"id":"iced-spanish","name":"Iced Spanish","category":"Iced Coffee","price":130,"tag":"coffee","art":"coffee"},{"id":"iced-toffee-crunch","name":"Iced Toffee Crunch","category":"Iced Coffee","price":155,"tag":"SIGNATURE","art":"coffee"},{"id":"iced-dark-mocha","name":"Iced Dark Mocha","category":"Iced Coffee","price":130,"tag":"coffee","art":"coffee"},{"id":"iced-white-mocha","name":"Iced White Mocha","category":"Iced Coffee","price":130,"tag":"coffee","art":"coffee"},{"id":"sea-salted-vanilla-latte","name":"Sea Salted Vanilla Latte","category":"Iced Coffee","price":140,"tag":"SIGNATURE","art":"coffee"},{"id":"iced-salted-caramel-latte","name":"Salted Caramel Latte","category":"Iced Coffee","price":145,"tag":"coffee","art":"coffee"},{"id":"iced-americano","name":"Iced Americano","category":"Iced Coffee","price":80,"tag":"coffee","art":"coffee"},{"id":"iced-pistachio-latte","name":"Iced Pistachio Latte","category":"Iced Coffee","price":150,"tag":"coffee","art":"coffee"},{"id":"speculoos-spanish-latte","name":"Speculoos Spanish Latte","category":"Iced Coffee","price":155,"tag":"SIGNATURE","art":"coffee"},{"id":"iced-creme-brulee","name":"Iced Creme Brulee","category":"Iced Coffee","price":150,"tag":"coffee","art":"coffee"},{"id":"dirty-coffee","name":"Dirty Coffee","category":"Iced Coffee","price":160,"tag":"NEW ITEM","art":"coffee"},{"id":"latte-frappe","name":"Latte Frappe","category":"Frappe Coffee","price":120,"tag":"coffee","art":"coffee"},{"id":"caramel-frappe","name":"Caramel Frappe","category":"Frappe Coffee","price":130,"tag":"coffee","art":"coffee"},{"id":"salted-caramel-frappe","name":"Salted Caramel Frappe","category":"Frappe Coffee","price":140,"tag":"coffee","art":"coffee"},{"id":"sea-salted-vanilla-frappe","name":"Sea Salted Vanilla Frappe","category":"Frappe Coffee","price":150,"tag":"SIGNATURE","art":"coffee"},{"id":"dark-mocha-frappe","name":"Dark Mocha Frappe","category":"Frappe Coffee","price":140,"tag":"coffee","art":"coffee"},{"id":"white-mocha-frappe","name":"White Mocha Frappe","category":"Frappe Coffee","price":140,"tag":"coffee","art":"coffee"},{"id":"spanish-frappe","name":"Spanish Frappe","category":"Frappe Coffee","price":140,"tag":"coffee","art":"coffee"},{"id":"peanut-butter-frappe","name":"Peanut Butter Frappe","category":"Frappe Coffee","price":145,"tag":"coffee","art":"coffee"},{"id":"coconut-frappe","name":"Coconut Frappe","category":"Frappe Coffee","price":145,"tag":"coffee","art":"coffee"},{"id":"tiramisu-frappe","name":"Tiramisu Frappe","category":"Frappe Coffee","price":160,"tag":"SIGNATURE","art":"coffee"},{"id":"vanilla-milk-shake","name":"Vanilla","category":"Milk Shake","price":120,"tag":"cup","art":"cup"},{"id":"chocolate-milk-shake","name":"Chocolate","category":"Milk Shake","price":130,"tag":"coffee","art":"coffee"},{"id":"strawberry-milk-shake","name":"Strawberry","category":"Milk Shake","price":135,"tag":"berry","art":"berry"},{"id":"mango-milk-shake","name":"Mango","category":"Milk Shake","price":135,"tag":"soda","art":"soda"},{"id":"blueberry-milk-shake","name":"Blueberry","category":"Milk Shake","price":145,"tag":"berry","art":"berry"},{"id":"nutella-milk-shake","name":"Nutella","category":"Milk Shake","price":145,"tag":"coffee","art":"coffee"},{"id":"lotus-milk-shake","name":"Lotus","category":"Milk Shake","price":150,"tag":"coffee","art":"coffee"},{"id":"hot-matcha","name":"Hot Matcha","category":"Matcha","price":100,"tag":"matcha","art":"matcha"},{"id":"matcha-spanish","name":"Matcha Spanish","category":"Matcha","price":120,"tag":"matcha","art":"matcha"},{"id":"matcha-mango","name":"Matcha Mango","category":"Matcha","price":140,"tag":"matcha","art":"matcha"},{"id":"matcha-strawberry","name":"Matcha Strawberry","category":"Matcha","price":140,"tag":"matcha","art":"matcha"},{"id":"matcha-blueberry","name":"Matcha Blueberry","category":"Matcha","price":160,"tag":"matcha","art":"matcha"},{"id":"matcha-white","name":"Matcha White","category":"Matcha","price":150,"tag":"matcha","art":"matcha"},{"id":"matcha-coconut","name":"Matcha Coconut","category":"Matcha","price":150,"tag":"matcha","art":"matcha"},{"id":"matcha-coconut-elderflower","name":"Matcha Coconut Elderflower","category":"Matcha","price":165,"tag":"SIGNATURE","art":"matcha"},{"id":"matcha-latte","name":"Matcha Latte","category":"Matcha","price":110,"tag":"matcha","art":"matcha"},{"id":"mango-lychee","name":"Mango Lychee","category":"Tropical Refresher","price":145,"tag":"soda","art":"soda"},{"id":"mixed-berry","name":"Mixed Berry","category":"Tropical Refresher","price":145,"tag":"berry","art":"berry"},{"id":"mango-coconut","name":"Mango Coconut","category":"Tropical Refresher","price":125,"tag":"soda","art":"soda"},{"id":"mango-blue","name":"Mango Blue","category":"Tropical Refresher","price":135,"tag":"soda","art":"soda"},{"id":"mango-passion","name":"Mango Passion","category":"Tropical Refresher","price":135,"tag":"soda","art":"soda"},{"id":"pina-colada","name":"Pina Colada","category":"Tropical Refresher","price":125,"tag":"cup","art":"cup"},{"id":"lemon-mint","name":"Lemon Mint","category":"Tropical Refresher","price":70,"tag":"soda","art":"soda"},{"id":"watermelon-mint","name":"Watermelon Mint","category":"Tropical Refresher","price":80,"tag":"soda","art":"soda"},{"id":"mango-juice","name":"Mango Juice","category":"Soft Drinks & Juices","price":70,"tag":"soda","art":"soda"},{"id":"strawberry-juice","name":"Strawberry Juice","category":"Soft Drinks & Juices","price":60,"tag":"berry","art":"berry"},{"id":"redbull","name":"Redbull","category":"Soft Drinks & Juices","price":80,"tag":"soda","art":"soda"},{"id":"orange-juice","name":"Orange Juice","category":"Soft Drinks & Juices","price":60,"tag":"soda","art":"soda"},{"id":"water","name":"Water","category":"Soft Drinks & Juices","price":15,"tag":"cup","art":"cup"},{"id":"classic-cookie","name":"Classic","category":"Cookies & Dessert","price":75,"tag":"cookie","art":"cookie"},{"id":"red-velvet-cookie","name":"Red Velvet","category":"Cookies & Dessert","price":85,"tag":"cookie","art":"cookie"},{"id":"double-chocolate-cookie","name":"Double Chocolate","category":"Cookies & Dessert","price":85,"tag":"cookie","art":"cookie"},{"id":"ferrero-rocher-cookie","name":"Ferrero Rocher","category":"Cookies & Dessert","price":85,"tag":"cookie","art":"cookie"},{"id":"pistachio-cookie","name":"Pistachio","category":"Cookies & Dessert","price":85,"tag":"cookie","art":"cookie"},{"id":"kinder-cookie","name":"Kinder","category":"Cookies & Dessert","price":85,"tag":"cookie","art":"cookie"},{"id":"cookies-casserole","name":"Cookies Casserole","category":"Cookies & Dessert","price":160,"tag":"cookie","art":"cookie"},{"id":"lotus-cookie","name":"Lotus","category":"Cookies & Dessert","price":85,"tag":"cookie","art":"cookie"},{"id":"oreo-cookie","name":"Oreo","category":"Cookies & Dessert","price":85,"tag":"cookie","art":"cookie"},{"id":"turkey-bagel","name":"Turkey Bagel","category":"Breakfast & Sandwiches","price":110,"tag":"cup","art":"cup"},{"id":"slami-panini","name":"Slami Panini","category":"Breakfast & Sandwiches","price":110,"tag":"cup","art":"cup"},{"id":"chicken-breasts","name":"Chicken Breasts","category":"Breakfast & Sandwiches","price":130,"tag":"cup","art":"cup"},{"id":"turkey-sourdough","name":"Turkey Sourdough","category":"Breakfast & Sandwiches","price":110,"tag":"cup","art":"cup"}].map(p=>({
  ...p,
  description: p.category === "Cookies & Dessert" ? "A sweet treat from our cookies and dessert menu." : p.category === "Breakfast & Sandwiches" ? "A savoury bite from our breakfast and sandwiches menu." : "A favourite from our menu, made for your happy moment."
}));
const CATEGORIES = ["All","Coffee","Milk Way","Iced Coffee","Frappe Coffee","Milk Shake","Matcha","Tropical Refresher","Soft Drinks & Juices","Cookies & Dessert","Breakfast & Sandwiches"];
const money = value => new Intl.NumberFormat("en-EG",{maximumFractionDigits:0}).format(value);
const state = { category:"All", query:"", selection:{} };
const $ = selector => document.querySelector(selector);
const categoryTabs = $("#categoryTabs");
const productGrid = $("#productGrid");
const selectionBackdrop = $("#selectionBackdrop");

function renderCategories(){
  categoryTabs.innerHTML = CATEGORIES.map(category => `<button class="category-tab ${state.category===category?"active":""}" role="tab" aria-selected="${state.category===category}" data-category="${category}">${category}</button>`).join("");
}
function artMarkup(product){
  if(product.art==="cookie") return '<div class="product-art cookie-art"><i></i><i></i><i></i><i></i><i></i></div>';
  const tone = product.art==="matcha"?"matcha":product.art==="berry"?"berry":product.art==="coffee"?"coffee":product.art==="soda"?"soda":"";
  return `<div class="product-art cup-art ${tone}"><span class="straw"></span></div>`;
}
function renderProducts(){
  const query=state.query.trim().toLowerCase();
  const filtered=MENU.filter(p=>(state.category==="All"||p.category===state.category)&&(!query||[p.name,p.category,p.description].join(" ").toLowerCase().includes(query)));
  $("#resultsCount").textContent = `${filtered.length} LITTLE FAVOURITE${filtered.length===1?"":"S"} TO DISCOVER`;
  productGrid.innerHTML = filtered.length ? filtered.map(p=>{
    const qty=state.selection[p.id]||0;
    return `<article class="product-card">
      <div class="product-visual"><span class="product-tag">${p.tag}</span>${artMarkup(p)}</div>
      <div class="product-info"><div class="product-category">${p.category.toUpperCase()}</div>
      <div class="product-title-row"><h3 class="product-title">${p.name}</h3><span class="product-price">${money(p.price)} EGP</span></div>
      <p class="product-description">${p.description}</p>
      <button class="add-button ${qty?"added":""}" data-add="${p.id}" type="button"><span>${qty?"ADDED · "+qty+" SELECTED":"ADD TO YOUR LIST"}</span><span>${qty?"✓":"＋"}</span></button></div></article>`;
  }).join("") : '<div class="no-results">No treats found. Try another search or category.</div>';
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
});
productGrid.addEventListener("click",event=>{
  const button=event.target.closest("[data-add]");
  if(!button)return;
  const id=button.dataset.add;
  state.selection[id]=(state.selection[id]||0)+1;
  update();
});
$("#productSearch").addEventListener("input",event=>{state.query=event.target.value;renderProducts();});
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
    heroCookie.style.transform=`translate(${x*13}px,${y*13}px) rotate(${-14+x*8}deg)`;
  });
  heroArt.addEventListener("pointerleave",()=>{heroCookie.style.transform="";});
}
renderCategories();
update();