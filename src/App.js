import React, { Component } from "react";
import "./App.css";
import TaskForm from "./components/TaskForm";
import Control from "./components/control";
import TaskList from "./components/taskList";

class App extends Component {

  constructor(props) {
    super(props);
    this.state = {
      tasks: [],
      isDisplayForm: false,
      taskEdit: null,
      filter: { 
        name: '',
        status: -1
      },
      keyword: ''
    }
  }

  // chạy khi component được gọi
  componentWillMount(){
    if(localStorage && localStorage.getItem('tasks')){
      var tasks=JSON.parse(localStorage.getItem('tasks'));
      this.setState({ 
        tasks: tasks
      })
    }

  }

  generateID() {
    return Math.random() + '-' + Math.random() + '-';
  }

  onToggleForm=()=>{
    if(this.state.isDisplayForm && this.state.taskEdit !== null){
      this.setState({
        isDisplayForm: true,
        taskEdit: null
      });
    }else{
      this.setState({
        isDisplayForm: !this.state.isDisplayForm,
        taskEdit: null
      });
    }
   
  }
  onCloseForm=()=>{
    this.setState({
      isDisplayForm: false
    });
  }

  onShowForm=()=>{
    this.setState({
      isDisplayForm: true
    });
  }

  checkData=(data)=>{

    var tasks=JSON.parse(localStorage.getItem('tasks'));
    var result=0;

    tasks.map((task, index)=>{
      if(data.name===task.name){
        return result=1;
      }else{
        return result;
      }
    });

    return result;
  }

  onSubmit=(data)=>{
    const check=this.checkData(data);
    if(check!==1){
      var {tasks}=this.state;
      if(data.id === ''){
        if(data.name !== ''){
          data.id=this.generateID();
          tasks.push(data);
        }else{
          alert("Không được để trống bạn ơi !");
        }
        
      }else{
        if(data.name !==''){
          var index=this.findIndex(data.id);
          tasks[index]=data;
        }else{
          alert("Không được để trống bạn ơi !");
        }
        
      }
      this.setState({
        tasks: tasks,
        taskEdit: null
      })
      localStorage.setItem('tasks', JSON.stringify(tasks));
    }else{
      alert("Bị trùng tên rồi bạn")
    }
    
  }

  onUpdateStatus=(id)=>{
    var {tasks}=this.state;
    var index=this.findIndex(id);
    if(index !== -1){
      tasks[index].status=!tasks[index].status;
      this.setState({
        tasks: tasks
      })
    }
    localStorage.setItem('tasks', JSON.stringify(tasks));

  }
  findIndex=(id)=>{
    var {tasks}=this.state;
    var result=-1;
    tasks.map((task, index)=>{
      if(task.id===id){
        result=index;
      }
    });
    return result;
  }

  onDelete=(id)=>{
    var {tasks}=this.state;
    var index=this.findIndex(id);
    if(index !== -1){
      tasks.splice(index, 1);
      this.setState({
        tasks: tasks
      });
      localStorage.setItem('tasks', JSON.stringify(tasks));
    }
    this.onCloseForm();
  }

  onUpdate=(id)=>{
    var {tasks}=this.state;
    var index=this.findIndex(id);
    var taskEdit=tasks[index];
    this.setState({
      taskEdit: taskEdit
    });
    this.onShowForm();
  }

  onFilter=(filterName, filterStatus)=>{
    filterStatus=parseInt(filterStatus, 10);
    this.setState({
      filter: {
        name: filterName,
        status: filterStatus
      }
    })

  }

  onSearch=(keyword)=>{
    this.setState({
      keyword: keyword
    });
  }
  render() {
    var { tasks, isDisplayForm, taskEdit, filter, keyword } = this.state; //var tasks=this.state.tasks
    if(filter){
      if(filter.name){
        tasks=tasks.filter((task)=>{
          return task.name.toLowerCase().indexOf(filter.name) !== -1;
        })
      }
      tasks=tasks.filter((task)=>{
        if(filter.status===-1){
          return task;
        }else{
          return task.status===(filter.status=== 1 ? true : false);
        }
       
      })
    }
    // kiểm ra và render tìm kiếm
    if(keyword){
      tasks=tasks.filter((task)=>{
        return task.name.toLowerCase().indexOf(keyword) !== -1;
      })
    }

    var elmDisplayForm=isDisplayForm 
      ? <TaskForm 
      onCloseForm={this.onCloseForm} 
      onSubmit={this.onSubmit} 
      task={taskEdit}
      /> : '';
    return (
      <div className="container">
        <div className="text-danger text-center">
          <h1>Quản lý công việc</h1>
        </div>
        <div className="row">
          <div className="col-xs-4 col-sm-4 col-md-4 col-lg-4">
            {/* <TaskForm /> */}
            {elmDisplayForm}
          </div>
          <div className={isDisplayForm ? 'col-xs-8 col-sm-8 col-md-8 col-lg-8' : 'col-xs-12 col-sm-12 col-md-12 col-lg-12'}>
            <button type="submit" className="btn btn-primary" onClick={this.onToggleForm}>
              <i class="fa fa-plus" aria-hidden="true"></i> &nbsp; Thêm công
              việc
            </button>
            <Control onSearch={this.onSearch} onSort={this.onSort} />

            <div className="row mt-15">
              <div className="col-xs-12 col-sm-12 col-md-12 col-lg-12">
                <TaskList 
                tasks={tasks} 
                onUpdateStatus={this.onUpdateStatus} 
                onDelete={this.onDelete} 
                onUpdate={this.onUpdate}
                onFilter={this.onFilter}
                
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default App;
