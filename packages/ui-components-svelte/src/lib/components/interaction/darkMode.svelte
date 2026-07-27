<script lang="ts">
	// Copyright 2024 IOTA Stiftung.
	// SPDX-License-Identifier: Apache-2.0.
	import { Button, Icons } from '$lib';
	import { onMount } from 'svelte';

	function toggleTheme(ev: MouseEvent): void {
		const target = ev.target as HTMLElement;
		const isDark = target.ownerDocument.documentElement.classList.toggle('dark');
		if (target.ownerDocument === document) {
			// we are NOT in the iFrame
			localStorage.setItem('color-theme', isDark ? 'dark' : 'light');
		}
	}

	onMount(() => {
		if ('color-theme' in localStorage) {
			localStorage.getItem('color-theme') === 'dark'
				? document.documentElement.classList.add('dark')
				: document.documentElement.classList.remove('dark');
		} else if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
			document.documentElement.classList.add('dark');
		}
	});
</script>

<Button size="xs" color="plain" on:click={toggleTheme} class="p-2">
	<span class="hidden dark:block"><Icons.MoonOutline /></span>
	<span class="block dark:hidden"><Icons.SunOutline /></span>
</Button>
