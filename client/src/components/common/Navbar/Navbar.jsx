import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from "react-router-dom";
import { connect } from 'react-redux';

import logo from '../../../assets/images/andela-logo.png';

// Actions
import loadActiveUser from '../../../actions/activeUserAction';
import { getAdminUser } from '../../../actions/admin/adminUserAction';

// helper
import logoutActiveUser from '../../../helpers/logoutUser';


/**
 * Application nav bar
 */
export class Navbar extends Component {
/**
 * Creates an instance of login form
 * @param {any} props -
 */
  constructor(props) {
    super(props);
    this.state = {
      activeUser: {}
    };
    this.logOutUser = this.logOutUser.bind(this);
  }

  /**
   * @memberof Navbar
   * @returns {null} null
   */
  componentDidMount() {
    this.props.loadActiveUser();
    this.props.getAdminUser();
  }

  /**
   * @memberof Navbar
   * @param {prevProps} prevProps
   * @returns {void} void
   */
  componentDidUpdate(prevProps) {
    if (prevProps.activeUser !== this.props.activeUser) {
      this.setState({ activeUser: this.props.activeUser });// eslint-disable-line
    }
    if (prevProps.userRole !== this.props.userRole) {
      this.setState({ userRole: this.props.userRole });// eslint-disable-line
    }
  }

  /**
   * @memberof Navbar
   * @param {props} props
   * @returns {null} null
   */
  logOutUser(props) {
    this.props.logoutActiveUser();
    this.props.history.push('/');
  }

  /**
   *
   * This is React render method that render the UI on the dom
   * @function Navbar
   * @return { void }
   */
  render() {
    const { activeUser, userRole } = this.state;
    const { adminDashboard } = this.props;

    return (
      <header className="nav-bar">
        <div className="logo-wrapper">
          <div className="logo-img">
            <img src={logo} alt="logo" />
          </div>
          <div className="logo-name-global">AndelaEats</div>
        </div>

        <div className="nav-spacer" />
        <div className="profile-items">
          <div>
            <i className="far fa-bell bell" />
          </div>
          <div className="profile-pics">
            <img src={activeUser.picture} alt="profile-img" />
          </div>
          <div className="profile-name">{activeUser.name}</div>
          <div className="dropdown">
            <div className="arrow-down" />
            <div className="dropdown-content">
              { userRole === 1 ? adminDashboard ? <Link to="/">User Dashboard</Link>
                : <Link to="/admin/dashboard">Admin Dashboard</Link>
                : ''
              }
              <a href="" onClick={logoutActiveUser}>Signout</a>
            </div>
          </div>
        </div>
      </header>
    );
  }
}

/**
 * connect to redux store
 * @param {state} state
 * @returns {object} user
 */
const mapStateToProps = state => ({
  activeUser: state.userReducer,
  userRole: state.user.role,
});

Navbar.propTypes = {
  getAdminUser: PropTypes.func.isRequired,
  loadActiveUser: PropTypes.func.isRequired,
  logoutActiveUser: PropTypes.func.isRequired,
  activeUser: PropTypes.object.isRequired,
  userRole: PropTypes.number.isRequired,
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }),
  isAdmin: PropTypes.bool,
  adminDashboard: PropTypes.bool
};

export default connect(mapStateToProps,
  {
    loadActiveUser,
    logoutActiveUser,
    getAdminUser
  })(Navbar);
