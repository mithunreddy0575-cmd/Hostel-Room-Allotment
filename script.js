// ===== SETTINGS: storage key, room types [capacity, monthly rent], meal rate, fixed charge =====
const K="hostel-demo-v1",RT={SINGLE:[1,6000],DOUBLE:[2,4000],TRIPLE:[3,3000]},RATE=45,FIXED=500;
const MON=new Date().toISOString().slice(0,7);
const $=i=>document.getElementById(i),R=n=>"₹"+n.toLocaleString("en-IN");
const esc=s=>String(s).replace(/[&<>"']/g,c=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"}[c]));
const fresh=()=>({rooms:[["A101","SINGLE"],["A102","DOUBLE"],["A103","DOUBLE"],["B201","TRIPLE"],["B202","TRIPLE"]].map(([n,t])=>({n,t,occ:[]})),students:[],meals:{}});
let S=null;try{S=JSON.parse(localStorage.getItem(K))}catch(e){}
const stu=id=>S.students.find(s=>s.id===id),rm=n=>S.rooms.find(r=>r.n===n);
const save=()=>{try{localStorage.setItem(K,JSON.stringify(S))}catch(e){}};

// ===== ROOM ALLOTMENT: one room per student, no full rooms, boys and girls never share a room =====
const roomG=r=>r.occ.length?(stu(r.occ[0])||{}).g:null;
const canTake=(r,s)=>r.occ.length<RT[r.t][0]&&(!r.occ.length||roomG(r)===s.g);
function allot(id,rn){const s=stu(id),r=rm(rn);if(!s||!r)return"Invalid student or room.";if(s.room)return s.name+" already has room "+s.room+".";if(r.occ.length>=RT[r.t][0])return"Room "+rn+" is full.";if(!canTake(r,s))return"Room "+rn+" is for "+(roomG(r)==="M"?"boys":"girls")+" only.";r.occ.push(id);s.room=rn;return"Room "+rn+" allotted to "+s.name+"."}
// Free a student's room
function vacate(id){const s=stu(id);if(!s||!s.room)return"No room to vacate.";const r=rm(s.room);r.occ=r.occ.filter(x=>x!==id);s.room=null;return"Room vacated."}
// Delete a student: frees the bed and removes their meal records
function remove(id){const s=stu(id);if(!s)return"Student not found.";vacate(id);S.students=S.students.filter(x=>x.id!==id);Object.keys(S.meals).forEach(k=>{if(k.startsWith(id+"|"))delete S.meals[k]});return s.name+" removed."}
// Demo data shown the first time the page opens
function sample(){S=fresh();S.students=[["S101","Aarav Sharma","CSE",2,"M"],["S102","Priya Nair","ECE",3,"F"],["S103","Rohan Das","CST",1,"M"]].map(([id,name,dept,year,g])=>({id,name,phone:"",dept,year,g,room:null}));allot("S101","A102");allot("S102","A101");S.meals["S101|"+MON]=28}
if(!S||!S.rooms)sample();

let tt;function toast(m){const t=$("toast");t.textContent=m;t.classList.add("on");clearTimeout(tt);tt=setTimeout(()=>t.classList.remove("on"),2600)}
function commit(m){save();render();bill();toast(m)}

// ===== BILL MATHS: bill = meals x 45 + 500 + room rent =====
const calc=(s,m)=>{const n=S.meals[s.id+"|"+m]||0,rent=s.room?RT[rm(s.room).t][1]:0;return{n,mess:n*RATE+FIXED,rent,total:n*RATE+FIXED+rent}};

// ===== SHOW DATA ON THE PAGE (stats, student table, room cards) =====
function render(){
 const free=S.rooms.reduce((a,r)=>a+RT[r.t][0]-r.occ.length,0),used=S.rooms.filter(r=>r.occ.length).length;
 const due=S.students.reduce((a,s)=>a+calc(s,MON).total,0);
 $("stats").innerHTML=[[S.students.length,"Students"],[S.students.filter(s=>s.room).length,"Students with rooms"],[free,"Beds available"],[used+" / "+S.rooms.length,"Rooms in use"],[R(due),"Billed this month"]].map(([a,b])=>`<div class="card stat"><b>${a}</b><span>${b}</span></div>`).join("");
 const q=$("q").value.trim().toLowerCase(),list=S.students.filter(s=>[s.id,s.name,s.dept].join(" ").toLowerCase().includes(q));
 $("stuBody").innerHTML=list.length?list.map(s=>{
  const open=S.rooms.filter(r=>canTake(r,s));
  const act=(s.room?`<button class="btn ghost sm" data-act="v" data-id="${esc(s.id)}">Vacate</button>`:open.length?`<select>${open.map(r=>`<option>${r.n}</option>`).join("")}</select> <button class="btn sm" data-act="a" data-id="${esc(s.id)}">Allot</button>`:'<span class="muted">No suitable room</span>')+` <button class="btn ghost sm del" data-act="d" data-id="${esc(s.id)}">Delete</button>`;
  return`<tr><td>${esc(s.id)}</td><td>${esc(s.name)}</td><td>${esc(s.dept)}</td><td>${s.year}</td><td>${s.g}</td><td>${s.room?`<span class="pill">${s.room}</span>`:'<span class="muted">Not allotted</span>'}</td><td style="min-width:260px">${act}</td></tr>`}).join(""):'<tr><td colspan="7" class="muted">No students found.</td></tr>';
 $("roomGrid").innerHTML=S.rooms.map(r=>{const c=RT[r.t][0],g=roomG(r);return`<div class="card room"><h3>${r.n}<span class="pill">${r.t}</span></h3><div class="beds">${Array.from({length:c},(_,i)=>`<span class="bed${i<r.occ.length?" f":""}"></span>`).join("")}</div><div class="muted">${r.occ.length}/${c} occupied · ${R(RT[r.t][1])}/month${g?" · "+(g==="M"?"Boys":"Girls"):""}</div><div style="margin-top:8px">${r.occ.length?r.occ.map(i=>esc(stu(i)?stu(i).name:i)).join(", "):'<span class="muted">Vacant</span>'}</div></div>`}).join("");
 const keep=$("bS").value;
 $("bS").innerHTML=S.students.map(s=>`<option value="${esc(s.id)}">${esc(s.name)} (${esc(s.id)})</option>`).join("");
 if(keep&&stu(keep))$("bS").value=keep;
}

// ===== MESS BILLING: receipt for one student + table of every student for the month =====
const picked=()=>[stu($("bS").value),$("bM").value||MON,Math.max(0,parseInt($("bN").value)||0)];
const syncN=()=>{const[s,m]=picked(),v=s&&S.meals[s.id+"|"+m];$("bN").value=v==null?30:v};
function bill(){
 const[s,m]=picked();
 if(!s){$("rcpt").innerHTML="";$("all").innerHTML="";return}
 const c=calc(s,m);
 $("rcpt").innerHTML=`<div class="rcpt"><div><b>${esc(s.name)}</b><span>${esc(m)}</span></div><div><span>Meals taken</span><span>${c.n}</span></div><div><span>Mess charges (${c.n} × ₹45 + ₹500)</span><span>${R(c.mess)}</span></div><div><span>Room rent ${s.room?"("+esc(s.room)+", "+rm(s.room).t+")":"(no room)"}</span><span>${R(c.rent)}</span></div><div class="t"><span>Total due</span><span>${R(c.total)}</span></div></div>`;
 const rows=S.students.map(x=>[x,calc(x,m)]);
 $("all").innerHTML=`<h2 style="margin-top:26px">All bills for ${esc(m)}</h2><div class="scroll"><table><thead><tr><th>Student</th><th>Room</th><th>Meals</th><th>Mess</th><th>Rent</th><th>Total</th></tr></thead><tbody>${rows.map(([x,k])=>`<tr><td>${esc(x.name)}</td><td>${x.room||'<span class="muted">None</span>'}</td><td>${k.n}</td><td>${R(k.mess)}</td><td>${R(k.rent)}</td><td>${R(k.total)}</td></tr>`).join("")}</tbody><tfoot><tr><td colspan="5"><b>Total to collect</b></td><td><b>${R(rows.reduce((a,[,k])=>a+k.total,0))}</b></td></tr></tfoot></table></div>`}

// ===== BUTTONS & CLICKS =====
$("addBtn").onclick=()=>{
 const v=k=>$(k).value.trim(),id=v("fId"),name=v("fName");
 if(!id||!name)return toast("ID and name are required.");
 if(stu(id))return toast("That student ID already exists.");
 S.students.push({id,name,phone:v("fPh"),dept:v("fDept"),year:+$("fYr").value,g:$("fG").value,room:null});
 ["fId","fName","fPh","fDept"].forEach(k=>$(k).value="");commit("Student added.")};
// Saving REPLACES the meal count for that month (it no longer adds on top)
$("rec").onclick=()=>{const[s,m,n]=picked();if(!s)return toast("Add a student first.");S.meals[s.id+"|"+m]=n;save();render();bill();toast(n+" meals saved for "+s.name+".")};
$("prt").onclick=()=>{if(!$("rcpt").innerHTML)return toast("Add a student first.");window.print()};
$("bS").onchange=$("bM").onchange=()=>{syncN();bill()};
$("q").oninput=render;
document.addEventListener("click",e=>{
 const b=e.target.closest("[data-act]");
 if(b){const id=b.dataset.id,a=b.dataset.act;
  if(a==="d"){if(confirm("Delete "+(stu(id)||{}).name+"? Their room and meal records will be removed."))commit(remove(id))}
  else commit(a==="v"?vacate(id):allot(id,b.closest("td").querySelector("select").value))}
 const t=e.target.closest("[data-tab]");
 if(t){document.querySelectorAll("nav button").forEach(x=>x.classList.toggle("on",x===t));document.querySelectorAll(".sec").forEach(x=>x.classList.toggle("on",x.id===t.dataset.tab))}});

$("bM").value=MON;render();syncN();bill();save();
