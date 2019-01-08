import React from 'react';

export default class Input extends React.Component {

    componentDidUpdate(prevProps) {
        if (!prevProps.meta.active && this.props.meta.active) {
            this.input.focus();
        }
    }

    render() {
        const Element = this.props.element || 'input';

        console.log('in input.js', this.props);
    
        //make an array of all aria- properties, and then build the object with the different parts of the array
        const allyProps = {['aria-describedby']: this.props['aria-describedby']}

        const max = {max: this.props.max};
        const maxLength = {maxLength: this.props.maxLength};

        let error;
        if (this.props.meta.touched && this.props.meta.error) {
            error = <div className="form-error">{this.props.meta.error}</div>;
        }

        return (
            <div className="form-input">
                <label htmlFor={this.props.input.name} className={this.props.className}>
                    {this.props.label}
                    {error}
                </label>
            
                <Element
                    {...this.props.input}
                    {...allyProps}
                    {...max}
                    {...maxLength}
                    id={this.props.input.name}
                    type={this.props.type}
                    ref={input => (this.input = input)}
                    autoFocus = {this.props.autoFocus}
                >
                {this.props.children}
                </Element>  
            </div>
        );
    }
}