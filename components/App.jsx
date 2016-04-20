import React from 'react';

var App = React.createClass({
  render() {
    return (
      <div>
        <p>App Container</p>
        {this.props.children}
      </div>
    )
  }
});

export default App;
