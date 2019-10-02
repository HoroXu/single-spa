import React from 'react';
import ReactDOM from 'react-dom';
import singleSpaReact from 'single-spa-react';
import TestTwo from './index';

function domElementGetter() {
  return document.getElementById("testTwo")
}

const reactLifecycles = singleSpaReact({
  React,
  ReactDOM,
  rootComponent: TestTwo,
  domElementGetter,
})

export const bootstrap = [
  reactLifecycles.bootstrap,
];

export const mount = [
  reactLifecycles.mount,
];

export const unmount = [
  reactLifecycles.unmount,
];