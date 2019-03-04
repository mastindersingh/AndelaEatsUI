import React, { Component, Fragment } from 'react';

export class Faqs extends Component {

  render() {

    return (
      <div>
        <h3 className="faq-head">Frequently Asked Questions</h3>
        <div className="wrap-collabsible">
          <input id="collapsible" className="toggle" type="checkbox" />
          <label htmlFor="collapsible" className="lbl-toggle">How do I rate an order?</label>
          <div className="collapsible-content">
            <div className="content-inner">
              <p>
                In order to rate an order, you need to first collect it by clicking <strong>Collect</strong>
                on the order card. When this is done, the <strong>Rate</strong> button will now be visible.
                Click on it and rate the meal!
              </p>
            </div>
          </div>
        </div>

        <div className="wrap-collabsible">
          <input id="yu" className="toggle" type="checkbox" />
          <label htmlFor="yu" className="lbl-toggle">How do I rate an order?</label>
          <div className="collapsible-content">
            <div className="content-inner">
              <p>
                In order to rate an order, you need to first collect it by clicking <strong>Collect</strong>
                on the order card. When this is done, the <strong>Rate</strong> button will now be visible.
                Click on it and rate the meal!
              </p>
            </div>
          </div>
        </div>
      </div>
    );
  }


}

export default Faqs;