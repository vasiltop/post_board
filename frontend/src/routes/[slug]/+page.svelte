<script>
    import { onMount } from "svelte";
    export let data;
    let responseJSON = {success: false};
    
    onMount(async () => {
        const response = await fetch('http://localhost:8000/api/posts/' + data.slug, {
            method: 'GET',
            headers: {
                'auth-token': localStorage.getItem("jwt")
            }

            
        });

        responseJSON = await response.json();

        const datePosted = new Date(responseJSON.postData.date);
        responseJSON.postData.date = datePosted.toLocaleDateString();
        
    });


</script>

{#if responseJSON.success}
<div class="hero min-h-screen">
    <div class="card w-96 bg-base-100 shadow-xl">
        <div class="card-body">
        <h2 class="card-title">{responseJSON.postData.title}</h2>
        <p class="w-80 break-words">{responseJSON.postData.content}</p>
        <p> <a href={"http://localhost:5173/profile/" + responseJSON.postData.userId}> Posted by {responseJSON.postData.userName} </a>on {responseJSON.postData.date}</p>
        </div>
    </div>
</div>
{/if}