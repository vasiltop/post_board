<script> 
    

    import { onMount } from 'svelte';
    import { user } from '../stores/auth'
    
    let postsShown = 5;
    let data = {success: false};
    let postArray = [];
    

    function showMorePosts() {

        
        postsShown += 5;
        
        if(postsShown > postArray.length) {
            postsShown = postArray.length;
        }
    }

    onMount(async () => {
        const posts = await fetch('http://localhost:8000/api/posts/', {
            method: 'GET',
            headers: {
                'auth-token': localStorage.getItem("jwt")
            }
        });
        
        data = await posts.json();
        postArray = data.postList;
        postArray.sort((a, b) => {
            const d1 = new Date(a.date);
            const d2 = new Date(b.date);
            return d2.getTime() - d1.getTime();
        });

        if(postArray.length < 5) {
            postsShown = postArray.length;
        }
        
        

        
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

        postArray = postArray;
    }
    
</script>

<div class="flex flex-col items-center m-20 space-y-10">
    
    {#if $user && data.success}
          
        {#each postArray as post}
        
        <div class="card w-96 bg-base-100 shadow-xl">
            <div class="card-body">
              <h2 class="card-title"><a href={"http://localhost:5173/" + post._id} class="w-80 break-words"> {post.title} </a></h2>
              <p class="w-80 break-words">{post.content}</p>
              
              <div class="flex space-x-3">
                <p> <a href={"http://localhost:5173/profile/" + post.userId}> Posted by {post.userName}</a></p>
                <input type="checkbox" class="checkbox" checked={post.liked} on:change={() => updateLikes(post)} />
                <p>{post.likes}</p>

              </div>
              
            </div>
          </div>
        {/each}
        
        {#if postsShown < postArray.length}
            <button class="btn" on:click={showMorePosts}>Show More</button>
        {/if}
    {/if}
</div>
