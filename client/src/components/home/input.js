import React from 'react';

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

        if(this.props.id==="name" || this.props.id==="gender" ||this.props.id==="species" || this.props.id==="img"){
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
                    ref={input => (this.input = input)}
                >
                {this.props.children}
                </Element>  
            </div>
        );
    }
}