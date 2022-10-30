import { createApp } from 'vue'
import Example from '@/components/Example'

const rootClassName = 'albert-ext-root';

function init() {
	const root = document.createElement('div');
	root.classList.add(rootClassName);
	document.body.appendChild(root);

	setTimeout(() => {
		const app = createApp(Example)
		app.mount(`.${rootClassName}`)
	}, 0);
}

window.onload = function() {
		try {
			init();
		} catch (e) {
			console.log(e);
		}
}
