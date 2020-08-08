import * as React from 'react';

const MenuButton: React.FunctionComponent<{ title: string, onClick: React.MouseEventHandler }> = ({title, children, onClick}): React.ReactElement =>
  <button className="menu-item" type="button" onClick={onClick} >
    {children}
    <div className="button-title" >
      <div >
        {title}
      </div >
    </div >
  </button >
;

export default MenuButton;
