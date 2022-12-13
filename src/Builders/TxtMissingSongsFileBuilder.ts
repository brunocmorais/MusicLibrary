import AnalysisResult from "../Model/AnalysisResult.js";
import IFileBuilder from "./IFileBuilder.js";

export default class TxtMissingSongsFileBuilder implements IFileBuilder<AnalysisResult> {
    
    public async build(source: AnalysisResult): Promise<string> {
        
        let result = "";

        for (const item of source.items) {

            result += `#${item.song.title} - ${item.song.album.name} - ${item.song.album.artist.name}\n`;
            result += `${item.url}\n`;
        }

        return result;
    }

}