import Album from '../Model/Album.js';
import Song from '../Model/Song.js';

export default interface ISearcher {
    searchAlbum(album: Album): Promise<string>;
    searchSong(song: Song): Promise<string>;
}
