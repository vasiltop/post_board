<script>

    import { goto } from '$app/navigation';

    let titleInput;
    let contentInput;
    let error = undefined;
    
    async function createPost() {
        
        const response = await fetch('http://localhost:8000/api/posts/create', {
            method: 'Post',
            headers: {
                'Content-Type': 'application/json',
                'auth-token': localStorage.getItem("jwt")
            },
            body: JSON.stringify({
                title: titleInput,
                content: contentInput
            })
        });

        const data = await response.json();
        
        if(data.success) {
            goto("/");
        } else {
            error = data.err;
        }
    };
</script>

<div class="hero bg-base-100  min-h-screen">
    <div class="hero-content flex-col">
        <input type="text" placeholder="Title" bind:value={titleInput} class="input input-bordered w-full max-w-xs" />
        <div class="form-control w-full max-w-xs">
            <textarea class="textarea textarea-bordered" bind:value={contentInput} placeholder="Content"></textarea>
            {#if error}
              <span class="label-text-alt">{error}</span>
            {/if}
        </div>
        <button class="btn" on:click={createPost}>Create Post</button>
    </div>
</div>



