import { Component } from '@angular/core';
import { ThrowStmt } from '@angular/compiler';

const todos=[
  {
    id:1,
    item:"eating",
    done:true
  },
  {
    id:2,
    item:"singing",
    done:false
  },
  {
    id:3,
    item:"basketball",
    done:true
  }
]

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  public todos:{
    id:number,
    item:string,
    done:boolean
  }[]=JSON.parse(window.localStorage.getItem("todos")||"[]");

  public curStatus:{
    id:number,
    item:string,
    done:boolean
  }=null;

  public visibility:string="all";

  ngOnInit(){
    this.handleHashChange();
    window.onhashchange=this.handleHashChange.bind(this);
  }

  ngDoCheck(){
    window.localStorage.setItem("todos",JSON.stringify(this.todos))
  }

  get filteredTodo(){
    switch(this.visibility){
      case "all":
        return this.todos;
      case "active":
        return this.todos.filter(todo=>!todo.done);
      case "completed":
        return this.todos.filter(todo=>todo.done);
    }
  }

  addTodo(e){
    let text=e.target.value;
    this.todos.push({
      id:this.todos.length+1,
      item:text,
      done:false
    });
    e.target.value="";
  }

  get toggleAll(){
    return this.todos.every(t=>t.done);
  }

  set toggleAll(val){
    console.log(val)
    this.todos.forEach(e=>e.done=val);
  }

  removeTodo(index:number){
    this.todos.splice(index,1);
  }

  handleEditing(e){
    const {keyCode,target}=e;
    if(keyCode===27){
      target.value=this.curStatus.item;
      this.curStatus=null;
    }
  }

  handleSave(todo,e){
    todo.item=e.target.value;
    this.curStatus=null;
  }

  get remainingTodo(){
    return this.todos.filter(todo=>!todo.done).length;
  }

  clearAllDone(){
    this.todos=this.todos.filter(todo=>!todo.done);
  }

  handleHashChange(){
    const hash=window.location.hash.substr(1);
    switch(hash){
      case "/":
        this.visibility="all";
        break;
      case "/active":
        this.visibility="active";
        break;
      case "/completed":
        this.visibility="completed";
        break;
    }
  }
}
