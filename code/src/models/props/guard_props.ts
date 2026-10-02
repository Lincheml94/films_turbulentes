import type React from "react";

type GuardProps = {
	roles: string[];
	// children permet de définir que le composant va recevoir des composants enfants (imbrication de composants)
	// React.JSX.Element : types des composants React
	children: React.JSX.Element | React.JSX.Element[];
};

export type { GuardProps };
