export interface Result {
	name: string;
	action: () => void;
	alias?: string[];
}

export interface ActionModule {
	urlMatch: string;
	results: Result[];
}