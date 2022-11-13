import { argv, stdout } from "process";
import AnalyzerFactory from "../Factory/AnalyzerFactory.js";
import { AnalyzerType } from "../Model/AnalyzerType.js";
import Library from "../Model/Library.js";
import File from "./File.js";
import TagReader from "../Readers/TagReader.js";
import ReaderFactory from "../Factory/ReaderFactory.js";
import { ReaderType } from "../Model/ReaderType.js";
import { FileBuilderType } from "../Model/FileBuilderType.js";
import CsvAlbumFileBuilder from "../Builders/CsvAlbumFileBuilder.js";
import FileBuilderFactory from "../Factory/FileBuilderFactory.js";
import CsvLibraryFileReader from "../Readers/CsvLibraryFileReader.js";
import CsvLibraryFileBuilder from "../Builders/CsvLibraryFileBuilder.js";
import TxtUrlFileBuilder from "../Builders/TxtUrlFileBuilder.js";
import M3uBuilder from "../Builders/M3uBuilder.js";

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
            const stack = (e as Error).stack;
            stdout.write(stack + "\n");
        }
    }

    private static printHelp() {
        stdout.write("\nUsage: musiclibrary [COMMAND] [PARAMETERS]\n\n");
        stdout.write("Available commands:\n\n");
        stdout.write("csvLibrary <musicPath> <fileNameToExportCsv>\n");
        stdout.write("csvAlbums <musicPath> <fileNameToExportCsv>\n");
        stdout.write("analyse <analyzer (MusicBrainz or YouTube)> <libraryPath>\n");
        stdout.write("search <libraryPath> <fileNameToExportTxt>\n");
        stdout.write("export <libraryPath> <fileNameToExportM3u>\n\n");
    }

    private static async createCsv(type: FileBuilderType) {

        const pathToRead = argv[3];
        const pathToWrite = argv[4];
        const tagReader = ReaderFactory.build(ReaderType.Tag);
        const library = await tagReader.read(pathToRead) as Library;
        let csv: string;

        if (type != FileBuilderType.AlbumCsv && type != FileBuilderType.LibraryCsv)
            throw new Error("Invalid file builder type for this command!");

        const builder = FileBuilderFactory.build(type);

        if (type === FileBuilderType.AlbumCsv)
            csv = await (builder as CsvAlbumFileBuilder).build(library.albums);
        else if (type === FileBuilderType.LibraryCsv)
            csv = await (builder as CsvLibraryFileBuilder).build(library);

        try {
            await File.writeAsync(pathToWrite, csv);
        } catch (e) {
            throw new Error("Could not write file!");
        }

        stdout.write(`File '${pathToWrite}' created successfully!\n`);
    }

    private static async analyze() {
        
        const analyzerType = AnalyzerType[argv[3]];
        const path = argv[4];
        const library = await this.getLibrary(path);

        const analyzer = AnalyzerFactory.build(analyzerType);
        const analysis = await analyzer.analyze(library);

        for (const line of analysis)
            stdout.write(line + "\n");

        stdout.write("Library analysis finished!\n");
    }

    private static async getLibrary(path: string) {

        let reader : TagReader | CsvLibraryFileReader;

        if (await File.isDirectory(path))
            reader = ReaderFactory.build(ReaderType.Tag) as TagReader;
        else if (await File.isFile(path))
            reader = ReaderFactory.build(ReaderType.CsvLibrary) as CsvLibraryFileReader;
        else
            throw new Error("Could not create library from given path!");

        return await reader.read(path);
    }

    private static async search() {

        const libraryPath = argv[3];
        const txtPath = argv[4];
        const library = await this.getLibrary(libraryPath);
        const builder = FileBuilderFactory.build(FileBuilderType.UrlTxt) as TxtUrlFileBuilder;
        const content = await builder.build(library.albums);
        await File.writeAsync(txtPath, content);

        stdout.write(`File '${txtPath}' created successfully!\n`);
    }

    private static async export() {
        
        const libraryPath = argv[3];
        const m3uPath = argv[4];
        const library = await this.getLibrary(libraryPath);
        const builder = FileBuilderFactory.build(FileBuilderType.M3u) as M3uBuilder;
        const content = await builder.build(library);
        await File.writeAsync(m3uPath, content);

        stdout.write(`File '${m3uPath}' created successfully!\n`);
    }   
}