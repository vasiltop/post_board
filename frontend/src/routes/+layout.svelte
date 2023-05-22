<script>
  import { goto } from '$app/navigation';
  import "../app.postcss";
  import { onMount } from 'svelte';
  import { user } from '../stores/auth'
  
	onMount(async () => {
		const response = await fetch('http://localhost:8000/api/user/me', {
      method: 'GET',
      headers: {
          'auth-token': localStorage.getItem("jwt")
      }
    });

    const data = await response.json();
    $user = data.success;
    
	});

  async function logOut() {
    localStorage.setItem("jwt", "");
    $user = false;
    goto('/login');
    
  }

  function createPost() {
    goto('/create')
  }
  
  $:loggedIn = $user;

</script>

<div class="navbar bg-base-200">

  <div class="flex-1">
    <p class="text-xl">website</p>
  </div>
  
  <div class="justify-end space-x-3">
    {#if loggedIn}
    <button class="btn" on:click={createPost}>Create Post</button>
    <button class="btn" on:click={logOut}>LogOut</button>
    {/if}
  </div>
  

</div>

<slot />
