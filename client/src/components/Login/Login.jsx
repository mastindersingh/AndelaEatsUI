import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';
import logo from '../../assets/images/logo.png';
import Select from 'react-select';
import 
backgroundImg 
  from '../../assets/images/google-logo-icon-PNG-Transparent-Background.png';

import 'react-toastify/dist/ReactToastify.css';
// configuration
import { config } from '../../config';

// helper
import checkLogin from '../../helpers/checkLogin';

// style
import '../../assets/scss/font.scss';

/**
 * 
 * This is class method that handles signin logic
 * @export
 * @class SigninForm
 * @extends {React.Component}
 */
class Login extends Component {
  /**
   * Creates an instance of login form
   * @param {any} props -
   */
  constructor(props) {
    super(props);
    this.state = {
      selectedOption: null
    };
  }

  handleChange = selectedOption => {
    this.setState({ selectedOption });
  }

  /**
   * 
   * This is React render method that render the UI on the dom
   * @function SigninForm
   * @return { void }
   */
  render() {
    const redirectUrl = `${config.ANDELA_API_BASE_URL}/login?redirect_url=${config.BASE_URL}`;
    const options = {
      position: 'top-right',
      autoClose: false,
      hideProgressBar: true,
    };

    const countryLocation = [
      { value: 'lagos', label: 'Lagos', location: 1 },
      { value: 'nairobi', label: 'Nairobi', location: 2 },
      { value: 'kampala', label: 'Kampala', location: 3 }
    ]

    const { selectedOption } = this.state;
    selectedOption && localStorage.setItem('location', selectedOption.location)

    if (checkLogin()) {
      return <Redirect to="/ordermeal" />;
    }

    return (
      <div className="main-wrapper">
        <div className="grid-container">
          <div className="login-input-frame">
            <div className="logo-container">
              <img src={logo} alt="logo" width="60" height="60" />
              <div className="logo-name">
                  AndelaEats
              </div>
            </div>
            <div className="login-page-caption">
                A convinent way to 
              <br /> 
                order your meals
            </div>

            <div className="action-wrapper">
              <div className="select-button">
                <Select
                  value={selectedOption}
                  onChange={this.handleChange}
                  options={countryLocation}
                  placeholder="Select a Location"
                />
              </div>

              {selectedOption &&
                <a href={redirectUrl}>
                <div className="google-button">
                  <div className="google-img">
                    <img 
                      src={backgroundImg}
                      alt="google-logo"
                    />
                  </div>
                  <div className="login-button">
                      LOGIN WITH GOOGLE
                  </div>
                </div>
                </a>
              }
            </div>
            <ToastContainer />
          </div>
          <div className="login-picture-frame" />
        </div>
      </div>
    );
  }
}
export default Login;
