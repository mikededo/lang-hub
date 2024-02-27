<script lang="ts">
  export let count = 5;
</script>

<div class="flex flex-col gap-[1px] p-2">
  {#each { length: count } as _}
    <div class="flex flex-col gap-2 rounded p-2">
      <div class="flex w-full justify-between">
        <div class="h-4 w-1/2 rounded bg-muted"></div>
        <div class="h-4 w-1/5 rounded bg-muted"></div>
      </div>
      <div class="flex flex-col gap-1">
        <div class="h-2 w-full rounded bg-muted"></div>
        <div class="h-2 w-full rounded bg-muted"></div>
        <div class="h-2 w-2/3 rounded bg-muted"></div>
      </div>
    </div>
  {/each}
</div>
