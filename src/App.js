import React, { Component } from 'react';
import './App.css';

class App extends Component {
  constructor(props){
    super(props);

    this.state = {
      users: [],
      pageNumber: 1,
      total_pages:0,
    }
  }

  componentDidMount(){
    this.changePage(this.state.pageNumber);
  }

  changePage(pageNum){
    const url = `https://reqres.in/api/users?page=${pageNum}`;

    fetch(url)
      .then(res => res.json())
      .then(res => this.setState({users: res.data, pageNumber: pageNum, total_pages: res.total_pages}));
  }
  render() {
    const {users} = this.state;
    return(
      <div className="container">
          <div class="header shadow-lg p-3 mb-5 bg-white rounded"><h3>User List:</h3></div>
          <div className="users">
            {users.map((user) => (
              <div className="card" key={user.id}>
                <img src={user.avatar} class="card-img-top" alt={`${user.email} avatar)`}/>
                <div className="card-body">
                  <h5 className="card-title">{user.first_name} {user.last_name}</h5>
                  <p className="card-text">{user.email}</p>
                </div>
              </div>
            ))}
          </div>
          <div className="btn-group" role="group" aria-label="Basic example">
            <button type="button" disabled={this.state.pageNumber === 1 ? true : false} className="btn btn-secondary" onClick={() => this.changePage(this.state.pageNumber - 1)}>Prev</button>
            <button type="button" className="btn btn-secondary">{this.state.pageNumber}</button>
            <button type="button" disabled={this.state.pageNumber >= this.state.total_pages ? true : false} className="btn btn-secondary" onClick={() => this.changePage(this.state.pageNumber + 1)}>Next</button>
          </div>
      </div>
    )
  }
}

export default App;
