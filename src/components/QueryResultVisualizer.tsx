import React, { FC } from "react";
import styled from "@emotion/styled";
import color from "../styles/color";
import { observer } from "mobx-react-lite";
import {
  Mode,
  QueryResult,
  useDictionaryStore,
} from "../store/DictionaryStore";

const modes: Array<{
  value: Mode;
  description: string;
  label: string;
  highlighter?: Function;
}> = [
  {
    value: "starting",
    description: "Words starting with the letter",
    label: "Starting With",
  },
  {
    value: "total",
    description: "Words that have matching",
    label: "Total Matching Count",
  },
  {
    value: "ending",
    description: "Words ending with the letter",
    label: "Ending With",
  },
  {
    value: "conjunctions",
    description: "",
    label: "Conjunctions",
  },
];

const SelectorContainer = styled.div`
  display: flex;
  width: 100%;
  justify-content: space-between;
  padding: 12px;
  border: 2px solid ${color.secondary};
  border-radius: 5px;

  > ul:first-child {
    width: 33%;
    > li {
      border-top: 2px solid ${color.main};
      padding: 12px;
      transition: background-color 0.3s ease-in-out;
      &:hover {
        cursor: pointer;
      }
    }
    > li:last-child {
      border-bottom: 2px solid ${color.main};
    }
  }

  > ul:last-child {
    width: 66%;
    padding-left: 32px;
    height: 600px;
    overflow: scroll;
    span {
      background-color: ${color.highlight};
    }
    > li {
      font-size: 16px;
    }
  }

  > ul {
    list-style-type: none;
    padding: 0;
    h3 {
      margin-bottom: 24px;
    }
  }
`;

const QueryResultVisualizer: FC = observer(() => {
  const store = useDictionaryStore();
  const results: QueryResult = store.results;

  return (
    <SelectorContainer>
      <ul>
        <h3>Mode</h3>
        {modes.map((mode) => (
          <li
            key={mode.value}
            style={{
              backgroundColor:
                mode.value === store.mode ? color.main : "transparent",
            }}
            onClick={() => {
              store.mode = mode.value;
            }}
          >
            {mode.label}
          </li>
        ))}
      </ul>
      <ul>
        <h3>
          Results: (<span>{results.count}</span>)
        </h3>
        {results.words.map((word, index) => (
          <li key={word+index}>{word}</li>
        ))}
      </ul>
    </SelectorContainer>
  );
});

export default QueryResultVisualizer;
