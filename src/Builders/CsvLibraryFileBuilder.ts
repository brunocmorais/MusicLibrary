import Library from "../Model/Library.js";
import IFileBuilder from "./IFileBuilder.js";

export default class CsvLibraryFileBuilder implements IFileBuilder<Library> {
    
    public async build(library: Library) {
        
        let csv = "title,artist,album,track,duration,path,isrc\n";
    
        for (let song of library.songs)
            csv += `"${song.title}","${song.album.artist.name}","${song.album.name}","${song.track}","${song.duration}","${song.path}","${song.isrc}"\n`;
    
        return csv;
    }

}