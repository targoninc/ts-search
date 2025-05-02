import {SearchDb} from "./SearchDb.ts";

export interface SearchTableConfiguration<T> {
    tableName: string;
    type: string;
    searchableFields: Array<keyof T>;
    urlPrefix: string;
    urlIdField: keyof T;
    hasImageField: keyof T;
    displayField: keyof T;
    subtitleFunction: (t: T) => string;
    enrichAfterSearchFunction?: (db: SearchDb, t: T[]) => Promise<T[]>;
}