
/**
* filters deleted item from state
*
* @param {array} states 
* @param {string} id
*
* @returns {array} -  new state
*/
const filter = (states, id) => (
  states.filter(state => state.id !== id)
);

export default filter;
