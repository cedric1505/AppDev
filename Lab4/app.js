// Lab4 - Schedule IS (JS)
// Seed Data stored
let classes = [
  {code:"CS104",title:"Data Structures and Analysis",day:"Tuesday",time:"09:00"},
  {code:"CS124",title:"Discrete Structure",day:"Friday",time:"13:00"},
  {code:"MATHEd14",title:"Linear Algebra",day:"Friday",time:"09:00"},
  {code:"CS108",title:"Object Oriented Programming",day:"Wednesday",time:"17:30"},
  {code:"CS106",title:"Applications Development and Emerging Technologies",day:"Monday",time:"09:00"}
];
let viewMode = "table";

// Student object
function Student(name, id) {
  this.name = name;
  this.id = id;
  this.enrolledClasses = [];
}
Student.prototype.addClass = function(cls) {
  const conflict = this.enrolledClasses.find(c => c.day === cls.day && c.time === cls.time);
  if (conflict) {
    alert(`Conflict with ${conflict.code} at ${conflict.time}`);
    return;
  }
  this.enrolledClasses.push(cls);
  console.log(`Enrolled ${cls.code}`);
};
Student.prototype.listClasses = function() {
  return this.enrolledClasses.map(c => `${c.code} (${c.day} ${c.time})`).join("\n") || "No classes yet.";
};

const student = new Student("Juan Dela Cruz","S123");

// Utility: find overlapping classes
function getOverlappingCodes(classes) {
  const overlaps = new Set();
  for (let i = 0; i < classes.length; i++) {
    for (let j = i + 1; j < classes.length; j++) {
      if (classes[i].day === classes[j].day && classes[i].time === classes[j].time) {
        overlaps.add(classes[i].code);
        overlaps.add(classes[j].code);
      }
    }
  }
  return overlaps;
}

// Render
function renderList(data=classes) {
  const container = document.getElementById("list");
  container.innerHTML = "";

  if (viewMode === "table") {
    const table = document.createElement("table");
    table.innerHTML = "<tr><th>Code</th><th>Title</th><th>Day</th><th>Time</th><th>Actions</th></tr>";
    data.forEach(c => {
      const tr = document.createElement("tr");
      if (isAfterSix(c.time)) tr.classList.add("danger");
      tr.innerHTML = `
        <td>${c.code}</td><td>${c.title}</td><td>${c.day}</td><td>${c.time}</td>
        <td>
          <button onclick=\"editRecord('${c.code}')\">Edit</button>
          <button onclick=\"deleteRecord('${c.code}')\">Delete</button>
          <button onclick=\"student.addClass(${JSON.stringify(c)})\">Enroll</button>
        </td>`;
      table.appendChild(tr);
    });
    // Add total classes row at the bottom
    const totalRow = document.createElement("tr");
    totalRow.innerHTML = `<td colspan='5' style='text-align:right;'><b>Total classes: ${classes.length}</b></td>`;
    table.appendChild(totalRow);
    container.appendChild(table);
  } else {
    data.forEach(c => {
      const div = document.createElement("div");
      div.className = "card";
      div.innerHTML = `<b>${c.code}</b> - ${c.title} (${c.day} ${c.time})`;
      if (isAfterSix(c.time)) div.classList.add("danger");
      container.appendChild(div);
    });
  }
  renderSummary();
}

function renderSummary() {
  const s = document.getElementById("summary");
  s.innerHTML = "";
}

// CRUD
function addRecord(obj) {
  if (classes.find(c=>c.code===obj.code)) { alert("Duplicate code"); return; }
  classes.push(obj); console.log("ADD",obj); renderList();
}
function updateRecord(code,newObj) {
  const i = classes.findIndex(c=>c.code===code);
  if (i===-1) return;
  classes[i] = newObj; console.log("UPDATE",newObj); renderList();
}
function deleteRecord(code) {
  classes = classes.filter(c=>c.code!==code); console.log("DELETE",code); renderList();
}
function editRecord(code) {
  const c = classes.find(c=>c.code===code);
  if (!c) return;
  document.getElementById("code").value = c.code;
  document.getElementById("title").value = c.title;
  document.getElementById("day").value = c.day;
  document.getElementById("time").value = c.time;
  document.getElementById("code").dataset.original = c.code;
}

// Events
document.getElementById("addBtn").onclick = () => {
  const obj = {
    code: code.value.trim(),
    title: title.value.trim(),
    day: day.value,
    time: time.value
  };
  addRecord(obj);
};
document.getElementById("updateBtn").onclick = () => {
  const orig = code.dataset.original;
  if (!orig) { alert("No record selected"); return; }
  updateRecord(orig, {code: code.value.trim(),title: title.value.trim(),day: day.value,time: time.value});
  delete code.dataset.original;
};
document.getElementById("filterBtn").onclick = () => {
  const daySel = document.getElementById("filterDay").value;
  renderList(daySel ? classes.filter(c=>c.day===daySel) : classes);
};
let sortToggle=0;
document.getElementById("sortBtn").onclick=()=>{
  sortToggle++;
  const field = sortToggle%2===0?"code":"time";
  classes.sort((a,b)=>a[field].localeCompare(b[field]));
  renderList();
};
document.getElementById("resetBtn").onclick=()=>{renderList();};
document.getElementById("toggleViewBtn").onclick=()=>{viewMode=viewMode==="table"?"card":"table"; renderList();};
document.getElementById("search").oninput=(e)=>{
  const q=e.target.value.toLowerCase();
  renderList(classes.filter(c=>
    c.code.toLowerCase().includes(q) ||
    c.title.toLowerCase().includes(q) ||
    c.day.toLowerCase().includes(q)
  ));
};

// Seed data
[
  {code:"CS104",title:"Data Structures and Analysis",day:"Tuesday",time:"09:00"},
  {code:"CS124",title:"Discrete Structure",day:"Friday",time:"13:00"},
  {code:"MATHEd14",title:"Linear Algebra",day:"Friday",time:"09:00"},
  {code:"CS108",title:"Object Oriented Programming",day:"Wednesday",time:"17:30"},
  {code:"CS106",title:"Applications Development and Emerging Technologies",day:"Monday",time:"09:00"}
].forEach(addRecord);

renderList();
