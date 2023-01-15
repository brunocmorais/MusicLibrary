import AbstractFactory from "../Factory/AbstractFactory.js";
import Library from "../Model/Library.js";
import { SearcherType } from "../Model/SearcherType.js";
import ISearcher from "../Searchers/ISearcher.js";
import IBuilder from "./IBuilder.js";

export default class TxtMusicUrlFileBuilder implements IBuilder<Library> {
    
    private readonly searcher : ISearcher;

    public constructor() {
        this.searcher = AbstractFactory.buildSearcherFactory().build(SearcherType.YouTube);
    }

    public async build(library: Library): Promise<string> {
        
        const urls = new Array<string>();
        
        for (let song of library.songs) {

            console.info(`Getting info from song '${song.title} - ${song.album.artist.name}'.`);

            try {
                const url = await this.searcher.searchSong(song);

                if (url)
                    urls.push(url);
            } catch (e) {
                console.error("Error getting song: " + (e as Error).message);
            }
        }

        return urls.join("\n");
    }
}