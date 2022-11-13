import YouTubeSearcher from "../Components/YouTubeSearcher.js";
import Album from "../Model/Album.js";
import IFileBuilder from "./IFileBuilder.js";

export default class TxtUrlFileBuilder implements IFileBuilder<Album[]> {
    
    public async build(albums: Album[]): Promise<string> {
        
        const urls = new Array<string>();
        
        for (let album of albums)
            urls.push(await YouTubeSearcher.search(album));

        return urls.join("\n");
    }
}