import React, { Component } from "react";
import { Layout, Footer } from "antd";
import "../App.less";
import {HashRouter, HashRouter as Router, Route, Switch, Link } from "react-router-dom";
import { Provider, connect } from "react-redux";
import store from "./redux/store";
import HisPage from "./views/HisPage";
import HisDetail from "./views/HisDetail";
export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      defaultHeight: ""
    };
  }

  componentDidMount() {
    this.setState({
      defaultHeight: document.body.clientHeight
    });
  }

  render() {
    return (
      <Provider store={store}>
        {/* <LocaleProvider locale={zh_CN}> */}
        <HashRouter>
          <Router basename="/textOne">
            <Switch>
              <React.Fragment>
                <Route exact path="/" component={HisPage} />
                <Layout>
                  <div className="dip-content">
                    <Route path="/hisPage" component={HisPage} />
                    <Route path="/hisDetail" component={HisDetail} />
                  </div>
                </Layout>
              </React.Fragment>
            </Switch>
          </Router>
        </HashRouter>
        {/* </LocaleProvider> */}
      </Provider>
    );
  }
}

