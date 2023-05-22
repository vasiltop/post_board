<script> 
    let data = {success: false};

    import { onMount } from 'svelte';
    import { goto } from '$app/navigation';

    onMount(async () => {
        const posts = await fetch('http://localhost:8000/api/posts/', {
            method: 'GET',
            headers: {
                'auth-token': localStorage.getItem("jwt")
            }
        });
        
        data = await posts.json();

        if(!data.success) {
            goto('/login');
        };
    });

</script>

<div class="flex flex-col items-center m-20 space-y-10">
    {#if data.success}
        {#each data.postList as {title, content, userName}} 
        <div class="card w-96 bg-base-100 shadow-xl">
            <div class="card-body">
              <h2 class="card-title">{title}</h2>
              <p>{content}</p>
              <p>Posted by {userName}</p>
            </div>
          </div>
        {/each}
    {/if}
</div>
