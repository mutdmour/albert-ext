<script lang="ts" setup>
import { ref, computed, onMounted, onUnmounted, Ref } from 'vue'
import actions from '../actions';
import type { Result } from '../Interface';

const displayCommandPrompt = ref(false)
const input: Ref<HTMLInputElement | null> = ref(null);
const searchValue = ref("");
const selectedIndex = ref(0);

let allPossibleResults: Result[] = [];

const results = computed(() => {
	if (searchValue.value.length === 0) {
		return [];
	}
	return allPossibleResults.filter((result) => result.name.toLowerCase().includes(searchValue.value.toLowerCase()));
});

function show() {
	displayCommandPrompt.value = true;

	setTimeout(() => {
		if (input.value) {
			input.value.focus();
			input.value.select();
		}
	}, 0);
}

function hide() {
	displayCommandPrompt.value = false;
}

function onKeyboardShortcut(e: KeyboardEvent) {
	if (e.metaKey && e.shiftKey && e.key === 'k') {
		show();
	}
}

function submit() {
	results.value[selectedIndex.value].action();
}

function setMatches() {
	const url = window.location.href;
	const matchingActions = actions.filter((action) => new RegExp(action.urlMatch).test(url));
	allPossibleResults = [];
	matchingActions.forEach((action) => {
		allPossibleResults = [...allPossibleResults, ...action.results];
	});
}

function resetState() {
	searchValue.value = "";
	displayCommandPrompt.value = false;
	setMatches();
}

function moveDown() {
	if (selectedIndex.value < results.value.length - 1) {
		selectedIndex.value++;
	}
}

function moveUp() {
	if (selectedIndex.value > 0) {
		selectedIndex.value--;
	}
}

function onKeydown(e: KeyboardEvent) {
	if (e.key === 'ArrowDown') {
		e.preventDefault();
		moveDown();
	} else if (e.key === 'ArrowUp') {
		e.preventDefault();
		moveUp();
	}
}

onMounted(() => {
	window.addEventListener('keydown', onKeyboardShortcut);
	resetState();
});

onUnmounted(() => {
	window.removeEventListener('keydown', onKeyboardShortcut);
});
</script>

<template>
  <div class="overlay" v-if="displayCommandPrompt" @click="hide">
    <div class="command-prompt-root">
      <div class="command-prompt" @click.stop>
        <div :class="{ prompt: true, 'has-results': !!results.length }">
          <input
            type="text"
            ref="input"
            v-model="searchValue"
            @keydown="onKeydown"
            @keydown.esc="hide"
            @keydown.enter="submit"
          />
        </div>
        <div
          v-for="(result, i) in results"
          :class="{ result: true, selected: selectedIndex === i }"
        >
          <div>
            {{ result.name }}
          </div>
        </div>
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
  z-index: 9999999;
}

.command-prompt-root {
  display: flex;
  width: 100%;
  height: 100%;
  position: relative;
  justify-content: center;
}

.command-prompt {
  width: 500px;
  color: var(--ae-white);

  position: absolute;
  top: 20%;
}

.prompt {
  height: 100%;
  padding: 8px;
  background-color: var(--ae-color-background);
  opacity: 0.95;
  border-radius: 8px;
}

.has-results {
  border-bottom-left-radius: 0;
  border-bottom-right-radius: 0;
}

.command-prompt input {
  background: transparent;
  border: none;
  height: 100%;
  width: 100%;
  font-size: 45px;
  color: var(--ae-white);
}

.result {
  background-color: var(--ae-color-background);
  opacity: 0.95;
  height: 50px;
  padding-left: 8px;
  display: flex;
  align-items: center;
}

.result:last-child {
  border-bottom-left-radius: 8px;
  border-bottom-right-radius: 8px;
}

.result.selected {
  background-color: var(--ae-highlight);
  opacity: 0.95;
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

  --ae-highlight: rgb(65, 65, 208);
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
