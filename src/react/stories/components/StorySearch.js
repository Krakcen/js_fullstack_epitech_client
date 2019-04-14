import { Input } from 'semantic-ui-react';
import styled from 'styled-components';

const StorySearch = styled(Input)`
  &&& {
    background-color: transparent;
    border-radius: 25px !important;
    border: 3px solid white;
    color: white !important;
  }

  &&& > input {
    background-color: transparent;
    border: none;
    color: white;
  }
  &&& > input:hover {
    background-color: transparent;
    border: none;
    color: white;
  }
  &&& > input:focus {
    background-color: transparent;
    border: none;
    color: white;
  }
  &&& > input::placeholder {
    color: rgb(239, 239, 239);
  }
  &&& > input:focus::placeholder {
    color: rgb(239, 239, 239);
  }
`;

export default StorySearch;
