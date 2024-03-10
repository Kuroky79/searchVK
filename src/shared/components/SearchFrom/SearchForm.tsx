import React, {useState, useContext, useEffect} from "react";
import { SearchContext } from "../SearchResults/SearchContext.ts";
import "./styles.css";
import PageLoader from "../PageLoader/PageLoader.tsx";

export function SearchForm() {
    const [query, setQuery] = useState("");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(false);
    const [filteredUsers, setFilteredUsers] = useState<any[]>([]);
    const { users, setUsers } = useContext(SearchContext);

    const handleSearch = async (event: React.FormEvent<HTMLFormElement>):Promise<void> => {
        event.preventDefault();

        if (query.trim() === '') {
            return;
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
            console.log("Data:", data);
            setUsers(data.users);
            setFilteredUsers(data.users);
        } catch (error) {
            console.error( error);
        } finally {
            setLoading(false);
        }
    };
    useEffect(() => {
        if(error){
            throw Error();
        }
    }, [error]);

    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const inputValue = event.target.value.toLowerCase();
        setQuery(inputValue);

        if (inputValue === '') {
            setFilteredUsers([]);
        } else {
            const filteredData = users.filter((user: object) =>
                user.firstName.toLowerCase().includes(inputValue) ||
                user.lastName.toLowerCase().includes(inputValue) ||
                user.address.city.toLowerCase().includes(inputValue)
            );

            setFilteredUsers(filteredData);
        }
    };
    const onThrow = () => setError(true);

    return (
        <div className="searchForm">
            <form onSubmit={handleSearch}>
                <input
                    type="text"
                    value={query}
                    onChange={handleInputChange}
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
