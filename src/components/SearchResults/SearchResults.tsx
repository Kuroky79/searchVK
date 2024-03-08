// SearchResults.tsx
import React, { useContext } from "react";
import { SearchContext } from "./SearchContext";
import { UserCard } from "../UserCard/UserCard";

export function SearchResults() {
    const { users } = useContext(SearchContext);

    return (
        <div className="usersList">
            {users.map((user) => (
                <UserCard key={user.id} {...user} />
            ))}
        </div>
    );
}
