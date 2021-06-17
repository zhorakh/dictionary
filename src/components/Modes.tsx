import React from "react";
import {Mode, useDictionaryStore} from "../store/DictionaryStore";
import { observer } from "mobx-react-lite";
import styled from "@emotion/styled";
import color from "../styles/color";

const ModeContainer = styled.div`
  display: flex;
  padding: 16px 0;
`;

const ModeTitle = styled.h3`

`;

const ModeItem = styled.div`
  cursor: pointer;
  margin: 0 8px;
  padding: 8px;
`;

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

const Modes = observer(() => {
    let store = useDictionaryStore();
    return (
        <>
            <ModeTitle>Choose Mode</ModeTitle>
            <ModeContainer>
                {modes.map((mode, index) => (
                    <ModeItem
                        key={index}
                        style={{
                            backgroundColor:
                                mode.value === store.mode ? color.main : "transparent",
                        }}
                        onClick={() => store.mode = mode.value}
                    >
                        {mode.label}
                    </ModeItem>
                ))}
            </ModeContainer>
        </>
    );
});

export default Modes;
