import React, { Component } from 'react';
import './App.css';

const user = {
  firstname: 'Shi',
  lastname: 'Keming',
};

const list = [
  {
    title: 'React',
    url: 'https://facebook.github.io/react/',
    author: 'Jordan Walke',
    num_comments: 3,
    points: 4,
    objectID: 0,
  },
  {
    title: 'Redux',
    url: 'https://github.com/reacejs/redux',
    author: 'Dan Abramov, Andrew Clark',
    num_comments: 2,
    points: 5,
    objectID: 1,
  }
];

const userService = user => user.firstname + ' ' + user.lastname;

const isSearched = searchTerm => item =>
  item.title.toLowerCase().includes(searchTerm.toLowerCase());

class Title extends Component {
  render() {
    const { title } = this.props;
    return (
      <h2>{title}</h2>
    );
  }
}

class Button extends Component {
  render() {
    const { onClick, className = '', children } = this.props;
    return (
      <button
        onClick={onClick}
        className={className}
        type="button"
      >
        {children}
      </button>
    );
  }
}

const Search = ({ value, onChange, placeholder, children }) =>
  <form>
    {children}
    <input
      type="text"
      value={value}
      onChange={onChange}
      placeholder={placeholder}
    />
  </form>

class Table extends Component {
  render() {
    const { list, pattern, onDismiss } = this.props;
    const largeColumn = { width: '40%' };
    const midColumn = { width: '30%' };
    const smallColumn = { width: '10%' };
    return (
      <div className="table">
        {list.filter(isSearched(pattern)).map(item =>
          <div key={item.objectID} className="table-row">
            <span style={largeColumn}>
              <a href={item.url}>{item.title}</a>
            </span>
            <span style={midColumn}>
              {item.author}
              </span>
            <span style={smallColumn}>
              {item.num_comments}
              </span>
            <span style={smallColumn}>
              {item.points}
              </span>
            <span style={smallColumn}>
              <Button 
                onClick={() => onDismiss(item.objectID)}
                className="button-inline">
                Dismiss
              </Button>
            </span>
          </div>
        )}
      </div>
    );
  }
}

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      title: 'The Road To Learn React',
      name: userService,
      searchTerm: '',
      list,
    };

    this.onSearchChange = this.onSearchChange.bind(this);
    this.onDismiss = this.onDismiss.bind(this);
  }

  onSearchChange(event) {
    this.setState({ searchTerm: event.target.value });
  }

  onDismiss(id) {
    const updateList = this.state.list.filter(
      item => item.objectID !== id
    );
    this.setState({ list: updateList });
  }

  render() {
    const { title, name, searchTerm, list } = this.state;
    return (
      <div className="page">
        <Title
          title={title} />
        <div className="interactions">
          <Search
            value={searchTerm}
            onChange={this.onSearchChange}
            placeholder='Search'
          >
          </Search>
        </div>
        <Table
          list={list}
          pattern={searchTerm}
          onDismiss={this.onDismiss}
        />
      </div>
    );
  }
}

export default App;