var TodoListApp = (function () {
    let tasks = [];
    const tasksList = document.getElementById("list");
    const addTaskInput = document.getElementById("add");
    const tasksCounter = document.getElementById("tasks-counter");
  
    async function fetchTodos() {
      try {
        const response = await fetch(
          "https://jsonplaceholder.typicode.com/todos"
        );
        const data = await response.json();
        tasks = data.splice(0, 10);
        renderList();
      } catch (error) {
        console.log(error);
      }
    }
  
    function addTaskToDOM(task) {
      const li = document.createElement("li");
      li.innerHTML = `
       <input type="checkbox" id="" data-id="${task.id}" ${
        task.completed ? "checked" : ""
      } class="custom-checkbox" />
       <label for="${task.id}">${task.title}</label>
       <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQIOLpSpoJsKLXwxC_rRuamAo6NY_5JGZPLQD_eU9UcsTC-5NNn2HzhXDV6n5ZFamTWFb8&usqp=CAU"
        class="delete" data-id="${task.id}" /> 
      `;
  
      tasksList.append(li);
    }
  
    function renderList() {
      tasksList.innerHTML = "";
      for (let task of tasks) {
        addTaskToDOM(task);
      }
      tasksCounter.innerText = tasks.length;
    }
  
    function toggleTask(taskId) {
      let newTasks = tasks.filter(function (task) {
        return task.id === Number(taskId);
      });
      if (newTasks.length > 0) {
        const currTask = newTasks[0];
        currTask.completed = !currTask.completed;
        renderList();
        showNotification("Task toggled successfully");
        return;
      }
      showNotification("Could not toggle task.");
    }
  
    function deleteTask(taskId) {
      const newTasks = tasks.filter(function (task) {
        return task.id !== Number(taskId);
      });
      tasks = newTasks;
      renderList();
      showNotification("Task deleted successfully");
    }
  
    function addTask(task) {
      if (task) {
        tasks.push(task);
        renderList();
        showNotification("Task added successfully");
        return;
      }
    }
  
    function showNotification(text) {
      alert(text);
    }
  
    function handleInputKeypress(event) {
      if (event.key === "Enter") {
        const text = event.target.value;
        if (!text) {
          showNotification("Task cannot be empty");
          return;
        }
        const task = {
          title: text,
          id: Date.now(),
          completed: false
        };
        event.target.value = "";
        addTask(task);
      }
    }
  
    function handleClickListener(event) {
      const target = event.target;
      if (target.tagName === "LABEL") {
        const taskId = target.getAttribute("for");
        toggleTask(taskId);
        return;
      } else if (target.className === "delete") {
        const taskId = target.dataset.id;
        deleteTask(taskId);
        return;
      }
    }
  
    function initializeApp() {
      fetchTodos();
      addTaskInput.addEventListener("keyup", handleInputKeypress);
      document.addEventListener("click", handleClickListener);
    }
    return {
      initialize: initializeApp
    };
  })();
  