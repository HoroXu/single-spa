import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import { Provider } from "react-redux";
import store from "../src/redux/store";
import { HashRouter } from "react-router-dom";
// import { LocaleProvider } from 'antd'
// import zh_CN from 'antd/lib/locale-provider/zh_CN'
// require("./assets/font/iconfont.js");

export default class TestTwo extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (

        <Provider store={store}>
          <HashRouter>
            <App />
          </HashRouter>
        </Provider>
   
    );
  }
}
