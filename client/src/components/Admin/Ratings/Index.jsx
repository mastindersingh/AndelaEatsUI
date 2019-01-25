import React, { Component, Fragment } from 'react';
import DatePicker from 'react-date-picker';
import moment from 'moment';

import RatingsTabs from './RatingsTabs';


class Ratings extends Component {
	state = {
		isOpen: false,
		end: ''
	}

	handleFilterModal = () => {
		this.setState(prevProps => ({
			isOpen: !prevProps.isOpen
		}))
	}

	handleFilterSubmit = () => {
		const { end } = this.state;
	}

	render() {
		const { isOpen, end } = this.state;
		const today = moment().format('dddd, MMMM Do YYYY');

		return (
			<Fragment>
				<div>
					<div className="title">
						<span className="rating-title">Ratings for {today}</span>
						<br/><br/><br/>
						<div className="filter">
							<button
								className="button"
								type="button"
								onClick={this.handleFilterModal}
							><i className="fas fa-filter" />   Filter
							</button>
							<form
								className={`dropdown ${isOpen && "active"}`}
							>
								<div>
									<label className="date-label" htmlFor="end">End Date
										<DatePicker
											onChange={(date) => this.setState({ end: date })}
											value={end}
										/>
									</label>
								</div>
								<button
									className="input btn"
									type="button"
									onClick={this.handleFilterSubmit}
								>
									Submit
								</button>
								<div className="actions">
									<a
										className="action-item"
										role="button"
										tabIndex="0"
										onClick={() => this.setState({ end: '' })}
									>Clear filters
									</a>
									<a
										className="action-item"
										role="button"
										tabIndex="0"
										onClick={this.handleFilterModal}
									>Close
									</a>
								</div>
							</form>
						</div>
					</div>
				</div>
				<RatingsTabs />
			</Fragment>
		)
	}
}

export default Ratings;
