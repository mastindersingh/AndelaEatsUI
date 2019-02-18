/* eslint-disable no-undef */
import inputValidation from "../../helpers/inputValidation";

const FormField = {
  lastName: "Chibueze",
  firstName: "Ayogu",
  errors: {},
  id: '1234566'
};

test('Validate form field', () => {
  expect(inputValidation(FormField)).toEqual({ isEmpty: true, errors: { } });
});
