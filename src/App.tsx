import React, { FC, ReactElement } from "react";
import QueryInput from "./components/QueryInput";
import { Header, MainContainer } from "./components/StyledComponents";
import {
  DictionaryStoreProvider,
  DictionaryStore,
} from "./store/DictionaryStore";
import QueryResultVisualizer from "./components/QueryResultVisualizer";

const store = new DictionaryStore();

const App: FC = (): ReactElement => {
  return (
    <>
      <Header>
        <h1>Dictionary</h1>
      </Header>
      <MainContainer>
        <DictionaryStoreProvider store={store}>
          <QueryInput />
          <QueryResultVisualizer />
        </DictionaryStoreProvider>
      </MainContainer>
    </>
  );
};

export default App;
