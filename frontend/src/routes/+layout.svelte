<script>
  import { goto } from '$app/navigation';
  import "../app.postcss";
  import { onMount } from 'svelte';
  import { user } from '../stores/auth'
  
  let loggedIn;
  
  user.subscribe(value => {
    loggedIn = value;
  });

	

  
	onMount(async () => {
		const response = await fetch('http://localhost:8000/api/user/me', {
      method: 'GET',
      headers: {
          'auth-token': localStorage.getItem("jwt")
      }
    });

    const data = await response.json();
    user.update(true);
    
	});

  async function logOut() {
    localStorage.setItem("jwt", "");
    user.update(false);
    goto('/login');
    
  }

</script>

<div class="navbar bg-base-200">
  <p class="text-xl">PostBoard</p>

  {#if loggedIn}
  <button class="btn" on:click={logOut}>LogOut</button>
  {/if}

</div>

<slot />
