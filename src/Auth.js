import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const Auth = () => {
    const [errorMessages, setErrorMessages] = useState({});
    const [isLoading, setIsLoading] = useState(false);
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    const handleLogin = (e) => {
        e.preventDefault();
        setIsLoading(true);
        const data = { username, password };
        fetch(process.env.REACT_APP_API_URL+'/login', {
            method: 'POST',
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(data)
        })
            .then((response) => {
                if (!response.ok) {
                    throw Error('Failed to process action')
                }
                return response.json();
            })
            .then((result) => {
                alert(result.message);
                if (result.error === false) {
                    localStorage.setItem('login_token', result.data.login_token);
                    navigate(`${process.env.PUBLIC_URL}`);
                }
            })
            .catch((err) => {
                setIsLoading(false);
                console.log(err);
            })
    }
    return (
        <>
            <div className="flex flex-col mt-10 max-w-md p-6 mx-auto rounded-md sm:p-10 bg-gray-900 text-gray-100">
                <div className="mb-8 text-center">
                    <h1 className="my-3 text-4xl font-bold">Sign in</h1>
                    <p className="text-sm text-gray-400">Sign in to access your account</p>
                </div>
                <form className="space-y-12" onSubmit={handleLogin}>
                    <div className="space-y-4">
                        <div>
                            <label className="block mb-2 text-sm">Username</label>
                            <input type="text" name="username" id="username" placeholder="Your username" className="w-full px-3 py-2 border rounded-md border-gray-700 bg-gray-900 text-gray-100" value={username} onChange={(e) => setUsername(e.target.value)} />
                        </div>
                        <div>
                            <div className="flex justify-between mb-2">
                                <label className="text-sm">Password</label>
                            </div>
                            <input type="password" name="password" id="password" placeholder="*****" className="w-full px-3 py-2 border rounded-md border-gray-700 bg-gray-900 text-gray-100" value={password} onChange={(e) => setPassword(e.target.value)} />
                        </div>
                    </div>
                    <div className="space-y-2">
                        <div>
                            {!isLoading && <button type="submit" className="w-full px-8 py-3 font-semibold rounded-md bg-violet-400 text-gray-900">Sign in</button>}
                            {isLoading && <button type="submit" className="w-full px-8 py-3 font-semibold rounded-md bg-violet-400 text-gray-900" disabled>Please wait..</button>}
                        </div>
                        <p className="px-6 text-sm text-center text-gray-400">Don't have an account yet? <Link to={'/register'} rel="noopener noreferrer" className="hover:underline text-violet-400">Sign up</Link>.
                        </p>
                    </div>
                </form>
            </div>
        </>
    );
}
 
export default Auth;