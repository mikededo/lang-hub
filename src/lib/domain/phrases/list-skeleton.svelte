<script>
  import { LanguageContainer } from '$lib/domain/languages';
</script>

<div class="flex flex-col gap-4">
  <div class="h-7 w-1/3 animate-pulse rounded bg-muted" />
  <ol role="list" class="flex flex-col gap-2">
    {#each { length: 6 } as _}
      <li class="flex justify-between rounded border border-border px-4 py-3">
        <div class="flex flex-1 flex-col gap-2">
          <div class="h-7 w-1/3 animate-pulse rounded bg-muted" />
          <LanguageContainer>
            <div class="h-5 w-7 animate-pulse rounded bg-muted" />
            <div class="h-5 w-7 animate-pulse rounded bg-muted" />
          </LanguageContainer>
        </div>
        <div class="flex shrink-0 flex-col items-end justify-between gap-2">
          <div class="flex items-center gap-2.5">
            <div class="h-8 w-28 animate-pulse rounded-full bg-muted" />
            <div class="h-6 w-[1px] bg-border" />
            <div class="flex gap-1">
              <div class="h-8 w-8 animate-pulse rounded bg-muted" />
              <div class="h-8 w-8 animate-pulse rounded bg-muted" />
            </div>
          </div>
          <div class="h-5 w-44 animate-pulse rounded bg-muted" />
        </div>
      </li>
    {/each}
  </ol>
</div>
