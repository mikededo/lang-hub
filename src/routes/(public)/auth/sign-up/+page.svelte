<script lang="ts">
  import { Button, Input } from '$lib/components';
</script>

<form class="flex h-full w-full flex-col items-center justify-center gap-8">
  <div class="flex w-full flex-col items-center gap-2">
    <h1 class="text-3xl font-bold">Hi, newcomer!</h1>
    <p class="text-foreground/75">Fill in the fields to create an account!</p>
  </div>
  <div class="flex w-full flex-col gap-4">
    <Input label="First name" id="first-name" placeholder="John" required type="text" />
    <Input label="Last name" id="last-name" placeholder="Doe" required type="text" />
    <Input label="Email" id="email" placeholder="email@example.com" required type="email" />
    <Input
      label="Password"
      id="password"
      placeholder="Must be 8 characters long!"
      required
      type="password"
    />
  </div>
  <Button className="w-full h-10">Sign up</Button>
  <hr class="mx-auto w-3/4" />
  <div class="space-y-2 text-sm">
    <p>
      Already have an account?
      <a class="underline" href="/auth/sign-in">Sign in</a>
    </p>
  </div>
</form>
