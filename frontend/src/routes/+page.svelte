<script> 

    import { onMount } from 'svelte';
    import { goto } from '$app/navigation';

    onMount(async () => {
        console.log('home');
        const posts = await fetch('http://localhost:8000/api/posts/', {
            method: 'GET',
            headers: {
                'auth-token': localStorage.getItem("jwt")
            }
        });
        
        const data = await posts.json();

        if(!data.success) {
            goto('/login');
        }
    });

</script>

