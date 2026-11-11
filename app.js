/* Menu content is intentionally kept in one place so prices and products are easy to update. */
const MENU = [
  { id:"classic-cookie", name:"Classic Choc Chip", category:"Cookies", price:65, description:"Golden baked cookie with generous chocolate chips.", tag:"A CLASSIC", art:"cookie" },
  { id:"double-choc", name:"Double Chocolate", category:"Cookies", price:75, description:"Rich cocoa cookie with a soft chocolate centre.", tag:"CHOCOLATE LOVE", art:"cookie" },
  { id:"red-velvet", name:"Red Velvet", category:"Cookies", price:75, description:"A tender red velvet bite with creamy sweetness.", tag:"A LITTLE FANCY", art:"cookie" },
  { id:"caramel-frappe", name:"Caramel Frappe", category:"Frappe Coffee", price:95, description:"Chilled coffee blended smooth with caramel.", tag:"BEST SELLER", art:"coffee" },
  { id:"mocha-frappe", name:"Mocha Frappe", category:"Frappe Coffee", price:100, description:"Coffee, chocolate and a creamy finish.", tag:"COFFEE FIX", art:"coffee" },
  { id:"vanilla-shake", name:"Vanilla Milkshake", category:"Milk Shake", price:85, description:"A timeless, creamy vanilla milkshake.", tag:"CROWD FAVOURITE", art:"cup" },
  { id:"chocolate-shake", name:"Chocolate Milkshake", category:"Milk Shake", price:90, description:"A rich chocolate shake for your sweet side.", tag:"EXTRA CHOCOLATE", art:"coffee" },
  { id:"iced-matcha", name:"Iced Matcha", category:"Matcha", price:105, description:"Smooth matcha over ice with a mellow finish.", tag:"FRESH & CALM", art:"matcha" },
  { id:"strawberry-matcha", name:"Strawberry Matcha", category:"Matcha", price:115, description:"Earthy matcha meets a bright strawberry layer.", tag:"A PRETTY SIP", art:"berry" },
  { id:"tropical-mango", name:"Mango Cooler", category:"Tropical Refresher", price:80, description:"A sunny mango refresher, served ice cold.", tag:"SUNSHINE IN A CUP", art:"soda" },
  { id:"berry-refresher", name:"Berry Refresher", category:"Tropical Refresher", price:85, description:"A fruity blend with a refreshing berry twist.", tag:"FRUITY MOOD", art:"berry" },
  { id:"sparkling-water", name:"Sparkling Water", category:"Soft Drinks", price:35, description:"Light, crisp bubbles to keep it simple.", tag:"KEEP IT COOL", art:"soda" },
  { id:"classic-cola", name:"Cola", category:"Soft Drinks", price:35, description:"An all-time favourite, served chilled.", tag:"THE CLASSIC", art:"coffee" }
];
const CATEGORIES = ["All","Cookies","Frappe Coffee","Milk Shake","Matcha","Tropical Refresher","Soft Drinks"];
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