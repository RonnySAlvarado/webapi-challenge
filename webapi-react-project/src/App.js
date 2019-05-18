import React from "react";
import "./App.css";
import styled from "styled-components";

const ButtonStyle = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 0 auto;
  button {
    color: white;
    background: green;
  }
`;

class App extends React.Component {
  render() {
    return (
      <ButtonStyle>
        <button>Projects</button>
      </ButtonStyle>
    );
  }
}

export default App;
