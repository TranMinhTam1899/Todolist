import React, { Component } from "react";

class TaskItem extends Component {
  onUpdateStatus=()=>{
    this.props.onUpdateStatus(this.props.task.id);
  }
  onDelete=()=>{
    this.props.onDelete(this.props.task.id);
  }

  onUpdate=()=>{
    this.props.onUpdate(this.props.task.id);
  }

  render() {
    var { task, index} = this.props;
    return (
      <tr>
        <th scope="row">{index + 1}</th>
    <td>{task.name}</td>
        <td className="text-center">
          <span style={{cursor:"pointer"}}  className={task.status===true ? ' text-success' : 'text-danger'} onClick={this.onUpdateStatus}>{task.status===true ? 'Kích hoạt' : 'Ẩn'}</span>
        </td>
        <td className="text-center">
          <button className="btn btn-warning text-white" onClick={this.onUpdate}>
            <i class="fa fa-pencil" aria-hidden="true"></i>&nbsp;Sửa
          </button>
          &nbsp;
          <button className="btn btn-danger text-white" onClick={this.onDelete}>
            <i class="fa fa-trash" aria-hidden="true"></i>&nbsp;Xóa
          </button>
        </td>
      </tr>
    );
  }
}
export default TaskItem;
