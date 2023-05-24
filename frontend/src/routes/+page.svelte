<script> 
    let data = {success: false};
    let postArray = [];

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

        postArray = data.postList;

        
        
        postArray.sort((a, b) => {
            const d1 = new Date(a.date);
            const d2 = new Date(b.date);
            return d2.getTime() - d1.getTime();
        });

        
    });

</script>

<div class="flex flex-col items-center m-20 space-y-10">
    {#if data.success}
        {#each postArray as {title, content, userName}} 
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
