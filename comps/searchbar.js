import React, { Component } from 'react';

class SerachBar extends Component {

  render() {
    return (
      <>
      <div class="wrap">
     <div class="search">
        <input type="text" class="searchTerm" placeholder="What are you looking for?"/>

        <button type="submit" class="searchButton"></button>
     </div>
  </div>
      </>
    );
  }

}

export default SerachBar;
