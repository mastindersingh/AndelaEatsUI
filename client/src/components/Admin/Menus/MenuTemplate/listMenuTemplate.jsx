import React, { Component } from 'react';
import { connect } from 'react-redux';
import TemplateRow from './TemplateRow';
import Loader from '../../../common/Loader/Loader';
import AddMenuTemplateButton from './index';
import { getMenuTemplates } from '../../../../actions/admin/menuTemplateAction';

export class ListMenuTemplate extends Component {

  componentDidMount() {
    this.getMenuTemplates();
  }

  getMenuTemplates = () => {
    this.props.getMenuTemplates()
    .then(() => {}).catch(() => {});
  }
  renderMenuTemplates = menuTemplates => {
    return menuTemplates.map(menuTemplate => (
      <TemplateRow
        key={menuTemplate.id}
        templateDetails={menuTemplate}
      />
    ));
  }
  render() {
    const { menuTemplates, isLoading } = this.props.menuTemplates;
    return(
      <div id="menu-template">
        {isLoading  && <Loader />}
        <div className={`${isLoading && 'blurred'}`} id="table-wrapper">
          <div id="menu-template-header">
            <h3 id="menu-template-title">Menu Template</h3>
            <div id="template-buttons">
              <AddMenuTemplateButton />
              <button className="menu-template-header-buttons" type="button">
                Filter
              </button>
              <button className="menu-template-header-buttons" type="button">
                Copy
              </button>
            </div>
          </div>

          {menuTemplates.length > 0 && (
            <div id="menu-template-table-header">
              <div className="custom-col-2">Name</div>
              <div className="custom-col-2">Meal period</div>
              <div className="custom-col-5">Description</div>
              <div className="custom-col-3">Options</div>
            </div>
          )}
          {menuTemplates.length > 0 && this.renderMenuTemplates(menuTemplates)}
          {!isLoading && !menuTemplates.length && (
            <EmptyContent message="No menu template has been created yet" />
          )}
        </div>
      </div>
    );
  }
};

export const mapStateToProps = ({ menuTemplates }) => ({ menuTemplates });

export const mapDispatchToProps = (dispatch) => ({
  getMenuTemplates: () => dispatch(getMenuTemplates()),
});

export default connect(mapStateToProps, mapDispatchToProps)(ListMenuTemplate);
