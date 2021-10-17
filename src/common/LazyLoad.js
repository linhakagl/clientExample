import React from "react";
import { Spin } from "antd";

const MySpinner = <Spin style={{ marginLeft: "24px", marginTop: "20px" }}/>;

const LazyLoad = importFunc => {
  const Component = React.lazy(importFunc);
  return props => (
    <React.Suspense fallback={MySpinner}>
      <Component {...props} />
    </React.Suspense>
  );
};

export default LazyLoad;
