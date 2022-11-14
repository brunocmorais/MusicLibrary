import Album from '../Model/Album.js';

export default interface ISearcher {
    search(album: Album): Promise<string>;
}
