/**
 *
 * @param {array} vendor - recipe reduer
 *
 * @param {string} id - recipe id
 *
 * @returns {integer} vendor's Index
 */

const findIndex = (vendors, id) => (
  vendors.findIndex(vendor => vendor.id === id)
);

export default findIndex;
