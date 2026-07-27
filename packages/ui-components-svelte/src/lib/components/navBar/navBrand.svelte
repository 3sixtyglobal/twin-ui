<script lang="ts">
	// Copyright 2024 IOTA Stiftung.
	// SPDX-License-Identifier: Apache-2.0.
	import { Is } from '@twin.org/core';
	import { NavBrand } from 'flowbite-svelte';
	import type { Snippet } from 'svelte';

	interface Props {
		href?: string;
		children?: Snippet;
		class?: string;
	}

	let { href, children, ...rest }: Props = $props();
</script>

{#if Is.stringValue(href)}
	<NavBrand
		{href}
		class={`focus:border-primary-500 rounded outline-none focus:ring focus:ring-surface-button-pressed dark:focus:ring-surface-button-pressed ${rest.class ?? ''}`}
	>
		{@render children?.()}
	</NavBrand>
{:else}
	<div class={`flex items-center ${rest.class ?? ''}`}>
		{@render children?.()}
	</div>
{/if}
