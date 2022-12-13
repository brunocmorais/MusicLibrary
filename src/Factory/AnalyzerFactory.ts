import { AnalyzerType } from "../Model/AnalyzerType.js";
import YouTubeAnalyzer from "../Analyzers/YouTubeAnalyzer.js";

export default class AnalyzerFactory {

    public build(type: AnalyzerType) {

        switch (type) {
            case AnalyzerType.YouTube:
                return new YouTubeAnalyzer();
            default:
                throw new Error("Analyzer not implemented!");
        }
    }
}