<script lang="ts">
	// Copyright 2024 IOTA Stiftung.
	// SPDX-License-Identifier: Apache-2.0.
	import type { Snippet } from 'svelte';

	interface Props {
		class?: string;
		children?: Snippet;
	}

	let { children, ...rest }: Props = $props();
</script>

<div
	class="mt-2 w-full rounded-md border border-surface-primary text-primary dark:border-surface-primary-dark dark:text-primary-dark"
>
	<pre class={`w-full overflow-auto p-2 text-xs ${rest.class ?? ''}`}>{@render children?.()}</pre>
</div>
