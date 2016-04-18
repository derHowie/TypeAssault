import React from 'react';

class App extends React.Component {
  render() {
    return (
      <div>
        <p>App Container</p>
        {this.props.children}
      </div>
    )
  }
}

export default App;
