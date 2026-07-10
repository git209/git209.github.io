
let lang = localStorage.getItem("ywl-lang") || (navigator.language.startsWith("zh") ? "zh" : "en");
const t = () => window.I18N[lang];
const text = (en, zh) => lang === "zh" ? zh : en;
function setStaticText(){
  document.documentElement.lang = lang === "zh" ? "zh-Hant" : "en";
  document.querySelectorAll("[data-t]").forEach(el => {
    const key = el.dataset.t;
    if(t()[key] !== undefined) el.textContent = t()[key];
  });
  const btn=document.querySelector("#langBtn"); if(btn) btn.textContent=t().switch;
}
function initNav(){
  const m=document.querySelector("#menuBtn"), links=document.querySelector("#navLinks");
  if(m&&links){m.onclick=()=>links.classList.toggle("open");links.querySelectorAll("a").forEach(a=>a.onclick=()=>links.classList.remove("open"))}
  const b=document.querySelector("#langBtn"); if(b)b.onclick=()=>{lang=lang==="zh"?"en":"zh";localStorage.setItem("ywl-lang",lang);setStaticText();renderPage();};
}
function header(active=""){
  const d=SITE_DATA.profile;
  return `<header class="header"><div class="container nav">
  <a class="brand" href="index.html"><b>${d.name.toUpperCase()}</b><small>${text("INTELLIGENT MICROSYSTEMS","智慧微系統研究")}</small></a>
  <button class="menu" id="menuBtn" aria-label="Menu">☰</button>
  <nav class="links" id="navLinks">
  ${[["index.html","home"],["projects.html","projects"],["people.html","people"],["gallery.html","gallery"],["news.html","news"],["teaching.html","teaching"],["join.html","join"]].map(([u,k])=>`<a href="${u}" class="${active===k?"active":""}" data-t="${k}">${t()[k]}</a>`).join("")}
  <a href="index.html#contact" data-t="contact">${t().contact}</a><button class="lang" id="langBtn">${t().switch}</button></nav></div></header>`;
}
function footer(){
 const p=SITE_DATA.profile;
 return `<footer class="footer"><div class="container footer-row"><div><b>${p.name}</b><div>${t().footer} · National Taiwan University</div></div><div>© ${new Date().getFullYear()} ${p.name}</div></div></footer>`;
}
function projectCard(p){return `<article class="card"><img class="card-img" loading="lazy" src="${p.image}" alt="${text(p.title,p.titleZh)}"><div class="card-body"><span class="pill">${text(p.category,p.categoryZh)}</span><h3>${text(p.title,p.titleZh)}</h3><p>${text(p.summary,p.summaryZh)}</p><div class="tags">${p.tags.map(x=>`<span class="tag">${x}</span>`).join("")}</div></div></article>`}
function peopleCard(p){return `<article class="card people-card"><img class="card-img" loading="lazy" src="${p.image}" alt="${text(p.name,p.nameZh)}"><div class="card-body"><span class="pill">${text(p.role,p.roleZh)}</span><h3>${text(p.name,p.nameZh)}</h3><p>${text(p.bio,p.bioZh)}</p><div class="tags">${text(p.interests,p.interestsZh).map(x=>`<span class="tag">${x}</span>`).join("")}</div></div></article>`}
function galleryCard(g){return `<article class="gallery-card"><img loading="lazy" src="${g.image}" alt="${text(g.title,g.titleZh)}"><div class="caption"><b>${text(g.title,g.titleZh)}</b><small>${g.year} · ${g.category}</small></div></article>`}
function newsItem(n){return `<article class="news-item"><time>${n.date}</time><h3>${text(n.title,n.titleZh)}</h3><p>${text(n.text,n.textZh)}</p></article>`}
