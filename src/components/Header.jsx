// Header component.

import React from "react";
import logo from "@/assets/gtw-logo-horizontal.svg";

export default function Header() {
	return (
		<div className="header">
			<img
				src={logo}
				alt="Get To Work logo"
				style={{ width: "300px", height: "auto", position: "relative" }}
			/>
		</div>
	);

	// Left: Menu icon --> <Drawer />
	// Right: Profile icon --> <Profile />
}
