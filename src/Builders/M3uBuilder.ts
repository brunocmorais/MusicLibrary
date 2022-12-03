import Library from "../Model/Library.js";
import IFileBuilder from "./IFileBuilder.js";

export default class M3uBuilder implements IFileBuilder<Library> {
    
    public async build(library: Library): Promise<string> {
        
        let content = "#EXTM3U\n\n";

        for (let song of library.songs) {

            content += `#EXTINF:${song.duration},${song.album.artist.name} - ${song.title}\n`;
            content += song.path + "\n";
        }

        return content;
    }
}