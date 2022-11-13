import Album from "../Model/Album.js";
import Library from "../Model/Library.js";
import ILibraryAnalyzer from "./ILibraryAnalyzer.js";

export default abstract class LibraryAnalyzer implements ILibraryAnalyzer {
    
    public async analyze(library: Library) {
        
        const analysis = new Array<string>();

        for (let album of library.albums) {
            const items = library.songs.filter(x => x.album.equals(album) && x.album.artist.equals(album.artist));
            const count = await this.getTrackCount(album);

            if (count == 0){
                analysis.push(`Não foi possível obter informações do ${album.name} - ${album.artist.name}!`);
                continue;
            }

            for (let i = 1; i <= count; i++) {
                if (items.filter(x => x.track == i).length == 0)
                    analysis.push(`${album} - ${album.artist} faltando a faixa ${i}!`);
            }
        }

        return analysis;
    }

    public abstract getTrackCount(album: Album);
}