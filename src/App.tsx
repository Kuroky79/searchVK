// App.js
import React, {Suspense, useState} from "react";
import { SearchForm } from "./components/SearchFrom/SearchForm.tsx";
import { SearchContext } from "./components/SearchResults/SearchContext";
import { SearchResults } from "./components/SearchResults/SearchResults";
import { mockUsers } from "./mockUsers.ts";
import PageLoader from "./components/PageLoader/PageLoader.tsx";

export default function App() {
    const [users, setUsers] = useState([]);

    return (
            <SearchContext.Provider value={{ users, setUsers }}>
                <Suspense fallback={<PageLoader />}>
                    <SearchForm />
                    <SearchResults />
                </Suspense>
            </SearchContext.Provider>

    );
}
