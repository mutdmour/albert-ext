import defineActionModule from "../typeGuards";

export default defineActionModule({
	urlMatch: '.*',
	results: [
		{
			name: 'Back',
			action() {
				window.history.back();
			},
			alias: [
				'previous page',
			],
		},
		{
			name: 'Forward',
			action() {
				window.history.forward();
			},
			alias: [
				'next page',
			],
		},
		{
			name: 'Refresh',
			action() {
				window.location.reload();
			},
			alias: [
				'reload'
			],
		},
	],
});