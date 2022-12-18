import Album from "../Model/Album.js";
import IBuilder from "./IBuilder.js";


export default class CsvAlbumFileBuilder implements IBuilder<Album[]> {

    public async build(albums: Album[]) {
        
        let csv = "title,artist\n";
    
        for (let album of albums)
            csv += `"${album.name}","${album.artist.name}"\n`;
    
        return csv;
    }

}
