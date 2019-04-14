import { Button } from 'semantic-ui-react';
import styled from 'styled-components';
import Constants from './Constants';

const StoryButton = styled(Button)`
  background-color: ${props => (props.primary ? Constants.primaryColor : Constants.secondaryColor)} !important;
  border-radius: 25px !important;
  color: white !important;
  :hover {
    background-color: ${props => (props.primary ? Constants.primaryHover : Constants.secondaryHover)} !important;
  }
`;

export default StoryButton;
