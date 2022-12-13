import Album from '../Model/Album.js';
import AnalysisItem from '../Model/AnalysisItem.js';
import Library from '../Model/Library.js';
import Song from '../Model/Song.js';

export default interface IAlbumAnalyzer {
    analyze(library: Library, album : Album): Promise<AnalysisItem[]>;
    getMissingSongs(album: Album, currentSongs: Song[]) : Promise<Song[]>;
    searchSongUrl(song: Song) : Promise<string>;
}