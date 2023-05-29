<script> 
    

    import { onMount } from 'svelte';
    import { user } from '../stores/auth'
    
    let postsShown = 5;
    let data = {success: false};
    let postArray = [];
    let selectedSorting = "Sort By Date";

    function sortByLikes(a, b) {
        return b.likes - a.likes;
    }

    function sortByDate(a, b) {
        
        const d1 = new Date(a.date);
        const d2 = new Date(b.date);
        return d2.getTime() - d1.getTime();
        
    }

    const sortMap = {
        "Sort By Likes": sortByDate,
        "Sort By Date": sortByLikes
    };

    function updateSorting() {
        postArray.sort(sortMap[selectedSorting]);
        postArray = postArray;
        
    }

    function showMorePosts() {

        
        postsShown += 5;
        
        if(postsShown > postArray.length) {
            postsShown = postArray.length;
        }
    }
    
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
    };
    
    onMount(async () => {
        const posts = await fetch('http://localhost:8000/api/posts/', {
            method: 'GET',
            headers: {
                'auth-token': localStorage.getItem("jwt")
            }
        });
        
        data = await posts.json();
        postArray = data.postList;
        postArray.sort(sortByDate);

        if(postArray.length < 5) {
            postsShown = postArray.length;
        }

    });
    
</script>

<div class="flex flex-col items-center m-20 space-y-10">
    
    {#if $user && data.success}

        <select class="select w-full max-w-xs select-bordered" on:change={updateSorting} bind:value={selectedSorting}>
            <option>Sort By Date</option>
            <option>Sort By Likes</option>
        </select>

        {#each Array(postsShown) as _, i}
        
        <div class="card w-96 bg-base-100 shadow-xl">
            <div class="card-body">
              <h2 class="card-title"><a href={"http://localhost:5173/" + postArray[i]._id} class="w-80 break-words"> {postArray[i].title} </a></h2>
              <p class="w-80 break-words">{postArray[i].content}</p>
              
              <div class="flex space-x-3">
                <p> <a href={"http://localhost:5173/profile/" + postArray[i].userId}> Posted by {postArray[i].userName}</a></p>
                <input type="checkbox" class="checkbox" checked={postArray[i].liked} on:change={() => updateLikes(postArray[i])} />
                <p>{postArray[i].likes}</p>

              </div>
              
            </div>
          </div>
        {/each}
        
        {#if postsShown < postArray.length}
            <button class="btn" on:click={showMorePosts}>Show More</button>
        {/if}
    {/if}
</div>
