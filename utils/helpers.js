'use strict';
import React from 'react';

function helpers() {}

helpers.createWord = (string) => {
  return string.split('').map((letter, index) => {
    var letterElement = (
      <p className="letter" key={index}>{letter}</p>
    );
    return letterElement;
  });
};

helpers.changeLetterColor = (target, letterIndex) => {
  var wordContainer = document.querySelector(target);
  var letterArray = wordContainer.childNodes;
  for (var i = 0; i < letterIndex; i++) {
    letterArray[i].style.color = 'white';
  }
};

export default helpers;
