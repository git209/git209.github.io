
initShell();

const sections = {
  projects: {
    file: "projects.json",
    title: "Projects",
    subtitle: "Research themes, bilingual descriptions, images, highlights, and collaboration opportunities.",
    label: x => x.title || "Untitled project",
    make: () => ({id:"new-project",title:"New Project",titleZh:"新研究計畫",category:"Research",categoryZh:"研究",image:"../assets/hero-bg.png",summary:"",summaryZh:"",challenge:"",challengeZh:"",approach:"",approachZh:"",highlights:[],highlightsZh:[],collaboration:"",collaborationZh:""}),
    fields: [
      ["id","Slug / ID","text"],["title","English title","text"],["titleZh","中文標題","text"],
      ["category","English category","text"],["categoryZh","中文分類","text"],["image","Image path","image"],
      ["summary","English summary","textarea"],["summaryZh","中文摘要","textarea"],
      ["challenge","English challenge","textarea"],["challengeZh","中文研究挑戰","textarea"],
      ["approach","English approach","textarea"],["approachZh","中文研究方法","textarea"],
      ["highlights","English highlights","list"],["highlightsZh","中文研究亮點","list"],
      ["collaboration","English collaboration","textarea"],["collaborationZh","中文合作方向","textarea"]
    ]
  },
  people: {
    file: "people.json",
    title: "People",
    subtitle: "Member profiles, roles, photos, interests, biographies, and contact information.",
    label: x => x.name || "Unnamed member",
    make: () => ({id:"new-member",name:"New Member",nameZh:"新成員",group:"Students",groupZh:"學生",image:"../assets/hero-bg.png",research:[],researchZh:[],bio:"",bioZh:"",email:""}),
    fields: [
      ["id","Slug / ID","text"],["name","English name","text"],["nameZh","中文姓名","text"],
      ["group","English role","text"],["groupZh","中文身分","text"],["image","Photo path","image"],
      ["research","English interests","list"],["researchZh","中文研究專長","list"],
      ["bio","English biography","textarea"],["bioZh","中文簡介","textarea"],["email","Email","email"]
    ]
  },
  publications: {
    file: "publications.json",
    title: "Publications",
    subtitle: "Publication metadata, topics, DOI links, and featured records.",
    label: x => x.title || "Untitled publication",
    make: () => ({year:new Date().getFullYear(),topic:"Research",topicZh:"研究",title:"New Publication",titleZh:"新論文",journal:"",authors:"",doi:"",featured:false,note:"",noteZh:""}),
    fields: [
      ["year","Year","number"],["topic","English topic","text"],["topicZh","中文領域","text"],
      ["title","Publication title","textarea"],["titleZh","中文題名","textarea"],["journal","Journal","text"],
      ["authors","Authors","textarea"],["doi","DOI / Publisher URL","url"],["featured","Featured","checkbox"],
      ["note","English note","textarea"],["noteZh","中文說明","textarea"]
    ]
  },
  news: {
    file: "news.json",
    title: "News",
    subtitle: "Awards, publications, conferences, international visits, and team milestones.",
    label: x => x.title || "Untitled news",
    make: () => ({date:new Date().toISOString().slice(0,7),category:"News",categoryZh:"消息",title:"New Update",titleZh:"新消息",text:"",textZh:"",image:""}),
    fields: [
      ["date","Date","text"],["category","English category","text"],["categoryZh","中文分類","text"],
      ["title","English title","text"],["titleZh","中文標題","text"],["text","English description","textarea"],
      ["textZh","中文說明","textarea"],["image","Image path","image"]
    ]
  },
  gallery: {
    file: "gallery.json",
    title: "Gallery",
    subtitle: "Laboratory activities, research, visitors, and shared milestones.",
    label: x => x.title || "Untitled image",
    make: () => ({image:"assets/hero-bg.png",title:"New Gallery Image",titleZh:"新相片",category:"Lab Life",categoryZh:"實驗室生活",year:String(new Date().getFullYear())}),
    fields: [
      ["image","Image path","image"],["title","English title","text"],["titleZh","中文標題","text"],
      ["category","English category","text"],["categoryZh","中文分類","text"],["year","Year","text"]
    ]
  },
  site: {
    file: "site.json",
    title: "Site settings",
    subtitle: "Website identity, institution, email, profile links, and homepage images.",
    single: true,
    label: () => "Site settings",
    make: () => ({}),
    fields: [
      ["siteName","English site name","text"],["siteNameZh","中文網站名稱","text"],
      ["institution","English institution","text"],["institutionZh","中文機構名稱","text"],
      ["email","Email","email"],["scholar","Google Scholar URL","url"],["orcid","ORCID URL","url"],
      ["linkedin","LinkedIn URL","url"],["heroImage","Homepage hero image","image"],["spiritImage","Lab spirit image","image"]
    ]
  }
};

let section = "projects";
let data = [];
let selected = -1;

const list = document.querySelector("#items");
const form = document.querySelector("#form");
const empty = document.querySelector("#empty");
const notice = document.querySelector("#notice");
const search = document.querySelector("#search");
const addBtn = document.querySelector("#addBtn");

const esc = value => String(value ?? "").replace(/[&<>"']/g, c => ({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"}[c]));
const previewPath = value => (value || "").replace(/^\.\.\//, "");

async function openSection(name) {
  section = name;
  selected = -1;
  const config = sections[name];
  document.querySelector("#cmsTitle").textContent = config.title;
  document.querySelector("#cmsSubtitle").textContent = config.subtitle;
  addBtn.style.display = config.single ? "none" : "inline-flex";
  search.style.display = config.single ? "none" : "block";
  document.querySelectorAll(".cms-sidebar button").forEach(b => b.classList.toggle("active", b.dataset.section === name));

  try {
    const loaded = await fetch("data/" + config.file + "?v=" + Date.now()).then(r => {
      if (!r.ok) throw new Error("HTTP " + r.status);
      return r.json();
    });
    data = config.single ? [loaded] : loaded;
    renderList();
    config.single ? selectItem(0) : showEmpty();
    notice.textContent = "Loaded data/" + config.file + ".";
  } catch (error) {
    data = config.single ? [{}] : [];
    renderList();
    showEmpty();
    notice.textContent = "Unable to load " + config.file + ": " + error.message;
  }
}

function renderList() {
  const config = sections[section];
  const query = search.value.toLowerCase();
  list.innerHTML = "";

  data.forEach((item, index) => {
    if (query && !JSON.stringify(item).toLowerCase().includes(query)) return;
    const button = document.createElement("button");
    button.type = "button";
    button.className = "cms-list-item" + (selected === index ? " active" : "");
    button.draggable = !config.single;
    button.innerHTML = `<span class="drag-handle">⋮⋮</span><span>${esc(config.label(item))}</span><small>${index + 1}</small>`;
    button.onclick = () => selectItem(index);
    button.ondragstart = e => e.dataTransfer.setData("text/plain", String(index));
    button.ondragover = e => e.preventDefault();
    button.ondrop = e => {
      e.preventDefault();
      const from = Number(e.dataTransfer.getData("text/plain"));
      const moved = data.splice(from, 1)[0];
      data.splice(index, 0, moved);
      selected = index;
      renderList();
      renderForm();
    };
    list.appendChild(button);
  });
}

function showEmpty() {
  form.classList.add("hidden");
  empty.classList.remove("hidden");
}

function selectItem(index) {
  selected = index;
  empty.classList.add("hidden");
  form.classList.remove("hidden");
  renderList();
  renderForm();
}

function renderForm() {
  const config = sections[section];
  const item = data[selected];
  if (!item) return showEmpty();

  form.innerHTML = "";
  config.fields.forEach(([key, label, type]) => {
    const field = document.createElement("div");
    field.className = "cms-field" + (["textarea","list","image"].includes(type) ? " wide" : "");
    const title = document.createElement("label");
    title.textContent = label;
    field.appendChild(title);

    if (type === "image") {
      field.innerHTML += `<div class="image-field">
        <img src="${esc(previewPath(item[key]))}" alt="">
        <div>
          <input type="text" value="${esc(item[key] || "")}">
          <input type="file" accept="image/*">
          <small>Preview only. Upload the selected file separately to the matching assets folder in GitHub.</small>
        </div>
      </div>`;
      const textInput = field.querySelector('input[type="text"]');
      const fileInput = field.querySelector('input[type="file"]');
      const image = field.querySelector("img");
      textInput.oninput = () => {
        item[key] = textInput.value;
        image.src = previewPath(textInput.value);
      };
      fileInput.onchange = () => {
        const file = fileInput.files[0];
        if (!file) return;
        image.src = URL.createObjectURL(file);
        const folder = section === "people" ? "people" : section === "news" ? "news" : section === "gallery" ? "gallery" : "research";
        const safe = file.name.toLowerCase().replace(/[^a-z0-9._-]+/g, "-");
        const path = section === "site" ? "assets/creative/" + safe : "../assets/" + folder + "/" + safe;
        textInput.value = path;
        item[key] = path;
        notice.textContent = "Preview loaded. Upload " + safe + " into the matching assets folder.";
      };
    } else if (type === "textarea") {
      const input = document.createElement("textarea");
      input.value = item[key] || "";
      input.oninput = () => { item[key] = input.value; renderList(); };
      field.appendChild(input);
    } else if (type === "list") {
      const input = document.createElement("textarea");
      input.placeholder = "One item per line";
      input.value = Array.isArray(item[key]) ? item[key].join("\n") : "";
      input.oninput = () => { item[key] = input.value.split("\n").map(x => x.trim()).filter(Boolean); };
      field.appendChild(input);
    } else if (type === "checkbox") {
      const input = document.createElement("input");
      input.type = "checkbox";
      input.checked = Boolean(item[key]);
      input.onchange = () => { item[key] = input.checked; };
      field.appendChild(input);
    } else {
      const input = document.createElement("input");
      input.type = type;
      input.value = item[key] ?? "";
      input.oninput = () => {
        item[key] = type === "number" ? Number(input.value) : input.value;
        renderList();
      };
      field.appendChild(input);
    }
    form.appendChild(field);
  });

  if (!config.single) {
    const actions = document.createElement("div");
    actions.className = "cms-form-actions";
    actions.innerHTML = '<button type="button" class="danger-btn">Delete item</button><button type="button" class="secondary-btn">Duplicate item</button>';
    actions.querySelector(".danger-btn").onclick = () => {
      if (confirm("Delete this item?")) {
        data.splice(selected, 1);
        selected = -1;
        renderList();
        showEmpty();
      }
    };
    actions.querySelector(".secondary-btn").onclick = () => {
      const copy = JSON.parse(JSON.stringify(data[selected]));
      if (copy.id) copy.id += "-copy";
      data.splice(selected + 1, 0, copy);
      selected += 1;
      renderList();
      renderForm();
    };
    form.appendChild(actions);
  }
}

function addItem() {
  data.push(sections[section].make());
  selectItem(data.length - 1);
}

function downloadJSON() {
  const config = sections[section];
  const payload = config.single ? (data[0] || {}) : data;
  const blob = new Blob([JSON.stringify(payload, null, 2)], {type:"application/json"});
  const a = document.createElement("a");
  a.href = URL.createObjectURL(blob);
  a.download = config.file;
  a.click();
  setTimeout(() => URL.revokeObjectURL(a.href), 1000);
  notice.textContent = "Downloaded " + config.file + ". Replace data/" + config.file + " in GitHub.";
}

document.querySelectorAll(".cms-sidebar button[data-section]").forEach(b => b.onclick = () => openSection(b.dataset.section));
search.oninput = renderList;
addBtn.onclick = addItem;
document.querySelector("#downloadBtn").onclick = downloadJSON;
openSection(section);
