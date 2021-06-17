import { makeAutoObservable } from "mobx";
import { createContext, useContext, FC } from "react";

// Dictionary includes 10000 most used US English words
import dictionary from "../api/api.json";

export type QueryResult = {
  words: Array<string>;
  count: number;
};

export type Mode = "starting" | "ending" | "total" | "conjunctions";

class DictionaryStore {
  readonly dictionary: Array<string> = dictionary;
  public query: string = "";
  public mode: Mode = "starting";

  constructor() {
    this.dictionary.sort();
    makeAutoObservable(this);
  }

  public set setQuery(query: string) {
    this.query = query;
  }

  public set setMode(mode: Mode) {
    this.mode = mode;
  }

  private get wordsStartingWithLetter(): QueryResult {
    const words = dictionary.filter(
      (word) => word.slice(0, this.query.length) === this.query
    );
    return { words, count: words.length };
  }

  private get wordsEndingWithLetter(): QueryResult {
    const words = dictionary.filter(
      (word) => word.slice(word.length - this.query.length) === this.query
    );
    return { words, count: words.length };
  }

  private get totalCount(): QueryResult {
    const words = dictionary.filter((word) => word.includes(this.query));
    const count = words.reduce((count, word) => {
      return count + word.split(this.query).length - 1;
    }, 0);
    return { words, count };
  }

  private get conjunctions(): QueryResult {
    const words = dictionary.filter((word) =>
      word.includes(this.query + this.query)
    );
    return { words, count: words.length };
  }

  public get results(): QueryResult {
    if (this.query !== "") {
      switch (this.mode) {
        case "conjunctions":
          return this.conjunctions;
        case "ending":
          return this.wordsEndingWithLetter;
        case "starting":
          return this.wordsStartingWithLetter;
        case "total":
          return this.totalCount;
        default:
          return { words: [], count: 0 };
      }
    } else {
      return { words: [], count: 0 };
    }
  }
}

const DictionaryStoreContext = createContext<DictionaryStore>(
  new DictionaryStore()
);

const DictionaryStoreProvider: FC<{ store: DictionaryStore }> = ({
  store,
  children,
}) => {
  return (
    <DictionaryStoreContext.Provider value={store}>
      {children}
    </DictionaryStoreContext.Provider>
  );
};

const useDictionaryStore = () => {
  return useContext(DictionaryStoreContext);
};

export { DictionaryStoreProvider, useDictionaryStore, DictionaryStore };
