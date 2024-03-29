<script lang="ts">
  import type { Json } from '$lib/types';

  export let jsonObject: Json;

  $: stringifiedObject = JSON.stringify(jsonObject, undefined, 2);

  const isNullValue = (value: string) => value.trim() === 'null' || value.trim() === 'null,';
</script>

{#each stringifiedObject.split('\n') as line, index}
  {#if index === 0 || index === stringifiedObject.split('\n').length - 1}
    <span>{line}</span>
  {:else}
    <span class="pl-4">
      {#each line.split(':') as value, i}
        {#if i === 0}
          <span class="text-emerald-500">{value}</span>
        {:else}
          <span>
            : <span
              class:text-emerald-500={!isNullValue(value)}
              class:text-amber-500={isNullValue(value)}
            >
              {value}
            </span>
          </span>
        {/if}
      {/each}
    </span>
  {/if}
  <br />
{/each}
