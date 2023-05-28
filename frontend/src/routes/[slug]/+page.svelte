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
        console.log(responseJSON.postData)
    });

    async function updateLikes(post) {
        post.liked = !post.liked;

        if(post.liked) {
            await fetch(`http://localhost:8000/api/posts/${post._id}/like`, {
                method: 'GET',
                headers: {
                    'auth-token': localStorage.getItem("jwt")
                }
            });
            post.likes++;
        } else {
            await fetch(`http://localhost:8000/api/posts/${post._id}/unlike`, {
            method: 'GET',
                headers: {
                    'auth-token': localStorage.getItem("jwt")
                }
            });
            post.likes--;
        };

        responseJSON.postData = responseJSON.postData;
    };

</script>

{#if responseJSON.success}
<div class="hero min-h-screen">
    <div class="card w-96 bg-base-100 shadow-xl">
        <div class="card-body">
            <h2 class="card-title"><a href={"http://localhost:5173/" + data.slug} class="w-80 break-words"> {responseJSON.postData.title} </a></h2>
            
            <p class="w-80 break-words">{responseJSON.postData.content}</p>

            <div class="flex space-x-3">
                <p> <a href={"http://localhost:5173/profile/" + responseJSON.postData.userId}> Posted by {responseJSON.postData.userName}</a></p>
                <input type="checkbox" class="checkbox" checked={responseJSON.postData.liked} on:change={() => updateLikes(responseJSON.postData)} />
                <p>{responseJSON.postData.likes}</p>
            </div>

            
        </div>
    </div>
</div>
{/if}