/* eslint-disable jsx-a11y/no-static-element-interactions */
import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { ToastContainer } from 'react-toastify';
import parse from 'html-react-parser';

import AboutModal from './AboutModal';
import Loader from '../common/Loader/Loader';

import {
  fetchAbout,
  updateAbout
} from '../../actions/aboutAction';

/**
 * @class About
 *
 * @extends {Component}
 */
export class About extends Component {
  state = {
    showModal: false,
  };

  /**
   * @param {Object} nextProps
   *
   * @returns {void}
   */
  componentDidMount() {
    this.props.fetchAbout();
  }

  /**
   *
   *
   * @description show About Modal
   *
   * @param { Object } about
   *
   * @returns { undefined }
   */
  showAboutModal = about => {
    this.setState(prevState => ({
      showModal: !prevState.showModal,
      selectedAbout: about
    }));
  };

  render() {
    const { 
      about,
      isLoading, 
      isAdmin,
    } = this.props;

    const header = (
      <div className="about-header">
        {isAdmin ? (
          <span 
            className="add-about-right" 
            onClick={() => this.showAboutModal(about)}
          >
            <i className="fa-edit fas" />
          </span>
        ) : null}
        <span className="about-title">About Andela Eats</span>
      </div>
    );

    const aboutModal = (
      <AboutModal
        show={this.state.showModal}
        error={this.state.error}
        about={this.state.selectedAbout}
        handleModal={this.showAboutModal}
        isUpdating={this.props.isUpdating}
        updateAbout={this.props.updateAbout}
        isLoading={this.props.isLoading}
      />
    );

    return (
      <div>
        <ToastContainer />
        <div>
          {isLoading && <Loader />}
          {header}
          {aboutModal}
          <div className="content">{parse(about && about.details ? about.details : '')}</div>
        </div>
      </div>
    );
  }
}

About.propTypes = {
  about: PropTypes.shape({
    id: PropTypes.number,
    details: PropTypes.string,
  }),
  isLoading: PropTypes.bool,
  isAdmin: PropTypes.number,
  isUpdating: PropTypes.bool,
  fetchAbout: PropTypes.func.isRequired,
  updateAbout: PropTypes.func.isRequired
};

export const mapStateToProps = ({ aboutReducer, user }) => ({
  about: aboutReducer.about,
  isLoading: aboutReducer.isLoading,
  isUpdating: aboutReducer.isUpdating,
  isAdmin: user.role
});

export default connect(
  mapStateToProps,
  {
    fetchAbout,
    updateAbout
  }
)(About);
