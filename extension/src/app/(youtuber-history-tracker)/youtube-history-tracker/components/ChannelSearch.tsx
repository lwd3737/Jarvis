"use client";
import React, { ChangeEventHandler } from "react";

export default function ChannelSearch() {
	const [query, setQuery] = React.useState("");

	const handleQueryChange: ChangeEventHandler<HTMLInputElement> = (ev) => {
		setQuery(ev.target.value);
	};

	return (
		<div>
			<input value={query} />
		</div>
	);
}
