import {SearchMode} from "./SearchMode.js";
import {SearchTableConfiguration} from "./SearchTableConfiguration.js";
import type {SearchRequest} from "./SearchRequest.ts";

export interface SearchDb {
    searchGeneric<T>(searchConfiguration: SearchTableConfiguration<T>, request: SearchRequest, searchMode: SearchMode): Promise<T[]>;
}