import AnalysisItem from "./AnalysisItem.js";

export default class AnalysisResult {

    private readonly _items = new Array<AnalysisItem>();

    public get items() {
        return [...this._items];
    }

    public addItems(items : AnalysisItem[]) {

        for (const item of items)
            this._items.push(item);
    }
}

