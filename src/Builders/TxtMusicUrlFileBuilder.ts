import AbstractFactory from "../Factory/AbstractFactory.js";
import Library from "../Model/Library.js";
import { SearcherType } from "../Model/SearcherType.js";
import ISearcher from "../Searchers/ISearcher.js";
import IFileBuilder from "./IFileBuilder.js";

export default class TxtMusicUrlFileBuilder implements IFileBuilder<Library> {
    
    private readonly searcher : ISearcher;

    public constructor() {
        this.searcher = AbstractFactory.buildSearcherFactory().build(SearcherType.YouTube);
    }

    public async build(library: Library): Promise<string> {
        
        const urls = new Array<string>();
        
        for (let song of library.songs) {

            try {
                const url = await this.searcher.searchSong(song);

                if (url)
                    urls.push(url);
            } catch (e) {
                console.log("Error getting song: " + e.message);
            }
        }

        return urls.join("\n");
    }
}