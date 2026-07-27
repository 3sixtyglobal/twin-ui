<script lang="ts">
	// Copyright 2024 IOTA Stiftung.
	// SPDX-License-Identifier: Apache-2.0.
	import { Avatar } from 'flowbite-svelte';
	import type { Snippet } from 'svelte';

	interface Props {
		href?: string;
		children?: Snippet;
		class?: string;
	}

	let { href, ...rest }: Props = $props();
</script>

<Avatar
	{...rest}
	{href}
	class={`${rest.class ?? ''} bg-surface-second text-primary outline-none ring-1 ring-surface-primary hover:bg-surface-third focus:ring focus:ring-surface-button-pressed dark:bg-surface-third-dark dark:text-primary-dark dark:ring-surface-primary-dark dark:hover:bg-surface-second-dark dark:focus:ring-surface-button-pressed-dark`}
>
	{@render rest.children?.()}
</Avatar>
