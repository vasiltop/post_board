<script> 
    import { goto } from '$app/navigation';

    let nameInput;
    let emailInput;
    let passwordInput;

    async function registerButton() {
        
        const response = await fetch('http://localhost:8000/api/user/register', {
            method: 'Post',
            headers: {
                'Content-Type': 'application/json',
            },  
            body: JSON.stringify({
                name: nameInput,
                email: emailInput,
                password: passwordInput
            }),
            
        });

        const data = await response.json();
        
        if(data.success) {
            goto('/login');
        } else {
            window.alert(data.err);
        }
        
    }

</script>

<div class="hero bg-base-100  min-h-screen">
    <div class="hero-content flex-col">
        <input type="text" placeholder="Name" class="input input-bordered w-full max-w-xs" bind:value={nameInput}/>
        <input type="text" placeholder="Email" class="input input-bordered w-full max-w-xs" bind:value={emailInput}/>
        <input type="password" placeholder="Password" class="input input-bordered w-full max-w-xs" bind:value={passwordInput} />
        <button class="btn" on:click={registerButton}>Register</button>
        <a href="http://localhost:5173/login"> Already have an account? Login here.</a>
    </div>
</div>