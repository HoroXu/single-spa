import React from 'react';
import ReactDOM from 'react-dom';
import singleSpaReact from 'single-spa-react';
import TestOne from './root.component';

function domElementGetter() {
  return document.getElementById("testOne")
}

const reactLifecycles = singleSpaReact({
  React,
  ReactDOM,
  rootComponent: TestOne,
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