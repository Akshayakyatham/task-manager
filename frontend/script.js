const API = "https://task-manager-xila.onrender.com";

let userId = "";
let role = "";

const adminPanel = document.getElementById("adminPanel");
const memberPanel = document.getElementById("memberPanel");

// REGISTER
async function register(){
  await fetch(API+"/register", {
    method:"POST",
    headers:{"Content-Type":"application/json"},
    body: JSON.stringify({
      name:rname.value,
      email:remail.value,
      password:rpassword.value,
      role:rrole.value
    })
  });
  alert("Registered");
}

// LOGIN
async function login(){
  const res = await fetch(API+"/login", {
    method:"POST",
    headers:{"Content-Type":"application/json"},
    body: JSON.stringify({
      email:email.value,
      password:password.value
    })
  });

  const d = await res.json();

  userId = d.user_id || "";
  role = d.role || "member";

  who.innerText = "Logged in as: " + role;

  if(role === "admin"){
    adminPanel.style.display = "block";
  } else {
    adminPanel.style.display = "none";
  }

  memberPanel.style.display = "block";

  loadUsers();
  loadTasks();
  loadDashboard();
}

// LOAD USERS
async function loadUsers(){
  const res = await fetch(API+"/users");
  const data = await res.json();

  assignUser.innerHTML = "";

  data.forEach(u=>{
    if(u.role === "member"){
      let opt = document.createElement("option");
      opt.value = u._id;
      opt.innerText = u.name;
      assignUser.appendChild(opt);
    }
  });
}

// CREATE TASK
async function createTask(){
  if(!title.value){
    alert("Enter task");
    return;
  }

  if(role !== "admin"){
    alert("Only admin can assign");
    return;
  }

  await fetch(API+"/tasks", {
    method:"POST",
    headers:{"Content-Type":"application/json"},
    body: JSON.stringify({
      title:title.value,
      assigned_to:assignUser.value
    })
  });

  alert("Task Assigned");

  title.value = "";

  loadTasks();
}

// LOAD TASKS
async function loadTasks(){

  let url = API + "/tasks";

  if(role === "member"){
    url = API + "/tasks?user_id=" + userId;
  }
  if(t.task_file){
  let link = document.createElement("a");
  link.href = API + "/download/" + t.task_file;
  link.innerText = " Download";
  link.target = "_blank";
  li.appendChild(link);
}

  const res = await fetch(url);
  const data = await res.json();

  const usersRes = await fetch(API+"/users");
  const users = await usersRes.json();

  tasks.innerHTML = "";

  data.forEach(t=>{
    let u = users.find(x => String(x._id) === String(t.assigned_to));

    let li = document.createElement("li");

    li.innerText =
      t.title +
      " | Assigned to: " + (u ? u.name : "") +
      " | Status: " + t.status;

    if(role === "member" && t.status === "pending"){
      let btn = document.createElement("button");
      btn.innerText = "Submit";

      btn.onclick = async ()=>{
        await fetch(API+"/tasks/"+t._id, {
          method:"PUT",
          headers:{"Content-Type":"application/json"},
          body: JSON.stringify({ status:"submitted" })
        });

        loadTasks();
        loadDashboard();
      };

      li.appendChild(btn);
    }

    if(role === "admin" && t.status === "submitted"){
      let btn = document.createElement("button");
      btn.innerText = "Approve";

      btn.onclick = async ()=>{
        await fetch(API+"/tasks/"+t._id, {
          method:"PUT",
          headers:{"Content-Type":"application/json"},
          body: JSON.stringify({ status:"done" })
        });

        loadTasks();
        loadDashboard();
      };

      li.appendChild(btn);
    }

    tasks.appendChild(li);
    formData.append("assigned_to", assignUser.value);
  });
}

// DASHBOARD
async function loadDashboard(){
  const res = await fetch(API+"/dashboard");
  const d = await res.json();

  stats.innerText =
    "Total: " + d.total +
    " Done: " + d.done +
    " Pending: " + d.pending;
}
