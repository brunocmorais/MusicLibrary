import Library from "../Model/Library.js";
import IBuilder from "./IBuilder.js";

export default class M3uBuilder implements IBuilder<Library> {
    
    public async build(library: Library): Promise<string> {
        
        let content = "#EXTM3U\n\n";

        for (let song of library.songs) {

            content += `#EXTINF:${song.duration},${song.album.artist.name} - ${song.title}\n`;
            content += song.path + "\n";
        }

        return content;
    }
}