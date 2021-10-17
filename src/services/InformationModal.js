import { Modal } from "antd";

export class InformationModal {
  error = message => {
    return Modal.error({
      title: message,
      content: ""
    });
  };

  info = message => {
    return Modal.info({
      title: message,
      content: ""
    });
  };

  warning = message => {
    return Modal.warning({
      title: message,
      content: ""
    });
  };
}

export default InformationModal;
