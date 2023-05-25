<script>
    export let data;
    import { onMount } from "svelte";
    let responseJSON = {success: false};

    onMount(async () => { 

        const response = await fetch('http://localhost:8000/api/user/info/' + data.slug, {
            method: 'Get',
            headers: {
                'Content-Type': 'application/json',
            },  
            
        })


        responseJSON = await response.json();
        

        const dateJoined = new Date(responseJSON.user.date);
        responseJSON.user.date = dateJoined.toLocaleDateString();
    });
    


</script>


{#if responseJSON.success}
<div class="hero min-h-screen">
    <div class="card w-96 bg-base-100 shadow-xl">
        <div class="card-body">
        <h2 class="card-title">{responseJSON.user.name}</h2>
        <p class="w-80 break-words">Account created on {responseJSON.user.date}</p>
        
        </div>
    </div>
</div>
{/if}