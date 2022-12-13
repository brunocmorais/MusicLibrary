import { argv, stdout } from "process";
import File from "./File.js";
import { AnalyzerType } from "../Model/AnalyzerType.js";
import Library from "../Model/Library.js";
import TagReader from "../Readers/TagReader.js";
import { ReaderType } from "../Model/ReaderType.js";
import { FileBuilderType } from "../Model/FileBuilderType.js";
import CsvAlbumFileBuilder from "../Builders/CsvAlbumFileBuilder.js";
import CsvLibraryFileReader from "../Readers/CsvLibraryFileReader.js";
import CsvLibraryFileBuilder from "../Builders/CsvLibraryFileBuilder.js";
import TxtAlbumUrlFileBuilder from "../Builders/TxtAlbumUrlFileBuilder.js";
import M3uBuilder from "../Builders/M3uBuilder.js";
import AbstractFactory from "../Factory/AbstractFactory.js";
import Album from "../Model/Album.js";
import IReader from "../Readers/IReader.js";
import IFileBuilder from "../Builders/IFileBuilder.js";
import TxtMusicUrlFileBuilder from "../Builders/TxtMusicUrlFileBuilder.js";
import TxtMissingSongsFileBuilder from "../Builders/TxtMissingSongsFileBuilder.js";
import AnalysisResult from "../Model/AnalysisResult.js";

export default class CLI {

    public static async startProcess() {

        try {
            const command = argv[2];

            switch (command) {
                case "csvLibrary":
                    await this.createCsv(FileBuilderType.LibraryCsv);
                    break;
                case "csvAlbums":
                    await this.createCsv(FileBuilderType.AlbumCsv);
                    break;
                case "analyze":
                    await this.analyze();
                    break;
                case "search":
                    await this.search();
                    break;
                case "export":
                    await this.export();
                    break;
                default:
                    this.printHelp();
                    break;
            }   
        } catch (e) {
            const message = (e as Error).message;
            stdout.write("Error: " + message + "\n");
        }
    }

    private static printHelp() {
        stdout.write("\nUsage: musiclibrary [COMMAND] [PARAMETERS]\n\n");
        stdout.write("Available commands:\n\n");
        stdout.write("csvLibrary <musicPath> <fileNameToExportCsv>\n");
        stdout.write("csvAlbums <musicPath> <fileNameToExportCsv>\n");
        stdout.write("analyze <libraryPath> <fileNameToExportMissingSongsTxt>\n");
        stdout.write("search <csvPath> <fileNameToExportTxt>\n");
        stdout.write("export <libraryPath> <fileNameToExportM3u>\n\n");
    }

    private static async createCsv(type: FileBuilderType) {

        const pathToRead = argv[3];
        const pathToWrite = argv[4];
        const tagReader = AbstractFactory.buildReaderFactory().build(ReaderType.Tag);
        const library = await tagReader.read(pathToRead) as Library;
        let csv: string;

        if (type != FileBuilderType.AlbumCsv && type != FileBuilderType.LibraryCsv)
            throw new Error("Invalid file builder type for this command!");

        const builder = AbstractFactory.buildFileBuilderFactory().build(type);

        if (builder instanceof CsvAlbumFileBuilder)
            csv = await (builder as CsvAlbumFileBuilder).build(library.albums);
        else if (builder instanceof CsvLibraryFileBuilder)
            csv = await (builder as CsvLibraryFileBuilder).build(library);

        try {
            await File.writeAsync(pathToWrite, csv);
        } catch (e) {
            throw new Error("Could not write file!");
        }

        stdout.write(`File '${pathToWrite}' created successfully!\n`);
    }

    private static async analyze() {
        
        const pathToRead = argv[3];
        const pathToWrite = argv[4];
        const library = await this.getLibrary(pathToRead);

        const analyzer = AbstractFactory.buildAnalyserFactory().build(AnalyzerType.YouTube);

        stdout.write("Library analysis for missing songs started, this can take several minutes.\n");

        const analysisResult = new AnalysisResult();
        const albums = library.albums;
        const txtBuilder = AbstractFactory.buildFileBuilderFactory().build(FileBuilderType.MissingSongsTxt);

        for (let i = 0; i < albums.length; i++) {
            
            stdout.write(`Analysis of album ${i + 1} in ${albums.length}.\n`);
            analysisResult.addItems(await analyzer.analyze(library, albums[i]));
            const content = await (txtBuilder as TxtMissingSongsFileBuilder).build(analysisResult);

            try {
                await File.writeAsync(pathToWrite, content);
            } catch (e) {
                throw new Error("Could not write file!");
            }
        }

        stdout.write("Library analysis finished!\n");
        stdout.write(`File '${pathToWrite}' created successfully!\n`);
    }

    private static async getLibrary(path: string) {

        let reader : IReader<any>;
        const readerFactory = AbstractFactory.buildReaderFactory();

        if (await File.isDirectory(path))
            reader = readerFactory.build(ReaderType.Tag) as TagReader;
        else if (await File.isFile(path))
            reader = readerFactory.build(ReaderType.CsvLibrary) as CsvLibraryFileReader;
        else
            throw new Error("Could not create library from given path!");

        return await reader.read(path);
    }

    private static async search() {

        const csvPath = argv[3];
        const txtPath = argv[4];
        let builder: IFileBuilder<any>;
        let reader : IReader<any>; 
        let content: string;
        
        try {
            builder = AbstractFactory.buildFileBuilderFactory()
                .build(FileBuilderType.UrlAlbumTxt) as TxtAlbumUrlFileBuilder;
            reader = AbstractFactory.buildReaderFactory().build(ReaderType.CsvAlbum); 
            const albums = await reader.read(csvPath) as Album[];
            content = await builder.build(albums);
        } catch (error) { // could not read csvAlbum, maybe it is csvLibrary
            builder = AbstractFactory.buildFileBuilderFactory()
                .build(FileBuilderType.UrlLibraryTxt) as TxtMusicUrlFileBuilder;
            reader = AbstractFactory.buildReaderFactory().build(ReaderType.CsvLibrary); 
            const library = await reader.read(csvPath) as Library;
            content = await builder.build(library);
        }
        
        await File.writeAsync(txtPath, content);

        stdout.write(`File '${txtPath}' created successfully!\n`);
    }

    private static async export() {
        
        const libraryPath = argv[3];
        const m3uPath = argv[4];
        const library = await this.getLibrary(libraryPath);
        const builder = AbstractFactory.buildFileBuilderFactory().build(FileBuilderType.M3u) as M3uBuilder;
        const content = await builder.build(library);
        
        await File.writeAsync(m3uPath, content);

        stdout.write(`File '${m3uPath}' created successfully!\n`);
    }   
}