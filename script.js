async function signIn() {
    const msalConfig = {
        auth: {
            clientId: 'abc158ac-1b83-46c4-af02-86edff786d1a',
            authority: `https://login.microsoftonline.com/3de35efe-c9f7-47f7-a4f5-283060def397`,
            redirectUri: 'https://localhost:3000/authenticate',
        }
    };
    const msalInstance = new msal.PublicClientApplication(msalConfig);

    try {
        // Exchange authorization code for access token
        const authResult = await msalInstance.handleRedirectPromise();
        console.log(authResult)
        // Check if the authentication result contains the access token
        if (authResult.token) {
            // Access token is available, use it to call the Microsoft Graph API
            const response = await fetch('https://graph.microsoft.com/v1.0/me', {
                headers: {
                    'Authorization': `Bearer ${authResult.token}`
                }
            });

            // Check if the response is successful
            if (response.ok) {
                const userData = await response.json();
                console.log('User data from Microsoft Graph API:', userData);
            } else {
                console.error('Failed to fetch user data from Microsoft Graph API:', response.statusText);
            }
        } else {
            console.error('Access token is missing in the authentication result.');
        }
    } catch (error) {
        console.error('Authentication error:', error);
    }
}
