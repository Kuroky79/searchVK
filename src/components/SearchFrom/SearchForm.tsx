import React, { useState, useContext } from "react";
import { SearchContext } from "../SearchResults/SearchContext";
import './styles.css'
export function SearchForm() {
    const [query, setQuery] = useState("");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const [userLastNames, setUserLastNames] = useState<string[]>([]);
    const { setUsers } = useContext(SearchContext);

    const handleSearch = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        setLoading(true);
        setError("");

        try {
            const response = await fetch(`https://dummyjson.com/users/search?q=${query}`);

            if (!response.ok) {
                throw new Error("Failed to fetch users");
            }
            const data = await response.json();
            console.log("Data:", data); // Log data
            setUsers(data.users); // Store users in context
            setUserLastNames(data.users.map((user: any) => user.lastName)); // Extract and store last names
        } catch (error) {
            console.error("Error fetching users:", error); // Log error
            setError("Error fetching users");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="searchForm">
            <form onSubmit={handleSearch}>
                <input
                    type="text"
                    value={query}
                    onChange={(event) => setQuery(event.target.value)}
                    placeholder="Search..."
                />
                <button type="submit" style={{marginTop: 15}}  disabled={loading}>
                    {loading ? "Searching..." : "Search"}
                </button>
            </form>

            {error && <p>{error}</p>}
        </div>
    );
}
