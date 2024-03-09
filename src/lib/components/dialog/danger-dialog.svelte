<script lang="ts">
  import { Button, Dialog } from '$lib/components';

  export let onConfirm: () => void;
  export let disableConfirm = false;
  export let onCancel: () => void;
  export let disableCancel = false;
</script>

<Dialog onClose={onCancel}>
  <span slot="header">Are you sure about this?</span>
  <slot name="description">
    <p>This action is irreversible.</p>
  </slot>
  <div class="flex items-center justify-end gap-2">
    <Button color="destructive" disabled={disableConfirm} on:click={onConfirm}>Delete</Button>
    <Button color="secondary" disabled={disableCancel} on:click={onCancel}>Cancel</Button>
  </div>
</Dialog>
