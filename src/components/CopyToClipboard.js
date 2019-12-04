// @flow
import * as React from "react";
import copy from "copy-to-clipboard";

type Props = {
  text: string,
  children?: React.Node,
  onClick?: () => void,
  onCopy: () => void
};

class CopyToClipboard extends React.Component<Props> {
  onClick = (ev: SyntheticEvent<>) => {
    const { text, onCopy, children } = this.props;
    const elem = React.Children.only(children);

    if (onCopy) {
      copy(text);
      onCopy();
    }

    if (this.props.onClick && typeof this.props.onClick === "function") {
      this.props.onClick();
    } else if (elem && elem.props && typeof elem.props.onClick === "function") {
      elem.props.onClick();
    }
  };

  render() {
    const { text: _text, onCopy: _onCopy, children, ...rest } = this.props;
    const elem = React.Children.only(children);
    return React.cloneElement(elem, { ...rest, onClick: this.onClick });
  }
}

export default CopyToClipboard;
