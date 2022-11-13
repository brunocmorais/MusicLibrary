import File from "../Components/File.js";
import IReader from "./IReader.js";

export default abstract class CsvFileReader<T> implements IReader<T> {
    
    public abstract read(path: string): Promise<T>;

    protected async getLines(path: string) {
        
        const content = await File.readAsync(path);
        const lines = content.split("\n");
        
        return lines.splice(1, lines.length - 2);
    }

    protected getData(line: string) {
        return line.substring(1, line.length - 1).split('","');
    }
}