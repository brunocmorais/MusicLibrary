import Album from '../Model/Album.js';
import Library from '../Model/Library.js';

export default interface ILibraryAnalyzer {
    analyze(library: Library): Promise<string[]>;
    getTrackCount(album: Album) : Promise<number>;
}
