const todoInput = document.getElementById('todo-input');
const addBtn = document.getElementById('add-btn');
const todoList = document.getElementById('todo-list');

function addTodo(){
    let text = todoInput.value.trim();
    if(text === ''){ // 빈 입력 예외처리
        alert('Tasks cannot be empty!');
        return;
    }

    let li = document.createElement('li');
    let span = document.createElement('span');
    span.textContent = text;

    let deleteBtn = document.createElement('button');
    deleteBtn.textContent = 'Delete';
    
    li.appendChild(span);
    li.appendChild(deleteBtn); //li에 span(text), button 추가
    
    todoList.appendChild(li);

    todoInput.value = '';
    todoInput.focus();
}

addBtn.addEventListener('click', addTodo);

todoInput.addEventListener('keypress', function(event){
    if(event.key === 'Enter'){
        addTodo();
    }
});