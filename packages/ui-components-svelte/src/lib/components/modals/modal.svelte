<script lang="ts">
	// Copyright 2024 IOTA Stiftung.
	// SPDX-License-Identifier: Apache-2.0.
	import { Modal } from 'flowbite-svelte';
	import type { Snippet } from 'svelte';

	interface Props {
		open: boolean;
		title: string;
		children?: Snippet;
		footer?: Snippet;
	}

	let { open, children, footer, ...rest }: Props = $props();
</script>

<Modal
	{...rest}
	{open}
	classHeader="text-primary dark:text-primary-dark bg-transparent dark:bg-transparent"
	classBody="text-primary dark:text-primary-dark bg-transparent dark:bg-transparent"
	classFooter="text-primary dark:text-primary-dark bg-transparent dark:bg-transparent"
	dismissable={false}
	class="min-w-96 border-surface-primary bg-surface-main text-primary dark:border-surface-primary-dark dark:bg-surface-main-dark"
>
	{@render children?.()}
	<svelte:fragment slot="footer">
		{@render footer?.()}
	</svelte:fragment>
</Modal>
