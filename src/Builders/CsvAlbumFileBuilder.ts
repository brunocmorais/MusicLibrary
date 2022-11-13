import Album from "../Model/Album.js";
import IFileBuilder from "./IFileBuilder.js";


export default class CsvAlbumFileBuilder implements IFileBuilder<Album[]> {

    public async build(albums: Album[]) {
        
        let csv = "artist,album\n";
    
        for (let album of albums)
            csv += `"${album.artist.name}","${album.name}"\n`;
    
        return csv;
    }

}
