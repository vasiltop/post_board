<script> 
    import { goto } from '$app/navigation';
    import { user } from '../../stores/auth'

    let emailInput;
    let passwordInput;

    async function loginButton() {
        
        const response = await fetch('http://localhost:8000/api/user/login', {
            method: 'Post',
            headers: {
                'Content-Type': 'application/json',
            },  
            body: JSON.stringify({
                email: emailInput,
                password: passwordInput
            }),
            
        });

        const data = await response.json();
        
        if(data.success) {
            localStorage.setItem("jwt", data.jwt);
            $user = true;
            goto('/');
        } else {
            window.alert(data.err);
        }
        
    }
</script>
<div class="hero bg-base-100  min-h-screen">
    <div class="hero-content flex-col">
        <input type="text" placeholder="Email" class="input input-bordered w-full max-w-xs" bind:value={emailInput} />
        <input type="text" placeholder="Password" class="input input-bordered w-full max-w-xs" bind:value={passwordInput} />
        <button class="btn" on:click={loginButton}>Login</button>
        <a href="http://localhost:5173/register"> Don't have an account? Register here.</a>
    </div>
</div>



