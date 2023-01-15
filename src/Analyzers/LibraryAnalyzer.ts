import Album from "../Model/Album.js";
import AnalysisItem from "../Model/AnalysisItem.js";
import Library from "../Model/Library.js";
import Song from "../Model/Song.js";
import IAlbumAnalyzer from "./IAlbumAnalyzer.js";

export default abstract class AlbumAnalyzer implements IAlbumAnalyzer {
    
    public async analyze(library: Library, album : Album) {
        
        const analysisItems = [];

        const currentSongs = library.songs.filter(s => s.album.equals(album));
        const missingSongs = await this.getMissingSongs(album, currentSongs);

        for (const missingSong of missingSongs) {
            const analysisItem = new AnalysisItem(missingSong, missingSong.path);
            analysisItems.push(analysisItem);
        }

        return analysisItems;
    }

    public abstract getMissingSongs(album: Album, currentSongs: Song[]): Promise<Song[]>;
}