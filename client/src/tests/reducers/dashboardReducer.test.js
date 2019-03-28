import { initialVendorsPerformance } from "../../reducers/initialState";
import dashBoardReducer from "../../reducers/dashboardReducer";

import {
  FETCH_VENDOR_COLLECTED_ORDERS,
  FETCH_VENDOR_UNCOLLECTED_ORDERS,
  FETCH_VENDOR_CANCELED_ORDERS,
  VENDOR_PERFORMANCE_LOADING,
  FETCH_VENDOR_PERFORMANCE_FAILED,
  FETCH_VENDOR_PERFORMANCE_DATES,
  FETCH_VENDOR_NAME, FETCH_VENDOR_RATINGS,
} from '../../actions/actionTypes';

describe('Dashboard Reducer',()=>{
  it('should update loading state',()=>{
    const action = {
      type: VENDOR_PERFORMANCE_LOADING,
      payload: true
    };
    const newState = dashBoardReducer(initialVendorsPerformance, action);
    expect(newState.isLoading).toEqual(true);
  });

  it('should update vendorName',()=>{
    const action = {
      type: FETCH_VENDOR_NAME,
      payload: "sample vendor"
    };
    const newState = dashBoardReducer(initialVendorsPerformance, action);
    expect(newState.vendorName).toEqual("sample vendor");
  });

  it('should update collectedOrders',()=>{
    const action = {
      type: FETCH_VENDOR_COLLECTED_ORDERS,
      payload: [1,0,1]
    };
    const newState = dashBoardReducer(initialVendorsPerformance, action);
    expect(newState.collectedOrders).toEqual(action.payload);
  });

  it('should update uncollectedOrders',()=>{
    const action = {
      type: FETCH_VENDOR_UNCOLLECTED_ORDERS,
      payload: [1,0,1]
    };
    const newState = dashBoardReducer(initialVendorsPerformance, action);
    expect(newState.uncollectedOrders).toEqual(action.payload);
  });

  it('should update cancelledOrders',()=>{
    const action = {
      type: FETCH_VENDOR_CANCELED_ORDERS,
      payload: [1,0,1]
    };
    const newState = dashBoardReducer(initialVendorsPerformance, action);
    expect(newState.cancelledOrders).toEqual(action.payload);
  });

  it('should update datesConsidered state',()=>{
    const action = {
      type: FETCH_VENDOR_PERFORMANCE_DATES,
      payload: ['Thu, 14 Mar 2019','Thu, 16 Mar 2019']
    };
    const newState = dashBoardReducer(initialVendorsPerformance, action);
    expect(newState.datesConsidered).toEqual(action.payload);
  });

  it('should update average Ratings state',()=>{
    const action = {
      type: FETCH_VENDOR_RATINGS,
      payload: [5,0]
    };
    const newState = dashBoardReducer(initialVendorsPerformance, action);
    expect(newState.vendorRatings).toEqual(action.payload);
  });

  it('should update error state',()=>{
    const action = {
      type: FETCH_VENDOR_PERFORMANCE_FAILED,
      payload: new Error("an error occurred")
    };
    const newState = dashBoardReducer(initialVendorsPerformance, action);
    expect(newState.error).toEqual(action.payload);
  });

});
