<script setup>
import { ref, onMounted, onUnmounted } from 'vue'

const displayCommandPrompt = ref(false)
const input = ref(null);
const searchValue = ref("");

function show() {
	displayCommandPrompt.value = true;

	setTimeout(() => {
		input.value.focus();
	}, 0);
}

function hide() {
	displayCommandPrompt.value = false;
	searchValue.value = '';
}

function onKeyboardShortcut(e) {
	if (e.metaKey && e.shiftKey && e.key === 'k') {
		show();
	}
}

onMounted(() => {
	window.addEventListener('keydown', onKeyboardShortcut);
});

onUnmounted(() => {
	window.removeEventListener('keydown', onKeyboardShortcut);
});
</script>

<template>
	<div class="overlay" v-if="displayCommandPrompt" @click="hide">
		<div class="command-prompt-root">
			<div class="command-prompt" @click.stop>
				<input type="text" ref="input" v-model="searchValue" @keydown.esc="hide" />
			</div>
		</div>
	</div>
</template>

<style scoped>
*::before,
*::after {
  box-sizing: border-box;
  margin: 0;
  position: relative;
  font-weight: normal;
}

.overlay {
	position: fixed;
	top: 0;
	left: 0;
	height: 100vh;
	min-width: 100%;
}

.command-prompt-root {
	display: flex;
	width: 100%;
	height: 100%;
	position: relative;
	justify-content: center;
}

.command-prompt {
	background-color: var(--ae-color-background);
	border-radius: 8px;
	width: 500px;
	height: 100px;
	color: var(--ae-white);
	padding: 0 8px;

	position: absolute;
	top: 25%;
}

.command-prompt input {
	background: transparent;
	border: none;
	height: 100%;
	width: 100%;
	font-size: 45px;
	color: var(--ae-white);
}
</style>

<style>
:root {
  --ae-white: #ffffff;
  --ae-white-soft: #f8f8f8;
  --ae-white-mute: #f2f2f2;

  --ae-black: #181818;
  --ae-black-soft: #222222;
  --ae-black-mute: #282828;

  --ae-text-light-1: var(--ae-indigo);
  --ae-text-light-2: rgba(60, 60, 60, 0.66);
  --ae-text-dark-1: var(--ae-white);
  --ae-text-dark-2: rgba(235, 235, 235, 0.64);
}

/* semantic color variables for this project */
:root {
  --ae-color-background: var(--ae-white);
  --ae-color-background-soft: var(--ae-white-soft);
  --ae-color-background-mute: var(--ae-white-mute);

  --ae-color-heading: var(--ae-text-light-1);
  --ae-color-text: var(--ae-text-light-1);
}

@media (prefers-color-scheme: dark) {
  :root {
    --ae-color-background: var(--ae-black);
    --ae-color-background-soft: var(--ae-black-soft);
    --ae-color-background-mute: var(--ae-black-mute);

    --ae-color-heading: var(--ae-text-dark-1);
    --ae-color-text: var(--ae-text-dark-2);
  }
}
</style>
