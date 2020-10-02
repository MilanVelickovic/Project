import React from 'react';

import classes from './Input.module.css';

const Input = (props) => (
    <input type={props.type} className={classes.Input} value={props.value} placeholder={props.placeholder} onChange={props.action}/>
);

export default Input;