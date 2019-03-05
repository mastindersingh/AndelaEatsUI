import React, { Component } from 'react';

class About extends Component {
  render() {
    return (
      <div className="animation-class">
        <span className="about-heading">About Andela Eats</span><br/><br/>
        <span>
          The Andela Eats is the software automation of the current feeding system so as to make it
          scalable through enabling access to all Andelans without Andela having to incur extra cost.
          The solution will also serve as a central place where all meal information is stored both for
          andelans and vendors. Vendors can manage meals and view feedback. Andelans can conveniently
          pre-order meals without the fear that a particular favourite meal is finished.
        </span><br/><br/>
        <span>
          <strong className="about-sub-heading">AS-IS</strong><br/><br/>
          Currently, when andelans go for meals especially during lunch. There are the following pain
          points that make having lunch cumbersome.
          <ol>
            <li>
              Long queues<br/><br/>
            </li>
            <li>
              Loss of man-hour<br/><br/>
            </li>
            <li>
              Offline NFC tags<br/><br/>
            </li>
          </ol>
          Also andelans might have a meeting during lunch time or overflow into the lunch time.
          One sometimes has to rush up to get the food booked or packaged and run back into the meeting.
          The major challenge is that sometimes the meeting may be so critical there is no room to leave
          the meeting for lunch or to book lunch. 
        </span><br/><br/>
        <span>
        <strong className="about-sub-heading">TO-BE</strong><br/><br/>
          Automation of the current feeding system so as to make it scalable through enabling access to
          all Andelans without Andela having to incur extra cost.  
          The solution will also serve as a central place where all meal information is stored both for 
          andelans and vendors.
          Vendors can manage meals and view feedback.
          Andelans can conveniently pre-order meals without the fear that a particular favourite meal is
          finished.
        </span><br/><br/>
        <div className="numberlist">
          <span>
          <strong className="about-sub-heading">Key Features</strong><br/>
          <ul>
            <li>
              <br/>Authentication and authorization<br/><br/>
              <ul>
                <li>Only Andelans should be able to pre-order meals</li>
                <li>Vendors should see and be able to CRU meals</li>
                <li>Facilities should be able to CRUD type of  meals for Andelans</li>
                <li>Andelans should be able to give feedback on meals</li>
              </ul>
            </li>
            <li>List of Meals for view on weekly basis</li><br/><br/>
            <li>Meal Tagging ID</li>
            <li>CRUD for Meal types/ plans to Vendors by Facilities Dept</li>
            <li>CRUD for Vendor selection and assignment.</li>
            <li>Pull Tag information from NFC device</li>
            <li>Feedback For Meals</li>
            <li>Assigning/updating a Vendor for current Month to Month + 2</li><br/><br/>
            <li>Slack Integration to Meal App</li>
            <li>Restriction to Time for Posting of Meals</li>
            <li>Analytics and Stats</li>
            <li>Type of Meals Ordered</li>
            <li>Feedback/Rating  from Andelans</li>
            <li>Export of the Analytics and Stats to excel</li>
          </ul>
          </span>
        </div>
      </div>
    );
  }
}

export default About;
