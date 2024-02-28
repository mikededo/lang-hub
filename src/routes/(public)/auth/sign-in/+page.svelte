<script lang="ts">
  import { Button, Input } from '$lib/components';
</script>

<form class="flex h-full w-full flex-col items-center justify-center gap-8">
  <div class="flex w-full flex-col items-center gap-2">
    <h1 class="text-3xl font-bold">Welcome back!</h1>
    <p class="text-foreground/75">Log in to your account to continue</p>
  </div>
  <div class="flex w-full flex-col gap-4">
    <Input label="Email" id="email" placeholder="email@example.com" required type="email" />
    <div class="flex w-full flex-col gap-2">
      <Input
        label="Password"
        id="password"
        placeholder="Must be 8 characters long!"
        required
        type="password"
      />
      <a class="ml-auto inline-block text-sm underline" href="/">Forgot your password?</a>
    </div>
  </div>
  <Button className="w-full h-10">Sign in</Button>
  <hr class="mx-auto w-3/4" />
  <div class="space-y-2 text-sm">
    <p>
      Don't have an account?
      <a class="underline" href="/auth/sign-up">Sign up</a>
    </p>
  </div>
</form>
