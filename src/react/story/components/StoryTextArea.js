import { TextArea } from 'semantic-ui-react';
import styled from 'styled-components';

const StoryTextArea = styled(TextArea)`
  &&& {
    background-color: transparent;
    border-radius: 20px;
    border: 3px solid white;
    font-size: 1.4rem;
    padding: 20px;
    color: white;
  }
  &&&:focus {
    background-color: transparent;
    border-radius: 20px;
    border: 3px solid white;
    font-size: 1.4rem;
    padding: 20px;
    color: white;
  }
  &&&::placeholder {
    color: rgb(239, 239, 239);
  }
  &&&:focus::placeholder {
    color: rgb(239, 239, 239);
  }
`;

export default StoryTextArea;
