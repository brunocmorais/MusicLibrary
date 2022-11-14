import Library from '../Model/Library.js';
import Song from '../Model/Song.js';
import Artist from '../Model/Artist.js';
import Album from '../Model/Album.js';
import { parseFile } from 'music-metadata';
import IReader from './IReader';
import File from '../Components/File.js';

const acceptedFileTypes = [".m4a", ".mp3", ".ogg", ".wma"];

export default class TagReader implements IReader<Library> {

    public async read(directory: string)  {

        if (!directory)
            throw new Error("Music path is missing!");

        if (!await File.isDirectory(directory))
            throw new Error("Path to read must be a directory!");
        
        const files = await File.listFilesInDirectory(directory);
        const library = new Library();

        for (const file of files) {

            const extension = File.getExtension(file);

            if (acceptedFileTypes.indexOf(extension) < 0)
                continue;

            const info = await parseFile(file);

            const artist = new Artist(info.common.artist ?? "");
            const album = new Album(artist, info.common.album ?? "");
            const song = new Song(album, info.common.title ?? "", info.common.track.no ?? 0,
                Math.floor(info.format.duration) ?? 0, file);

            library.add(song);
        }

        return library;
    }
}