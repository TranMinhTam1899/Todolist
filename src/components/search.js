import React, { Component } from "react";

class Search extends Component {
  constructor(props) {
    super(props);
    this.state = {
      keyword: ''
    }
  }
  onChange=(e)=>{
    var target = e.target;
    var name=target.name;
    var value=target.value;
    
    this.setState({
      [name]: value
    });

  }

  onSearch=()=>{
    this.props.onSearch(this.state.keyword);
  }



  render() {

    var { keyword } = this.state;
    return (
      <div className="col-xs-6 col-sm-6 col-md-6 col-lg-6">
        <div className="input-group">
          <input
            type="text"
            name="keyword"
            className="form-control"
            placeholder="Nhập từ khóa"
            value={keyword}
            onChange={this.onChange}
          />
          &nbsp;
          <span className="input-group-btn">
            <button className="btn btn-primary" type="button" onClick={this.onSearch}>
              <i class="fa fa-search" aria-hidden="true"></i>&nbsp; Tìm
            </button>
          </span>
        </div>
      </div>
    );
  }
}
export default Search;
