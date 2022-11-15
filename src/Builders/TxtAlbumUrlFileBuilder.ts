import AbstractFactory from "../Factory/AbstractFactory.js";
import Album from "../Model/Album.js";
import { SearcherType } from "../Model/SearcherType.js";
import ISearcher from "../Searchers/ISearcher.js";
import IFileBuilder from "./IFileBuilder.js";

export default class TxtAlbumUrlFileBuilder implements IFileBuilder<Album[]> {
    
    private readonly searcher : ISearcher;

    public constructor() {
        this.searcher = AbstractFactory.buildSearcherFactory().build(SearcherType.YouTube);
    }

    public async build(albums: Album[]): Promise<string> {
        
        const urls = new Array<string>();
        
        for (let album of albums) {

            try {
                const url = await this.searcher.searchAlbum(album);

                if (url)
                    urls.push(url);
            } catch (e) {
                console.log("Error getting album: " + e.message);
            }
        }

        return urls.join("\n");
    }
}