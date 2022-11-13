import { ReaderType } from "../Model/ReaderType.js";
import CsvAlbumFileReader from "../Readers/CsvAlbumFileReader.js";
import CsvLibraryFileReader from "../Readers/CsvLibraryFileReader.js";
import TagReader from "../Readers/TagReader.js";

export default class ReaderFactory {

    public static build(type: ReaderType) {

        switch (type) {
            case ReaderType.CsvLibrary:
                return new CsvLibraryFileReader();
            case ReaderType.CsvAlbum:
                return new CsvAlbumFileReader();
            case ReaderType.Tag:
                return new TagReader();
            default:
                throw new Error("Reader not implemented!");
        }
    }
}