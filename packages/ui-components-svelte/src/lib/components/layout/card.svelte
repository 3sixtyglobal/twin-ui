<script lang="ts">
	// Copyright 2024 IOTA Stiftung.
	// SPDX-License-Identifier: Apache-2.0.
	import { Card } from 'flowbite-svelte';
	import type { Snippet } from 'svelte';

	interface Props {
		children?: Snippet;
		class?: string;
	}

	let props: Props = $props();
</script>

<Card
	{...props}
	class={`border-surface-primary bg-surface-main dark:border-surface-primary-dark dark:bg-surface-main-dark ${props.class ?? ''}`}
	shadow={false}
>
	{@render props.children?.()}
</Card>
