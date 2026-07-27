<script lang="ts">
	// Copyright 2024 IOTA Stiftung.
	// SPDX-License-Identifier: Apache-2.0.
	import { page } from '$app/stores';
	import type { ISideBarGroup } from '../../models/ISideBarGroup';
	import { Sidebar, SidebarGroup, SidebarItem, SidebarWrapper } from '$lib';

	interface Props {
		groups?: ISideBarGroup[];
	}

	let activeUrl = $derived($page.url.pathname);
	let { groups = [] }: Props = $props();
</script>

<Sidebar {activeUrl} class="h-full" asideClass="w-16 md:w-64">
	<SidebarWrapper
		class="h-full rounded-none border-r border-surface-primary bg-surface-main dark:border-surface-primary-dark dark:bg-surface-main-dark"
	>
		{#each groups as group}
			<SidebarGroup>
				{#each group.items as item}
					<SidebarItem label={item.label} href={item.route}>
						{#snippet icon()}
							<item.icon
								class="h-6 w-6 text-secondary transition duration-75 dark:text-secondary-dark"
							/>
						{/snippet}
					</SidebarItem>
				{/each}
			</SidebarGroup>
		{/each}
	</SidebarWrapper>
</Sidebar>
