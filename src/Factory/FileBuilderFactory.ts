import CsvAlbumFileBuilder from "../Builders/CsvAlbumFileBuilder.js";
import CsvLibraryFileBuilder from "../Builders/CsvLibraryFileBuilder.js";
import M3uBuilder from "../Builders/M3uBuilder.js";
import TxtUrlFileBuilder from "../Builders/TxtUrlFileBuilder.js";
import { FileBuilderType } from "../Model/FileBuilderType.js";

export default class FileBuilderFactory {

    public build(type: FileBuilderType) {

        switch (type) {
            case FileBuilderType.LibraryCsv:
                return new CsvLibraryFileBuilder();
            case FileBuilderType.AlbumCsv:
                return new CsvAlbumFileBuilder();
            case FileBuilderType.UrlTxt:
                return new TxtUrlFileBuilder();
            case FileBuilderType.M3u:
                return new M3uBuilder();
            default:
                throw new Error("File builder not implemented!");
        }
    }
}

