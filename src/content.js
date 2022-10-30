import { createApp } from 'vue'
import CommandPrompt from '@/components/CommandPrompt'

const rootClassName = 'albert-ext-root';

function init() {
	const root = document.createElement('div');
	root.classList.add(rootClassName);
	document.body.appendChild(root);

	setTimeout(() => {
		const app = createApp(CommandPrompt)
		app.mount(`.${rootClassName}`)
	}, 0);
}

try {
	init();
} catch (e) {
	console.error(`albert-ext`, e);
}