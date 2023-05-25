<script> 
    let data = {success: false};
    let postArray = [];

    import { onMount } from 'svelte';
    
    import { user } from '../stores/auth'
    
    let postsShown = 5;

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

</script>

<div class="flex flex-col items-center m-20 space-y-10">
    
    {#if $user && data.success}
          
        {#each {length: postsShown} as _, i}
        
        <div class="card w-96 bg-base-100 shadow-xl">
            <div class="card-body">
              <h2 class="card-title"><a href={"http://localhost:5173/" + postArray[i]._id}> {postArray[i].title} </a></h2>
              <p class="w-80 break-words">{postArray[i].content}</p>
              <p> <a href={"http://localhost:5173/profile/" + postArray[i].userId}> Posted by {postArray[i].userName}</a></p>
            </div>
          </div>
        {/each}
        
        {#if postsShown < postArray.length}
            <button class="btn" on:click={showMorePosts}>Show More</button>
        {/if}
    {/if}
</div>
