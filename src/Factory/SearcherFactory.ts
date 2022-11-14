import { SearcherType } from "../Model/SearcherType.js";
import ISearcher from "../Searchers/ISearcher.js";
import YouTubeSearcher from "../Searchers/YouTubeSearcher.js";

export default class SearcherFactory {

    public build(type: SearcherType) : ISearcher {

        switch (type) {
            case SearcherType.YouTube:
                return new YouTubeSearcher();
            default:
                throw new Error("Searcher not implemented!");
        }
    }
}