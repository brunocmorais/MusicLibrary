import Album from "../Model/Album.js";
import Artist from "../Model/Artist.js";
import CsvFileReader from "./CsvFileReader.js";

export default class CsvAlbumFileReader extends CsvFileReader<Album[]> {
    
    public async read(path: string) {
        
        const lines = await this.getLines(path);
        const albums = new Array<Album>();

        for (const line of lines) {

            const data = this.getData(line);
            const artist = new Artist(data[1]);
            const album = new Album(artist, data[0]);

            albums.push(album);
        }

        return albums;
    }

}