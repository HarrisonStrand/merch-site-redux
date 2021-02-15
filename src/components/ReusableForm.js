import React from "react";
import PropTypes from "prop-types";

function ReusableForm(props) {
  return (
    <React.Fragment>
      <form onSubmit={props.formSubmissionHandler}>
        <label for="category">Choose a Category:</label>
          <select name="category">
            <option value="SHIRT">Shirt</option>
            <option value="POSTER">Poster</option>
            <option value="VINYL">Vinyl</option>
          </select>
        <input
          type='text'
          name='name'
					placeholder='Name'/>
        <input
          type='text'
          name='description'
					placeholder='Description'/>
        <input
          type='number'
          name='quantity'
					placeholder='Quantity'/>
        <button type='submit'>{props.buttonText}</button>
      </form>
    </React.Fragment>
  );
}

ReusableForm.propTypes = {
  formSubmissionHandler: PropTypes.func,
  buttonText: PropTypes.string
};

export default ReusableForm;