import React, { FC } from "react";
import styled from "@emotion/styled";
import color from "../styles/color";
import { observer } from "mobx-react-lite";
import {QueryResult, useDictionaryStore} from "../store/DictionaryStore";

const SelectorContainer = styled.div`
  display: flex;
  width: 100%;
  justify-content: space-between;
  padding: 12px;
  border: 2px solid ${color.secondary};
  border-radius: 5px;

  > ul {
    width: 100%;
    padding-left: 32px;
    height: 600px;
    overflow-y: scroll;
    span {
      font-weight: bold;
    }
    > li {
      font-size: 16px;
    }
  }
`;

const QueryResultVisualizer: FC = observer(() => {
  const store = useDictionaryStore();
  const results: QueryResult = store.results;

  return (
    <SelectorContainer>
      <ul>
        <h3>
          Found: (<span>{results.count}</span>)
        </h3>
        {results.words.map((word, index) => (
          <li key={word+index}>{word}</li>
        ))}
      </ul>
    </SelectorContainer>
  );
});

export default QueryResultVisualizer;
