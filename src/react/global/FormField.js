import React from 'react';
import PropTypes from 'prop-types';
import { Form } from 'semantic-ui-react';

const FormField = ({ input, label, type }) => (
  <Form.Field style={{ marginBottom: '15px' }}>
    <input
      style={{ borderRadius: '90px', backgroundColor: 'rgb(242, 242, 242)' }}
      {...input}
      placeholder={`${label}*`}
      type={type}
    />
  </Form.Field>
);
FormField.propTypes = {
  input: PropTypes.shape({
    name: PropTypes.string,
    onBlur: PropTypes.func,
    onChange: PropTypes.func,
    onDragStart: PropTypes.func,
    onDrop: PropTypes.func,
  }).isRequired,
  label: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired,
};

export default FormField;
