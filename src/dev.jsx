import React from "react";

import { useAllUsers } from "./hooks/queries/useUsers";

export default function Dev() {
	const users = useAllUsers();

	console.info(users);

	return <p>Hello!</p>;
}
