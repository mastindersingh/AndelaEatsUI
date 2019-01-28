import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import DatePicker from 'react-date-picker';
import moment from 'moment';
import { format } from 'date-fns';
import { toast, ToastContainer } from 'react-toastify';

import { fetchMealRatings } from '../../../actions/admin/mealRatingActions';
import RatingsTabs from './RatingsTabs';
import Loader from '../../common/Loader/Loader';
import EmptyContent from '../../common/EmptyContent';


export class Ratings extends Component {
	state = {
		isOpen: false,
		end: '',
		date: moment().format('YYYY-MM-DD')
	}

	componentDidMount() {
		this.props.fetchMealRatings(this.state.date);
	}

	handleFilterModal = () => {
		this.setState(prevProps => ({
			isOpen: !prevProps.isOpen
		}))
	}

	handleFilterSubmit = () => {
		const { end } = this.state;
		const filterDate = format(end, 'YYYY-MM-DD');
		if(end != '') {
			this.props.fetchMealRatings(filterDate);
			this.setState(prevProps => ({
				isOpen: !prevProps.isOpen
			}));
		} else {
			toast.error(filterDate);
		}
	}

	render() {
		const { isOpen, end } = this.state;
		const today = moment().format('dddd, MMMM Do YYYY');
		const displayDate = this.state.end !== '' ? format(end, 'dddd, MMMM Do YYYY') : today;
		let rating = this.props.allRatings.ratingList.length === 0
			? <EmptyContent message = 'No Ratings for this day' />
			: <RatingsTabs />;

		return (
			<Fragment>
				<div>
					<div className="title">
						<span className="rating-title">Ratings for {displayDate}</span>
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
				<ToastContainer />
			</Fragment>
		)
	}
};

const mapStateToProps = ({ allRatings }) => ({ allRatings });

export default connect(mapStateToProps, {fetchMealRatings})(Ratings);
