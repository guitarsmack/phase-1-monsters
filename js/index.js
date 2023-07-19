document.addEventListener("DOMContentLoaded",doAll)

let monsterItems = ""
let start = 1

function doAll(){
    addBar()
    getMonsters()
    setTimeout(() => postData(monsterItems),100)
    makeButtons()
}

function addBar(){
    const newThing = document.createElement("form")
    document.getElementById("create-monster").appendChild(newThing)
    newThing.id = "monster-form"
    const name = document.createElement("input")
    name.id = "name"
    name.placeholder = "name..."
    const age = document.createElement("input")
    age.id = "age"
    age.placeholder = "age..."
    const description = document.createElement("input")
    description.id = "description"
    description.placeholder = "description.."
    newThing.appendChild(name)
    newThing.appendChild(age)
    newThing.appendChild(description)
    const button = document.createElement("button")
    button.id = "create"
    button.innerText = "create"
    newThing.appendChild(button)
}

function getMonsters(){
    return fetch("http://localhost:3000/monsters")
    .then(resp => resp.json())
    .then(data => monsterItems = data)
}

function postData(elem){
    for (let i = start; i < start + 50; i++){
        const element = elem[i]
        const monster = document.createElement("div")
        const monName = document.createElement("h2")
        const monAge = document.createElement("h4")
        const monDescription = document.createElement("p")
        monName.innerText = i + ": " + element.name
        monAge.innerText = `AGE: ${element.age}`
        monDescription.innerText = element.description
        monster.appendChild(monName)
        monster.appendChild(monAge)
        monster.appendChild(monDescription)
        document.getElementById("monster-container").appendChild(monster)
    };
}

function makeButtons(){
    document.getElementById("forward").addEventListener("click",nextPage)
    document.getElementById("back").addEventListener("click",previousPage)
    const form = document.querySelector("form")
    form.addEventListener("submit", (e) => {
    e.preventDefault()
    handleSubmit(e.target)
    form.reset()
    })
}

function handleSubmit(target){
    let newMonster = {
        name:target["name"].value,
        age:target["age"].value,
        description:target["description"].value
    }
    fetch("http://localhost:3000/monsters",{
        method: "POST",
        headers: {
            "Content-type": "application/json"
        },
        body:JSON.stringify(newMonster)
    })
}

function removeAllChildNodes(){
    const parent = document.getElementById("monster-container")
    while (parent.firstChild) {
        parent.removeChild(parent.firstChild);
    }
}

function nextPage(){
    removeAllChildNodes()
    if(start < monsterItems.length - 50){
        start += 50
    }
    postData(monsterItems)
}

function previousPage(){
    removeAllChildNodes()
    if(start !==1){
        start -= 50
    }
    postData(monsterItems)
}


