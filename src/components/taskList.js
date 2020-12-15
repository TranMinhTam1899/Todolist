import React, { Component } from "react";
import TaskItem from "./tastItem";
class TaskList extends Component {

  constructor(props) {
    super(props);
    this.state = {
      filterName: '',
      filterStatus: -1
    }
  }

  onChange=(e)=>{
    var target=e.target;
    var name=target.name;
    var value=target.value;
    this.props.onFilter(
      name==='filterName' ? value : this.state.filterName,
      name==='filterStatus' ? value : this.state.filterStatus
    )
    this.setState({
      [name] : value
    });
  };


  render() {
    var { tasks } = this.props;

    var { filterName, filterStatus }=this.state;
    var elmTasks = tasks.map((task, index) => {
      return <TaskItem key={task.id} index={index} task={task}
        onUpdateStatus={this.props.onUpdateStatus}
        onDelete={this.props.onDelete}
        onUpdate={this.props.onUpdate}

      />
    })
    return (
      <table className="table">
        <thead>
          <tr>
            <th scope="col">STT</th>
            <th scope="col">Tên công việc</th>
            <th scope="col">Trạng thái</th>
            <th scope="col">Chức năng</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <th></th>
            <td>
              <input type="text" className="form-control" name="filterName" placeholder="Filter"  value={filterName} onChange={this.onChange}/>
            </td>
            <td>
              <select className="form-control" name="filterStatus" value={filterStatus} onChange={this.onChange} >
                <option value={-1}>Tất cả</option>
                <option value={0}>Ẩn</option>
                <option value={1}>Kích hoạt</option>
              </select>
            </td>
            <td></td>
          </tr>

          {elmTasks}
        </tbody>
      </table>
    );
  }
}
export default TaskList;
