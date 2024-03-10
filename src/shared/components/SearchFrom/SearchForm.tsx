import React, {useState, useContext, useEffect} from "react";
import { SearchContext } from "../SearchResults/SearchContext.ts";
import "./styles.css";
import PageLoader from "../PageLoader/PageLoader.tsx";

export function SearchForm() {
    const [query, setQuery] = useState("");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(false);
    const [filteredUsers, setFilteredUsers] = useState([]);
    const { users, setUsers } = useContext(SearchContext); // Destructure users from context

    const handleSearch = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        // Check if the query is empty
        if (query.trim() === '') {
            return; // Exit the function if the query is empty
        }

        setLoading(true);


        try {
            const response = await fetch(
                `https://dummyjson.com/users/search?q=${query}`
            );

            if (!response.ok) {
                throw new Error("Failed to fetch users");
            }
            const data = await response.json();
            console.log("Data:", data); // Log data
            setUsers(data.users); // Store users in context
            setFilteredUsers(data.users); // Set filtered users
        } catch (error) {
            console.error( error); // Log error
        } finally {
            setLoading(false);
        }
    };


    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const inputValue = event.target.value.toLowerCase();
        setQuery(inputValue); // Update query state

        if (inputValue === '') {
            // If input is empty, set filtered users to an empty array
            setFilteredUsers([]);
        } else {
            // Filter users based on query
            const filteredData = users.filter((user: object) =>
                user.firstName.toLowerCase().includes(inputValue) ||
                user.lastName.toLowerCase().includes(inputValue) ||
                user.address.city.toLowerCase().includes(inputValue)
            );

            setFilteredUsers(filteredData); // Update filteredUsers state
        }
    };
    const onThrow = () => setError(true);

    return (
        <div className="searchForm">
            <form onSubmit={handleSearch}>
                <input
                    type="text"
                    value={query}
                    onChange={handleInputChange} // Use handleInputChange for input change
                    placeholder="Search..."
                />
                <button type="submit" className="button" disabled={loading}>
                    {loading ? "Searching..." : "Search"}
                </button>
                {loading && <PageLoader />}
                {/*<button style={{marginTop: 25}} onClick={onThrow}>Test</button> // test BadButton throw Error*/}
            </form>

        </div>
    );
}
