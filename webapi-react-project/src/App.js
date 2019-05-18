import React from "react";
import "./App.css";
import styled from "styled-components";
import axios from "axios";

const ButtonStyle = styled.h2`
  color: black;
  border: 1px solid black;
  width: 200px;
  background: lawngreen;
  &:hover {
    background: green;
  }
`;

class App extends React.Component {
  state = {
    projects: []
  };

  getProjects = event => {
    event.preventDefault();
    axios.get("http://localhost:5000/api/projects").then(res => {
      this.setState({ projects: res.data });
      console.log(res.data);
    });
  };

  render() {
    return (
      <div className="App">
        <ButtonStyle onClick={this.getProjects}>
          <h2>Projects</h2>
        </ButtonStyle>
        {this.state.projects.map(project => {
          return (
            <div className="projectCard">
              <p>{project.name}</p>
              <p>{project.description}</p>
            </div>
          );
        })}
      </div>
    );
  }
}

export default App;
