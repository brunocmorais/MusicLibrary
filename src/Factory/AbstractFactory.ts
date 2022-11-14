import AnalyzerFactory from "./AnalyzerFactory.js";
import FileBuilderFactory from "./FileBuilderFactory.js";
import ReaderFactory from "./ReaderFactory.js";
import SearcherFactory from "./SearcherFactory.js";

export default abstract class AbstractFactory {

    public static buildAnalyserFactory = () => new AnalyzerFactory();
    public static buildFileBuilderFactory = () => new FileBuilderFactory();
    public static buildReaderFactory = () => new ReaderFactory();
    public static buildSearcherFactory = () => new SearcherFactory();
}