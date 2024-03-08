// App.js
import React, { useState } from "react";
import { SearchForm } from "./components/SearchFrom/SearchForm.tsx";
import { SearchContext } from "./components/SearchResults/SearchContext";
import { SearchResults } from "./components/SearchResults/SearchResults";
import { mockUsers } from "./mockUsers.ts";

export default function App() {
    const [users, setUsers] = useState(mockUsers);

    return (
        <SearchContext.Provider value={{ users, setUsers }}>
            <SearchForm />
            <SearchResults />
        </SearchContext.Provider>
    );
}
