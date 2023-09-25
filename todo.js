// Get elements from the DOM
const clickable = document.getElementById("add-option");
const modal = document.getElementById("modal");
const taskContainer = document.getElementById("taskContainer");

const listPop = document.getElementById("listPop");

const notask = document.getElementById("notask");

const singaleCard = document.getElementById("singaleCard");

var backbutton = document.getElementById("back");

const taskheading = document.getElementById("taskheading");

const CopeytitleTaskName = document.getElementById("CopeytitleTaskName");


const isSingleCard=false



// Initialize tasks array
let todos = [];

// Event listener for the "Add Task" button
clickable.addEventListener("click", () => {
    showModal();
});

// Function to show/hide the modal
function showModal() {
    notask.classList.add('hide')
    if (modal.style.display === "block") {
        modal.style.display = "none";
    } else {
        modal.style.display = "block";
        // Add an input field and "Add Item" button to the modal
        modal.innerHTML = `
        <h2>Add New List </h2>
        <div class="inputCon">
            <input type="text" id="taskName" placeholder="Task Name">
            </div>
            <div class="ItemBtn">
            <button id="addItemBtn">Add</button>
            <button id="CloseItemBtn">Close</button>
            `;

            let  CloseItemBtn =document.getElementById("CloseItemBtn");

CloseItemBtn.addEventListener("click",closeTask)

function closeTask(){
    modal.classList.add('hide')
}
modal.classList.remove('hide')


        const addItemBtn = document.getElementById("addItemBtn");

        // Event listener for the "Add Item" button inside the modal
        addItemBtn.addEventListener("click", () => {
            const taskNameInput = document.getElementById("taskName");

            const taskName = taskNameInput.value.trim();

            if (taskName ) {
                // Find or create the task
                let task = todos.find((t) => t.name === taskName);
                if (!task) {
                    task = {
                        name: taskName,
                        items: [],
                       
                    };
                    todos.push(task);
                }

                // Clear input fields
                taskNameInput.value = "";

                // Re-render the tasks
                renderTasks();
            }
        });
    }
}

// Function to render the tasks and items
function renderTasks() { 

    // Clear the task container
    taskContainer.innerHTML = "";
    modal.style.display="none"
    // Loop through tasks and items
    todos.forEach((task) => {
        const taskCard = document.createElement("div");
        taskCard.classList.add("taskCard");

        const taskTitle = document.createElement("h2");
        taskTitle.classList.add("taskTitle");

        const hr =document.createElement("hr");

        taskTitle.innerText = task.name;
        

        const itemList = document.createElement("ul");

        task.items.forEach((item) => {
            const itemElement = document.createElement("li");
            itemElement.innerText = item.name;
            const itemcolse =document.createElement('button')
            itemcolse.innerHTML="Mark Done";

            // Add a click event listener to toggle item completion
            itemElement.addEventListener("click", () => {

                item.isCompleted = !item.isCompleted;
                renderTasks();
                
            });

            // Apply strikethrough style for completed items
            if (item.isCompleted) {
                itemElement.style.textDecoration = "line-through";
            itemcolse.classList.add('hide')
            }

            itemList.appendChild(itemElement);
            itemElement.appendChild(itemcolse);

        });

        taskCard.appendChild(taskTitle);
        taskCard.appendChild(hr);
        taskCard.appendChild(itemList);

        // Add a "Delete Task" button
        const deleteBtn = document.createElement("img");
        const AddListBtn = document.createElement("img");

        deleteBtn.classList.add("deletCardBtn")
        AddListBtn.classList.add("addItemListBtn")

        deleteBtn.src="delet.svg"
        AddListBtn.src="circle-plus-solid.svg"

        AddListBtn.addEventListener("click",AddListBt)
        // AddListBtn.addEventListener("click",()=>{
        //     AddListBt(cared_item)
        // })

        function AddListBt(cared_item) {
            if (listPop.style.display === "block") {
                listPop.style.display = "none";
            } else {
                listPop.style.display = "block";
                // Add an input field and "Add Item" button to the modal
                listPop.innerHTML = `
                    <h2>Add New Item </h2>
                    <input type="text" id="itemName" placeholder="Item Name"><br>
                    <div class="listBtn">
                    <button id="addListBtn">Add Item</button>
                    <button id="CloseListBtn">Close</button>
                    </div>
                    `;
                    const CloseListBtn = document.getElementById("CloseListBtn");

                    CloseListBtn.addEventListener("click",closePopUp)

                    function closePopUp(){
                        listPop.classList.add('hide')
                    }
                    listPop.classList.remove('hide')


                const addListBtn = document.getElementById("addListBtn");
        
                // Event listener for the "Add Item" button inside the modal
                addListBtn.addEventListener("click",ListAded)
                function ListAded() {
                    const itemNameInput = document.getElementById("itemName");
        
                    const itemName = itemNameInput.value.trim();

                    if (itemName) {
                        // Add the item to the task
                        task.items.push({
                            name: itemName,
                            isCompleted: false,
                        });

                        listPop.style.display = "none"

                        itemNameInput.value = "";
    
                        // Re-render the tasks
                        renderTasks();
                    }
                }
            }
        }
        deleteBtn.addEventListener("click", () => {
            todos = todos.filter((t) => t !== task);
            renderTasks();
            if (taskContainer.innerText === "") {
                notask.classList.remove("hide")
            }
        });

        // Copey TaskCard
        taskTitle.addEventListener("click", ()=>{
            backbutton.classList.remove('hide')

            singaleCard.classList.remove('hide')
            
            taskContainer.classList.add('hide')
            
            let copycard= taskCard.cloneNode(true)
            taskheading.classList.add('hide')
            
            CopeytitleTaskName.innerHTML=taskTitle.textContent;

            singaleCard.appendChild(copycard)
            copycard.lastElementChild.addEventListener("click",()=>{
                AddListBt()
               
                // cpoye Add Item Button Function 

                    let  addListBtn = document.getElementById("addListBtn");
                    addListBtn.addEventListener("click",Itemcopy)
                    function Itemcopy() {
                      
                        
                        task.items.forEach((item) => {
                        const itemElement = document.createElement("li");
                        itemElement.innerText = item.name;
                        const itemcolse =document.createElement('button')
                        itemcolse.innerHTML="Mark Done";

                        // Add a click event listener to toggle item completion
                        itemcolse.addEventListener("click", () => {
                            item.isCompleted = !item.isCompleted;
                            renderTasks();
                            
                            if (item.isCompleted) {
                                itemElement.style.textDecoration = "line-through";
                                itemcolse.classList.add('hide')
                            }


                        });
                        copycard.lastElementChild.previousSibling.previousSibling.appendChild(itemElement);
                        itemElement.appendChild(itemcolse);
                        
                        itemList.classList.add('hide')
                    });
                    }
        })

        //    copeyCard Delete 
            copycard.lastElementChild.previousSibling.addEventListener("click",()=>{
                taskContainer.classList.add('hide');
            copycard.remove();
            if (taskContainer.innerText === "") {
                notask.classList.remove("hide")
            }
            })
        })

        if (taskContainer.innerText === null) {
            notask.classList.remove("hide")
        }

        taskCard.appendChild(deleteBtn);
        taskCard.appendChild(AddListBtn)
        taskContainer.appendChild(taskCard);
    });
}

// Initial render
renderTasks();

// Back Button
function back() {
    
    taskheading.classList.remove('hide')

    backbutton.classList.add('hide');

    singaleCard.classList.add('hide');

    taskContainer.classList.remove('hide');

    singaleCard.innerText = '';

}




