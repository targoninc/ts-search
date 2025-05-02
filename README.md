# How to use

## Installing

| Package manager | Command                       |
|-----------------|-------------------------------|
| bun             | `bun i @targoninc/ts-search`  |
| pnpm            | `pnpm i @targoninc/ts-search` |
| npm             | `npm i @targoninc/ts-search`  |

## Example: Searching users

```typescript
import {SearchDb, Entity, SearchTableConfiguration, SearchEngine, SearchRequest} from "@targoninc/ts-search";

const db: SearchDb = ServiceDatabase();

// Define the model of your entity
interface User extends Entity {
    id: number;
    username: string;
    name: string;
    description: string;
    hasAvatar: boolean;
    posts?: any[]; // Not saved on the users table
}

// Configure the search for that entity type
const searchConfig: SearchTableConfiguration<User> = {
    tableName: "service.users",
    type: "user",
    searchableFields: ["username", "name", "description"],
    urlPrefix: "user",
    urlIdField: "username",
    hasImageField: "hasAvatar",
    displayField: "name",
    subtitleFunction: user => user.posts.length + " posts",
    enrichAfterSearchFunction: async (db, users) => {
        // Load additional data that you need which might not be returned initially
        for (const user of users) {
            user.posts = await db.getPostsByUser(user.id);
        }
        return user;
    }
};

// Will load partial results if exact matches are less than limit
const searchResults = await SearchEngine.search(db, searchConfig, <SearchRequest>{    
    query: "someone",
    limit: 10,
    offset: 0
});
```