class toDo {
    constructor (what, when, description, done) {
        this.what = what;
        this.when = when;
        this.description = description;
        this.done = done;
    }
}

toDoArray = [];

eat = new toDo("eat", "3 times a day", "healthy", "false");
toDoArray.push(eat);

sleep = new toDo("sleep", "every night", "long", "false");
toDoArray.push(sleep);

sex = new toDo("sex", "3 a week", "safe", "true");
toDoArray.push(sex);

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

deleteToDo = (id) => {
    console.log(id);
    toDoArray.splice(id,1);
    const container = document.getElementById(`container`);
    container.innerHTML = "";
    loadToDos();
}

addForm = () => {
    // display a form to add a toDo. blackout background
}

loadToDos();
