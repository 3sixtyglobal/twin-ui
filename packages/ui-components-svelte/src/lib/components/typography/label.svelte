<script lang="ts">
	// Copyright 2024 IOTA Stiftung.
	// SPDX-License-Identifier: Apache-2.0.
	import { Label } from 'flowbite-svelte';
	import type { Snippet } from 'svelte';

	interface Props {
		class?: string;
		children?: Snippet;
	}

	let props: Props = $props();
</script>

<Label
	{...props}
	class={`flex flex-col gap-1 text-sm font-medium text-primary dark:text-primary-dark ${props.class ?? ''}`}
>
	{@render props.children?.()}
</Label>
