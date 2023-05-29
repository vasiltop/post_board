<script>
  import { goto } from '$app/navigation';
  import "../app.postcss";
  import { onMount } from 'svelte';
  import { user } from '../stores/auth'
  let data = {success: false}
	onMount(async () => {
    
		const response = await fetch('http://localhost:8000/api/user/me', {
      method: 'GET',
      headers: {
          'auth-token': localStorage.getItem("jwt")
      }
    });

    data = await response.json();
    $user = data.success;
    
    if(!data.success) {
        goto('/login');
    };
	});

  async function logOut() {
    localStorage.setItem("jwt", "");
    $user = false;
    goto('/login');
    
  }
  $:loggedIn = $user;
  
</script>

<div class="navbar bg-base-200">

  <div class="flex-1 space-x-3">
    <a href="http://localhost:5173"> <p class="text-xl">PostBoard</p> </a>

    {#if loggedIn}
    <button class="btn"> <a href={"/profile/" + data.user._id}> Profile </a></button>
    {/if}
  </div>
  
  <div class="justify-end space-x-3">
    {#if loggedIn}
    <button class="btn"> <a href="/create"> Create Post </a></button>
    <button class="btn" on:click={logOut}>LogOut</button>
    {/if}
  </div>
  

</div>

<slot />
