<script lang="ts">
	// Copyright 2024 IOTA Stiftung.
	// SPDX-License-Identifier: Apache-2.0.
	import { TableBodyRow } from 'flowbite-svelte';
	import type { Snippet } from 'svelte';

	interface Props {
		children?: Snippet;
	}

	let props: Props = $props();
</script>

<TableBodyRow
	{...props}
	class="border-surface-primary bg-surface-main dark:border-surface-primary-dark dark:bg-surface-main-dark"
>
	{@render props.children?.()}
</TableBodyRow>
