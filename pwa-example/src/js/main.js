// ------------------ Register SW ------------------

if ('serviceWorker' in navigator) {
  navigator.serviceWorker.register("/pwa-example/serviceworker.js");
  //navigator.serviceWorker.register("/serviceworker.js");
}

// ------------------ App data ------------------

const tasks = [
  {
    id: 1,
    text: "Ir a por el pan",
    completed: false
  },
  {
    id: 2,
    text: "Ir a por la leche",
    completed: false
  }
]

// ------------------ App logic ------------------

function showTasks() {

  // For each task
  tasks.map(task => {

    document
      .querySelector("#task-list")
      .innerHTML += `<div class="task">

                <div class="left">
                  <input type="checkbox" id="task${task.id}">
                </div>
            
                <div class="right">
                  <span>${task.text}</span>
                </div>
            
              </div>`

    // Handle click on task
    // document
    //   .querySelector("#task" + task.id)
    //   .addEventListener("click", () => toggleTask(task.id))
  })
}

showTasks()

function loadNew() {

  // 1) Hide home
  document.querySelector("#home").style.display = "none"

  // 2) Show new
  document.querySelector("#new").style.display = "block"
}

function loadHome() {

  // 1) Hide new
  document.querySelector("#new").style.display = "none"

  // 2) Show home
  document.querySelector("#home").style.display = "block"

  // 3) Save new task in storage
  if (typeof(Storage) !== "undefined") {

    // Create task id (in memory)
    let i = 1

    const newTask = {
      id: i,
      text: document.querySelector("#create-input").value,
      completed: false
    }
    
    localStorage.setItem("task" + i, newTask)

    i++

  } else {
    // Sorry! No Web Storage support..
  }

  // In memory example (never!!!)
  // tasks.push(newTask)

  // 4) Clean previous tasks
  document.querySelector("#task-list").innerHTML = ""

  // 5) List all tasks
  showTasks()
}

function toggleTask(id) {

  // TODO
}

// Handle click event
document
  .querySelector("#button-bar-new > button")
  .addEventListener("click", loadNew)

document
  .querySelector("#button-bar-create > button")
  .addEventListener("click", loadHome)
