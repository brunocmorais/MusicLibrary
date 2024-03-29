import AbstractFactory from "../Factory/AbstractFactory.js";
import Album from "../Model/Album.js";
import { SearcherType } from "../Model/SearcherType.js";
import ISearcher from "../Searchers/ISearcher.js";
import IBuilder from "./IBuilder.js";

export default class TxtAlbumUrlFileBuilder implements IBuilder<Album[]> {
    
    private readonly searcher : ISearcher;

    public constructor() {
        this.searcher = AbstractFactory.buildSearcherFactory().build(SearcherType.YouTube);
    }

    public async build(albums: Album[]): Promise<string> {
        
        const urls = new Array<string>();
        
        for (let album of albums) {

            console.info(`Searching album ${album.name} - ${album.artist.name}`);

            try {
                const url = await this.searcher.searchAlbum(album);

                if (url)
                    urls.push(url);
            } catch (e) {
                console.error("Error getting album: " + (e as Error).message);
            }
        }

        return urls.join("\n");
    }
}