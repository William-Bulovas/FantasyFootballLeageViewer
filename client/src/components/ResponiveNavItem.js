import React, { Component } from 'react';

export default class ResponiveNavItem extends Component {

	render() {  
        const isActive = window.location.pathname == this.props.to;
        const navLinkClass = 'nav-link d-none d-md-inline' + ( isActive ? ' active' : '' );
        
        return (
            <li className='nav-item'>
                <a className={ navLinkClass } href={ this.props.to } to={ this.props.to }>
                    { this.props.text }
                </a>
                <a className='mr-3 d-md-none' href={ this.props.to } to={ this.props.to }>
                    <img src={ this.props.imageSrc } className='icon'/>	
                </a>
            </li>
        );
    }
}
