import CsvAlbumFileBuilder from "../Builders/CsvAlbumFileBuilder.js";
import CsvLibraryFileBuilder from "../Builders/CsvLibraryFileBuilder.js";
import M3uBuilder from "../Builders/M3uBuilder.js";
import TxtAlbumUrlFileBuilder from "../Builders/TxtAlbumUrlFileBuilder.js";
import TxtMissingSongsFileBuilder from "../Builders/TxtMissingSongsFileBuilder.js";
import TxtMusicUrlFileBuilder from "../Builders/TxtMusicUrlFileBuilder.js";
import { FileBuilderType } from "../Model/FileBuilderType.js";

export default class FileBuilderFactory {

    public build(type: FileBuilderType) {

        switch (type) {
            case FileBuilderType.LibraryCsv:
                return new CsvLibraryFileBuilder();
            case FileBuilderType.AlbumCsv:
                return new CsvAlbumFileBuilder();
            case FileBuilderType.UrlLibraryTxt:
                return new TxtMusicUrlFileBuilder();
            case FileBuilderType.UrlAlbumTxt:
                return new TxtAlbumUrlFileBuilder();
            case FileBuilderType.M3u:
                return new M3uBuilder();
            case FileBuilderType.MissingSongsTxt:
                return new TxtMissingSongsFileBuilder();
            default:
                throw new Error("File builder not implemented!");
        }
    }
}

