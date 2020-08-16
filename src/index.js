class toDo {
    constructor (what, project, when, description, done) {
        this.what = what;
        this.project = project;
        this.when = when;
        this.description = description;
        this.done = done;
    }
}

Storage.prototype.setObj = function(key, obj) {
    return this.setItem(key, JSON.stringify(obj))
}
Storage.prototype.getObj = function(key) {
    return JSON.parse(this.getItem(key))
}

toDoArray = [];
projectArray = [];

if (localStorage.getObj("toDoArrayStorage") != null) {
    toDoArray = localStorage.getObj("toDoArrayStorage");
} else {
    eat = new toDo("Eat", "Daily", "At least 3 times a day", "Eat healthy", "false");
    toDoArray.push(eat);
    sleep = new toDo("Sleep", "Daily", "Default todos. can be removed.", "Long and deep", "false");
    toDoArray.push(sleep);
    localStorage.setObj("toDoArrayStorage", toDoArray);
}

if (localStorage.getObj("projectArrayStorage") == null) {
    projectArray.push("Daily");
    localStorage.setObj("projectArrayStorage", projectArray);
} else {
    projectArray = localStorage.getObj("projectArrayStorage");
}


localStorage.setObj("toDoArrayStorage", toDoArray);

localStorage.setObj("projectArrayStorage", projectArray);

const listProjects = () => {
    const leftDiv = document.getElementById("projectsContainer");
    const table = document.createElement("table");
    table.id = "projectsTable";
    projectArray.forEach(element => {
        const row = table.insertRow();
        const cell = row.insertCell();
        cell.innerHTML = element;
        const cellDel = row.insertCell();
        const addDeletePic = document.createElement("img");
        addDeletePic.id = projectArray.indexOf(element);
        addDeletePic.src = "../src/deleteSmall.png"
        addDeletePic.addEventListener("click", function() {deleteProject(addDeletePic.getAttribute("id"))});
        cellDel.appendChild(addDeletePic);
        cellDel.style.textAlign="center";
    })
    const header = table.createTHead();
    const row = header.insertRow();
    const cell = row.insertCell();
    cell.innerHTML = "Projects";
    leftDiv.appendChild(table);
    
}
listProjects();

saveProject = () => {
    let name = document.getElementById("addProjectFormName").value;
    projectArray.push(name);
    document.getElementById("projectsContainer").innerHTML = "";
    listProjects();
    localStorage.setObj("projectArrayStorage", projectArray);
}

cancelProject = () => {
    document.getElementById("addProjectFormName").value = "";
    document.getElementById("addProjectForm").style.display = "none";
}

deleteProject = (id) => {
    projectArray.splice(id, 1);
    document.getElementById("projectsContainer").innerHTML = ""
    listProjects();
    localStorage.setObj("projectArrayStorage", projectArray);
}

const listToDos = () => {
    const container = document.getElementById("container");
    let iterator = 0;
    const table = document.createElement("table");
    table.id = "toDotable"
    toDoArray.forEach(element => {
        const row = table.insertRow();
        const cell = row.insertCell();
        const addDeletePic = document.createElement("img");
        addDeletePic.src = "../src/deleteSmall.png";
        addDeletePic.id = iterator
        addDeletePic.addEventListener("click", function() { deleteToDo(addDeletePic.getAttribute("id"))});
        cell.style.textAlign = "center";
        cell.appendChild(addDeletePic);
        for (prop in element) {
            if (prop == "what") {
                const cell = row.insertCell();
                cell.innerHTML = element[prop];
                cell.id = iterator;
                cell.addEventListener("click", function() {updateToDoForm(cell.getAttribute("id"))});
                cell.style.cursor = "pointer";
                cell.style.textDecoration = "underlined"
            } else if (prop != "done") {     
                const cell = row.insertCell();
                cell.innerHTML = element[prop];
            } else {
                const cell = row.insertCell();
                const addDonePic = document.createElement("img");
                addDonePic.id = iterator;
                addDonePic.addEventListener("click", function() {changeDone(addDonePic.getAttribute("id"))})
                if (element[prop] == "true") {
                    addDonePic.src = "../src/yesSmall.png";
                } else {
                    addDonePic.src = "../src/noSmall.png";
                }
                cell.appendChild(addDonePic);
            }
        }
        iterator +=1;
    })
    const header = table.createTHead();
    header.id = "header"
    const row = header.insertRow();
    let cell = row.insertCell();
    cell.innerHTML = "Delete";
    cell.style.width = "80px";
    cell = row.insertCell();
    cell.innerHTML = "What";
    cell = row.insertCell();
    cell.innerHTML = "Project";
    cell = row.insertCell();
    cell.innerHTML = "When";
    cell = row.insertCell();
    cell.innerHTML = "Description";
    cell = row.insertCell();
    cell.innerHTML = "Done";
    container.appendChild(table);
}

const loadToDos = () => {
    const container = document.getElementById("container");
    let iterator = 0;
    toDoArray.forEach(element => {
        const divToDo = document.createElement("div");
        divToDo.setAttribute("class", "divToDo")
        divToDo.setAttribute("id", `divToDo${iterator}`)
        container.appendChild(divToDo);
        for (prop in element) {       
            const subToDoProp = document.createElement("h2");
            subToDoProp.innerHTML = prop;
            divToDo.appendChild(subToDoProp);
            if (prop != "done") {
                const subToDoVar = document.createElement("p");
                subToDoVar.innerHTML = element[prop];
                divToDo.appendChild(subToDoVar);
            }
            else {
                const addDonePic = document.createElement("img");
                if (element[prop] == "true") {
                    addDonePic.src = "../src/yes.png";
                }
                else {
                    addDonePic.src = "../src/no.png";
                }
                addDonePic.id = iterator;
                addDonePic.addEventListener("click", function() {changeDone(addDonePic.getAttribute("id"))});
                divToDo.appendChild(addDonePic);
            }
        }
        const addDeletePic = document.createElement("img");
        addDeletePic.src = "../src/delete.png";
        addDeletePic.setAttribute("id", iterator);
        addDeletePic.addEventListener("click", function() { deleteToDo(addDeletePic.getAttribute("id"))});
        divToDo.appendChild(addDeletePic);
        iterator += 1;

    });
}

renderToDos = () => {
    container.innerHTML = "";
    if (document.getElementById("styleSelector").textContent == "Show Cards") {
        listToDos();
    } else {
        loadToDos();
    }
}

renderToDos();

deleteToDo = (id) => {
    toDoArray.splice(id,1);
    const container = document.getElementById(`container`);
    renderToDos();
    localStorage.setObj("toDoArrayStorage", toDoArray);
}

addToDoForm = () => {
    document.getElementById("addProjectForm").style.display = "none";
    document.getElementById("toDoCardForm").style.display = "none";
    const projectSelect = document.getElementById("projectSelect");
    projectSelect.innerHTML = "";
    for (let i = 0; i < projectArray.length; i++) {
        let project = projectArray[i];
        let option = document.createElement("option");
        option.textContent = project;
        option.value = project;
        projectSelect.appendChild(option);
    }
    document.getElementById("addToDoForm").style.display = "block";
}
addProjectForm = () => {
    document.getElementById("addToDoForm").style.display = "none";
    document.getElementById("toDoCardForm").style.display = "none";
    document.getElementById("addProjectForm").style.display = "block";
}

saveToDo = () => {
    let what = document.getElementById("addToDoFormWhat").value;
    let project = document.getElementById("projectSelect").value;
    let when = document.getElementById("addToDoFormWhen").value;
    let description = document.getElementById("addToDoFormDescription").value;
    let done = ""
    if (document.getElementById("addToDoFormDone").checked) {
        done = "true";
    } else {
        done = "false";
    }
    let newToDo = new toDo(what, project, when, description, done);
    toDoArray.push(newToDo);
    renderToDos();
    localStorage.setObj("toDoArrayStorage", toDoArray);
    cancelToDo();
}

updateToDoForm = (id) => {
    document.getElementById("addToDoForm").style.display = "none";
    document.getElementById("addProjectForm").style.display = "none";
    const toDoCardFormProject = document.getElementById("toDoCardFormProject");
    toDoCardFormProject.innerHTML = "";
    for (let i = 0; i < projectArray.length; i++) {
        let project = projectArray[i];
        let option = document.createElement("option");
        option.textContent = project;
        option.value = project;
        toDoCardFormProject.appendChild(option);
    }
    document.getElementById("toDoCardForm").style.display = "block";
    document.getElementById("toDoCardFormWhat").value = toDoArray[id].what;
    document.getElementById("toDoCardFormWhen").value = toDoArray[id].when;
    document.getElementById("toDoCardDescription").value = toDoArray[id].description;
    if (toDoArray[id].done == "true") {
        document.getElementById("toDoCardDone").checked = true;
    } else {
        document.getElementById("toDoCardDone").checked = false;

    }
    document.getElementById("updateButton").addEventListener("click", fn = function(){updateToDo(id)});    
}

updateToDo = (id) => {
    toDoArray[id].what = document.getElementById("toDoCardFormWhat").value;
    toDoArray[id].when = document.getElementById("toDoCardFormWhen").value;
    toDoArray[id].project = document.getElementById("toDoCardFormProject").value;
    toDoArray[id].description = document.getElementById("toDoCardDescription").value;
    if (document.getElementById("toDoCardDone").checked) {
        toDoArray[id].done = "true";
    } else {
        toDoArray[id].done = "false";
    }
    document.getElementById("updateButton").removeEventListener("click", fn);
    cancelToDo();
    renderToDos();
    localStorage.setObj("toDoArrayStorage", toDoArray);
}

cancelToDo = () => {
    document.getElementById("addToDoFormWhat").value = "";
    document.getElementById("addToDoFormWhen").value = "";
    document.getElementById("addToDoFormDescription").value = "";
    document.getElementById("addToDoFormDone").checked = "false";
    document.getElementById("addToDoForm").style.display = "none";
    document.getElementById("toDoCardForm").style.display = "none";
}

changeToDoRender = () => {
    if (document.getElementById("styleSelector").textContent == "Show List") {
        document.getElementById("styleSelector").textContent = "Show Cards";
    } else {
        document.getElementById("styleSelector").textContent = "Show List";
    }
    renderToDos();
}

changeDone = (id) => {
    if (toDoArray[id].done == "true") {
        toDoArray[id].done = "false";
    } else {
        toDoArray[id].done = "true";
    }
    renderToDos();
    localStorage.setObj("toDoArrayStorage", toDoArray);
}