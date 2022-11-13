import Album from "../Model/Album.js";
import Artist from "../Model/Artist.js";
import Library from "../Model/Library.js";
import Song from "../Model/Song.js";
import CsvFileReader from "./CsvFileReader.js";

export default class CsvLibraryFileReader extends CsvFileReader<Library> {
    
    public async read(path: string) {
        
        const lines = await this.getLines(path);
        const library = new Library();

        for (const line of lines) {

            const data = this.getData(line);
            const artist = new Artist(data[1]);
            const album = new Album(artist, data[2]);
            const song = new Song(album, data[0], parseInt("0" + data[3]), parseInt("0" + data[4]), data[5]);

            library.add(song);
        }

        return library;
    }
    
}