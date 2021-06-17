import React from "react";
import { useDictionaryStore } from "../store/DictionaryStore";
import { observer } from "mobx-react-lite";
import styled from "@emotion/styled";
import color from "../styles/color";

const InputContainer = styled.div`
  width: 100%;
  padding: 16px 0;
`;

const Input = styled.input`
  border-radius: 5px;
  width: 100%;
  height: 40px;
  font-size: 16px;
  padding: 0 10px;
  outline: none;
  border: 2px solid ${color.secondary};
  &:focus {
    border-color: ${color.highlight};
  }
`;

const QueryInput = observer(() => {
  let store = useDictionaryStore();
  return (
    <InputContainer>
      <Input
        type="text"
        value={store.query}
        placeholder="Type your query here..."
        onChange={({ target }) => {
          store.setQuery = target.value;
        }}
      />
    </InputContainer>
  );
});

export default QueryInput;
