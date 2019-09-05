/* eslint-disable jsx-a11y/no-static-element-interactions */
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom'
import { func } from 'prop-types';
import { ToastContainer } from 'react-toastify';
import { getMenuTemplate } from '../../../../actions/admin/menuTemplateAction';
import Loader from '../../../common/Loader/Loader';
import { format } from "date-fns";

/**
 *
 * @description SingleMenuTemplate Component
 *
 * @class SingleMenuTemplate
 * @extends Component
 */
export class SingleMenuTemplate extends Component {
  state={
    isLoading: true,
    active: {
      Monday: true,
    },
    header:'Monday'
  }

  componentDidMount() {
    const {getMenuTemplate, match:{params}}=this.props

    getMenuTemplate(params.id).then(()=>{
      this.setState({isLoading:false})
    }) ;
  }

/**
     * Handles days click
     *
     * @param {object} event
     *
     * @returns {void}
     */
  handleClick=(event) => {
    const name = event.target.getAttribute('name');

    this.setState({
      active: { [name]: true },
      header: name
    })
  }

  /**
     * Renders renderMenuTemplate
     *
     * @returns {jsx}
     */
  renderMenuTemplate=({name,timestamps,mealPeriod,description}) => {
    const {
      active:{Monday, Tuesday, Wednesday, Thursday, Friday},
      header
    } = this.state;
    const weekDays = [
    { day:'Monday', isActive: Monday },
    { day:'Tuesday', isActive: Tuesday },
    { day:'Wednesday', isActive: Wednesday },
    { day:'Thursday', isActive: Thursday },
    { day:'Friday', isActive: Friday },
    ]

    return(
      <React.Fragment>
        <div className="header">
          <span className="heading">{name} </span>
          <Link to='/admin/menu-templates'>
          <i className="fas fa-arrow-circle-left" />
          </Link>
        </div>
        <div className="content-wrapper">
          <div className="description">{description}</div>
          <div className="other-details">
            Meal Period: <span>{mealPeriod}</span>
            Created At: <span>{timestamps.created_at}</span>
            Updated At: <span>{ format(timestamps.updated_at, 'YYYY-MM-DD')}</span>
          </div>
          <div className="days-wrapper">
            <div className="tabs">
              {weekDays.map(({day,isActive},index)=>{
               return <span
                key={index}
                name={day}
                className={`${isActive ? 'active' : 'day'}`}
                onClick={this.handleClick}>{day}
               </span>
              })}
            </div>
            <div className="day-title">{`${header} menu Items`}</div>
            <div className="addIcon"><i className="fas fa-plus-circle" /></div>
          </div>
        </div>
        </React.Fragment>
    );
  }

  render() {
    const {isLoading} = this.state;
    const { menuTemplate } = this.props;

    return (
      <React.Fragment>
        <div className="single-menu-template">
          {isLoading&&<Loader/>}
          <div className={`${isLoading && 'blurred'}`} >
            {menuTemplate.name && this.renderMenuTemplate(menuTemplate)}
          </div>
        </div>
        <ToastContainer/>
        </React.Fragment>
    );
  }
}

const mapStateToProps = ({ menuTemplates }) => ({
  menuTemplate: menuTemplates.menuTemplate,
});

const mapDispatchToProps = {
  getMenuTemplate
};

SingleMenuTemplate.propTypes = {
  getMenuTemplate: func.isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(SingleMenuTemplate);
