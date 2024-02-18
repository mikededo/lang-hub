<script>
  import { LanguageContainer } from '$lib/domain/languages';
</script>

<div class="flex flex-col gap-4">
  <div class="h-7 w-1/3 rounded bg-muted animate-pulse" />
  <ol role="list" class="flex flex-col gap-2">
    {#each { length: 6 } as _}
      <li class="px-4 py-3 flex justify-between border rounded">
        <div class="flex flex-1 flex-col gap-2">
          <div class="h-7 w-1/3 rounded bg-muted animate-pulse" />
          <LanguageContainer>
            <div class="h-5 w-7 rounded bg-muted animate-pulse" />
            <div class="h-5 w-7 rounded bg-muted animate-pulse" />
          </LanguageContainer>
        </div>
        <div class="flex flex-col justify-between items-end gap-2 shrink-0">
          <div class="flex items-center gap-2.5">
            <div class="h-8 w-28 rounded-full bg-muted animate-pulse" />
            <div class="h-6 w-[1px] bg-gray-200" />
            <div class="flex gap-1">
              <div class="h-8 w-8 rounded bg-muted animate-pulse" />
              <div class="h-8 w-8 rounded bg-muted animate-pulse" />
            </div>
          </div>
          <div class="h-5 w-44 rounded bg-muted animate-pulse" />
        </div>
      </li>
    {/each}
  </ol>
</div>
