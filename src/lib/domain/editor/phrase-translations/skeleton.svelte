<script lang="ts">
  export let count = 5;
</script>

<div class="p-2 flex flex-col gap-[1px]">
  {#each { length: count } as _}
    <div class="p-2 rounded flex flex-col gap-2">
      <div class="flex justify-between w-full">
        <div class="h-4 w-1/2 bg-muted rounded"></div>
        <div class="h-4 w-1/5 bg-muted rounded"></div>
      </div>
      <div class="flex flex-col gap-1">
        <div class="h-2 w-full bg-muted rounded"></div>
        <div class="h-2 w-full bg-muted rounded"></div>
        <div class="h-2 w-2/3 bg-muted rounded"></div>
      </div>
    </div>
  {/each}
</div>
