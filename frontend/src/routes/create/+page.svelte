<script>
    let titleInput;
    let contentInput;

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
        console.log(data);
        if(data.success) {
            window.alert("Post created succesfully");
        } else {
            window.alert(data.error);
        }
    }
</script>

<div class="hero bg-base-100  min-h-screen">
    <div class="hero-content flex-col">
        <input type="text" placeholder="Title" bind:value={titleInput} class="input input-bordered w-full max-w-xs" />
        <textarea class="textarea textarea-bordered" bind:value={contentInput} placeholder="Content"></textarea>
        <button class="btn" on:click={createPost}>Submit</button>
    </div>
</div>



