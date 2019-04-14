import React from 'react';
import PropTypes from 'prop-types';
import { Form } from 'semantic-ui-react';
import styled from 'styled-components';
import { StoryTextArea } from '../../story/components';

const Input = styled.input`
  &&&& {
    background-color: transparent;
    border-radius: 90px;
    border: 3px solid white;
    font-size: 1.4rem;
    padding: 20px;
    color: white;
  }
  &&&&:focus {
    background-color: transparent;
    border-radius: 90px;
    border: 3px solid white;
    font-size: 1.4rem;
    padding: 20px;
    color: white;
  }
  &&&&::placeholder {
    color: rgb(239, 239, 239);
  }
  &&&&:focus::placeholder {
    color: rgb(239, 239, 239);
  }
`;

const LabelHeader = styled.h2`
  &&&& {
    color: white;
  }
`;

export const FormFieldTextArea = ({ input, label, type }) => (
  <Form.Field style={{ marginBottom: '60px' }}>
    <LabelHeader as="h1">{label}</LabelHeader>
    <StoryTextArea {...input} placeholder={label} type={type} />
  </Form.Field>
);
FormFieldTextArea.propTypes = {
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

export const FormFieldInput = ({
  input, label, type,
}) => (
  <Form.Field style={{ marginBottom: '60px' }}>
    <LabelHeader as="h1">{label}</LabelHeader>
    <Input {...input} placeholder={label} type={type} />
  </Form.Field>
);
FormFieldInput.propTypes = {
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
