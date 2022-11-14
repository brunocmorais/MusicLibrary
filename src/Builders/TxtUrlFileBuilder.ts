import { stdout } from "process";
import AbstractFactory from "../Factory/AbstractFactory.js";
import Album from "../Model/Album.js";
import { SearcherType } from "../Model/SearcherType.js";
import ISearcher from "../Searchers/ISearcher.js";
import IFileBuilder from "./IFileBuilder.js";

export default class TxtUrlFileBuilder implements IFileBuilder<Album[]> {
    
    private readonly searcher : ISearcher;

    public constructor() {
        this.searcher = AbstractFactory.buildSearcherFactory().build(SearcherType.YouTube);
    }

    public async build(albums: Album[]): Promise<string> {
        
        const urls = new Array<string>();
        
        for (let album of albums) {

            const url = await this.searcher.search(album);

            if (url)
                urls.push(url);
        }

        return urls.join("\n");
    }
}