import React from 'react';

import classes from './Button.module.css';

const Button = (props) => {

    let attachedClasses = [classes.Button];
    attachedClasses.push(classes[props.type]);

  return <button className={attachedClasses.join(' ')}>{props.children}</button>;
};

export default Button;
