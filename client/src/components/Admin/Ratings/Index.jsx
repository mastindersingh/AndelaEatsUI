import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import DatePicker from 'react-date-picker';
import moment from 'moment';
import { fetchMealRatings } from '../../../actions/admin/mealRatingActions';

import RatingsTabs from './RatingsTabs';
import Loader from '../../common/Loader/Loader';


export class Ratings extends Component {
	state = {
		isOpen: false,
		end: '',
		date: moment().format('YYYY-MM-DD')
	}

	componentDidMount() {
		const today = moment().format('dddd, MMMM Do YYYY');
		this.props.fetchMealRatings('2019-01-16');
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
		let rating = this.props.ratingList.isLoading ? <Loader /> : <RatingsTabs />;

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
				{rating}
			</Fragment>
		)
	}
};

const mapStateToProps = ({ ratingList }) => ({ ratingList })

export default connect(mapStateToProps, {fetchMealRatings})(Ratings)
