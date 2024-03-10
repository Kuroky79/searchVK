import React, {Suspense, useState} from "react";
import { SearchForm } from "./shared/components/SearchFrom/SearchForm.tsx";
import { SearchContext } from "./shared/components/SearchResults/SearchContext";
import { SearchResults } from "./shared/components/SearchResults/SearchResults";
import { mockUsers } from "./mockUsers.ts";
import PageLoader from "./shared/components/PageLoader/PageLoader.tsx";

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
