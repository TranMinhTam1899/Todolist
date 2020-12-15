import React, { Component } from 'react';

class TaskForm extends Component {
  constructor(props){
    super(props);
    this.state={
      id: '',
      name: '',
      status: false
    }
  }

  componentWillMount(){
    if(this.props.task){
      this.setState({
        id: this.props.task.id,
        name: this.props.task.name,
        status: this.props.task.status
      });
    }
  }

  componentWillReceiveProps(nextProps){
    if(nextProps && nextProps.task){
      this.setState({
        id: nextProps.task.id,
        name: nextProps.task.name,
        status: nextProps.task.status
      });
    }else if(!nextProps.task){
      this.setState({
        id: '',
      name: '',
      status: false
      });
    }
  }

  onCloseForm=()=>{
    this.props.onCloseForm();
  }

  onChange=(e)=>{
    var target = e.target;
    var name=target.name;
    var value=target.value;
    if(name==="status"){
      value=target.value==='true' ? true : false
    }
    this.setState({
      [name]: value
    });

  }

  onSubmit=(e)=>{
    e.preventDefault(); //trang load lại trang của submit
    this.props.onSubmit(this.state);
    this.onClear();
    this.onCloseForm();

  }
  onClear=()=>{
    this.setState({
      name: '',
      status: false
    })
  }

  render() {

    var { id }=this.state;
    return (
      <div className="panel panel-warning">
        <div className="panel-heading">
    <h3 className="panel-title ">{id !== '' ? 'Cập nhật công việc' : 'Thêm công việc'}</h3>
          <span className="btn text-danger" onClick={this.onCloseForm}>
            <i class="fa fa-times" aria-hidden="true"></i>
          </span>

        </div>
        <div className="panel-body">
          <form onSubmit={this.onSubmit}>
            <div className="form-group">
              <label >Tên :</label>
              <input type="text" className="form-control" name="name" value={this.state.name} onChange={this.onChange}/>
            </div>
            <label >Trạng thái :</label>
            <select className="form-control" name="status" value={this.state.status} onChange={this.onChange}>
              <option value={true}>Kích hoạt</option>
              <option value={false}>Ẩn</option>
            </select>
            <div className="text-center mt-2">
              <button type="submit" className="btn btn-success">
                <i class="fa fa-floppy-o" aria-hidden="true"></i> &nbsp;
                {id !== '' ? 'Cập nhật' : 'Thêm mới'}
              </button>
              &nbsp;
              <button type="button" className="btn btn-danger" onClick={this.onClear}>
                <i class="fa fa-trash-o" aria-hidden="true"></i>&nbsp;
                Hủy
              </button>
            </div>
          </form>
        </div>
      </div>
    );
  }

}

export default TaskForm;
