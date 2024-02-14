<script lang="ts">
  import { Copy, Settings, Trash } from 'lucide-svelte';

  import { IconButton, TextIconButton } from '$lib/components';
</script>

<div class="flex items-center gap-2.5">
  <TextIconButton Icon={Copy} variant="condensed" color="secondary">Duplicate</TextIconButton>
  <div class="h-6 w-[1px] bg-gray-200" />
  <div class="flex gap-1">
    <IconButton color="muted" Icon={Settings} size="small" />
    <IconButton color="destructive" Icon={Trash} size="small" />
  </div>
</div>
