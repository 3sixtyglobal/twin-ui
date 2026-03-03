<script lang="ts">
	// Copyright 2024 IOTA Stiftung.
	// SPDX-License-Identifier: Apache-2.0.
	import { Is } from '@twin.org/core';
	import { Avatar, Navbar, NavBrand, Span } from '$lib';

	interface Props {
		initials?: string;
		homeNavRoute?: string;
		profileNavRoute?: string;
		title?: string;
		titleImage?: string;
		logoImage?: string;
		authenticated?: boolean;
	}

	const {
		initials = '',
		profileNavRoute = '',
		homeNavRoute,
		title = '',
		titleImage,
		logoImage,
		authenticated = false
	}: Props = $props();

	$effect(() => {
		document.title = title;
	});
</script>

<Navbar
	fluid={true}
	class="z-20 min-w-96 flex-nowrap overflow-hidden border-b border-surface-primary bg-surface-main px-5 py-3 dark:border-surface-primary-dark dark:bg-surface-main-dark"
>
	<div class="flex w-full flex-row justify-between gap-10">
		<NavBrand href={homeNavRoute} class="p-2">
			<img src={logoImage ?? '/images/logo-primary.svg'} class="me-3 h-6 sm:h-9" alt={title} />
			{#if Is.stringValue(titleImage)}
				<img src="/images/logo-primary.svg" class="me-3 h-6 sm:h-9" alt={title} />
			{:else}
				<Span
					class="self-center whitespace-nowrap font-inter text-xl font-extrabold text-primary dark:text-primary-dark"
					>{title}</Span
				>
			{/if}
		</NavBrand>
		{#if authenticated}
			<Avatar class="cursor-pointer" href={profileNavRoute}>{initials}</Avatar>
		{/if}
	</div>
</Navbar>
