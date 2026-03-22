import './styles.css';

let todos = [];
let currentId = 0;
//todos가 저장되는 배열과 ID를 위한 변수

const saved = localStorage.getItem('todos');

if (saved) {
    todos = JSON.parse(saved);
} else {
    todos = [
        { id: 0, createdAt: new Date(), content: 'Study', completed: false },
        { id: 1, createdAt: new Date(), content: 'Work out', completed: false }
    ];
    localStorage.setItem('todos', JSON.stringify(todos));
}
if (todos.length > 0) {
    currentId = todos[todos.length - 1].id + 1; // ID 중복 방지
}


const todoInput = document.getElementById('todo-input');
const addBtn = document.getElementById('add-btn');
const todoList = document.getElementById('todo-list');

function addTodo(){ //add-btn 동작 함수
    let text = todoInput.value.trim();
    if(text === ''){ // 빈 입력 예외처리
        alert('Tasks cannot be empty!');
        return;
    }

    const newTodo = {
        id: currentId++,
        createdAt: new Date(),
        content: text,
        completed: false
    };
    todos.push(newTodo); // newTodo 객체를 todos 배열에 추가

    localStorage.setItem('todos', JSON.stringify(todos)); // todos 배열을 localStorage에 저장

    todoInput.value = ''; // 입력창 초기화
    renderTodos();
}

function renderTodos(){
    todoList.innerHTML = ''; // 기존 리스트 초기화
    todos.forEach(todo => {
        const li = document.createElement('li');

        const checkbox = document.createElement('input');
        checkbox.type = 'checkbox';
        checkbox.className = 'checkbox';
        checkbox.checked = todo.completed;

        const span = document.createElement('span');
        span.textContent = todo.content;
        if (todo.completed) {
            span.classList.add('done');
        }

        const delBtn = document.createElement('button');
        delBtn.textContent = '🗑';
        delBtn.className = 'del-btn';

        li.appendChild(checkbox);
        li.appendChild(span);
        li.appendChild(delBtn);

        todoList.appendChild(li);
    });
}

addBtn.addEventListener('click', addTodo);

todoInput.addEventListener('keypress', function(event){ //enter의 경우에도 click과 같이 동작함
    if(event.key === 'Enter'){
        addTodo();
    }
});

function deleteTodo(event){
    const li = event.target.parentElement;
    const text = li.querySelector('span').textContent;

    todos = todos.filter(todo => todo.content !== text); 
    // content가 일치하지 않는 todo만 남김
    localStorage.setItem('todos', JSON.stringify(todos)); 
    // 변경된 todos 배열을 localStorage에 저장
    renderTodos(); // 변경된 todos 배열을 화면에 다시 렌더링
}

function doneTodo(event){

    const li = event.target.parentElement;
    const text = li.querySelector('span').textContent;

    const todo = todos.find(todo => todo.content === text);
    if (todo) {
        todo.completed = event.target.checked; // 체크박스 상태에 따라 completed 속성 업데이트
    }
    localStorage.setItem('todos', JSON.stringify(todos)); // 변경된 todos 배열을 localStorage에 저장
    renderTodos(); // 변경된 todos 배열을 화면에 다시 렌더링
    
}

todoList.addEventListener('click', function (event){
    if (event.target.classList.contains('del-btn')){
        deleteTodo(event);
    }
    else if (event.target.classList.contains('checkbox')){
        doneTodo(event);
    }
});

renderTodos();