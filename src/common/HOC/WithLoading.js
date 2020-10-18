import React from "react";
import { Spin } from "antd";

export const withLoading = BaseComponent => {
  class HOC extends React.Component {
    state = {
      loading: false
    };

    showLoading = () => {
      this.setState({ loading: true });
    };

    hideLoading = () => {
      this.setState({ loading: false });
    };

    render() {
      return (
        <Spin spinning={this.state.loading} delay={0}>
          <BaseComponent
            loading={this.state.loading}
            showLoading={this.showLoading}
            hideLoading={this.hideLoading}
            {...this.props}
          />
        </Spin>
      );
    }
  }

  return HOC;
};
