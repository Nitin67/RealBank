import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import SideNav, { Nav, NavIcon, NavText } from 'react-sidenav';
import { userActions } from '../_actions';

class HomePage extends React.Component {
    componentDidMount() {
        this.props.dispatch(userActions.getAll());
    }

    handleDeleteUser(id) {
        return (e) => this.props.dispatch(userActions.delete(id));
    }

    render() {
        const { user, users } = this.props;
        return (
            <div style={{position: 'fixed',height: '800px',right: '83%',top: '0%',background: 'white', width: 220}}>
                  <div style={{background: '#2c3e50', color: '#FFF', width: 220}}>
                   <SideNav highlightColor='#E91E63' highlightBgColor='#00bcd4' defaultSelected='sales'>
                     <Link to={'/FindUserProfile'}>
                       <Nav id='dashboard'>
                           <NavText> Search User Profile </NavText>
                       </Nav>
                     </Link>
                     <Link to={'/login'}>
                       <Nav id='dashboard'>
                           <NavText> logout </NavText>
                       </Nav>
                     </Link>
                   </SideNav>
                 </div>
            </div>
        );
    }
}

function mapStateToProps(state) {
    const { users, authentication } = state;
    const { user } = authentication;
    return {
        user,
        users
    };
}

const connectedHomePage = connect(mapStateToProps)(HomePage);
export { connectedHomePage as HomePage };
