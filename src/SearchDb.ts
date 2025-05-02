import {SearchMode} from "./SearchMode";
import {SearchTableConfiguration} from "./SearchTableConfiguration";
import type {SearchRequest} from "./SearchRequest";

export interface SearchDb {
    searchGeneric<T>(searchConfiguration: SearchTableConfiguration<T>, request: SearchRequest, searchMode: SearchMode): Promise<T[]>;
}