import * as React from 'react';
import ReactDOM from 'react-dom';

const root = document.createElement('div');
document.body.appendChild(root);

const KEY_ESC = 0x0001;
const KEY_ENTER = 0x001C;

const stopPropagation = (ev: React.MouseEvent<HTMLDivElement>): void => ev && ev.stopPropagation && ev.stopPropagation();

const Modal: React.FunctionComponent<{ onClose: () => void, closeOnEnter?: boolean, className?: string }> =
  ({onClose: handleClose, children, className, closeOnEnter}): React.ReactElement => {
    const handleKeyPress: React.KeyboardEventHandler = (ev: React.KeyboardEvent): void => {
      if (ev.key === 'Escape' || ev.keyCode === KEY_ESC) {
        handleClose();
      } else {
        const {target} = ev;
        const textArea = target && (target as unknown as {tagName: string}).tagName === 'TEXTAREA';
        if (closeOnEnter && (ev.key === 'Enter' || ev.keyCode === KEY_ENTER) && !textArea) {
          handleClose();
        }
      }
    };

    return ReactDOM.createPortal(
      <div
        className="modal"
        onClick={handleClose}
        onKeyDown={handleKeyPress}
        tabIndex={0}
      >
        <div className={`modal-content ${className || ''}`} onClick={stopPropagation} >
          {children}
        </div >
      </div >,
      root,
    );
  };
/*
 *class Modal extends React.PureComponent {
 *  constructor (props) {
 *    super(props);
 *    this.handleKeyPress = this.handleKeyPress.bind(this);
 *    this.setRef = this.setRef.bind(this);
 *  }
 *
 *  componentDidMount () {
 *    if (this.ref) {
 *      this.ref.focus();
 *    }
 *  }
 *
 *  handleKeyPress (ev) {
 *    if (ev.key === 'Escape' || ev.keyCode === KEY_ESC) {
 *      this.props.onClose();
 *    }
 *  }
 *
 *  setRef (el) {
 *    this.ref = el;
 *  }
 *
 *  render () {
 *    return (
 *      this.props.show &&
 *      ReactDOM.createPortal(
 *        <div
 *          className="modal"
 *          onClick={this.props.onClose}
 *          onKeyPress={this.handleKeyPress}
 *          ref={this.setRef}
 *          tabIndex="0"
 *        >
 *          <div className="modal-content" onClick={stopPropagation}>
 *            {this.props.children}
 *          </div>
 *        </div>,
 *        root
 *      )
 *    );
 *  }
 *}
 *
 *Modal.propTypes = {
 *  children: PropTypes.any,
 *  onClose: PropTypes.func.isRequired,
 *  show: PropTypes.bool.isRequired,
 *};
 */

export default Modal;
