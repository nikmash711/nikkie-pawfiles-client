import React from 'react';
import {todaysDate} from './helper-functions';

export default class Input extends React.Component {
    componentDidUpdate(prevProps) {
        if (!prevProps.meta.active && this.props.meta.active) {
            this.input.focus();
        }
    }

    render() {
        const Element = this.props.element || 'input';

        let error;
        if (this.props.meta.touched && this.props.meta.error) {
            error = <div className="form-error">{this.props.meta.error}</div>;
        }

        let className="";

        //Question: better way to do this? 
        if(this.props.id==="name" || this.props.id==="gender" ||this.props.id==="species" || this.props.id==="img" || this.props.id==="date" || this.props.id==="title" || this.props.id==="description" ){
            className="required";
        }

        return (
            <div className="form-input">
                <label htmlFor={this.props.input.name} className={className}>
                    {this.props.label}
                    {error}
                </label>

                <Element
                    {...this.props.input}
                    id={this.props.input.name}
                    type={this.props.type}
                    max = {this.props.type==="date"? todaysDate() : undefined}
                    //Question: I only want max on date elements but not sure how else to do it
                    ref={input => (this.input = input)}
                >
                {this.props.children}
                </Element>  
            </div>
        );
    }
}