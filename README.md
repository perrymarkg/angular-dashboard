# AngularDashboard

This is a sample blog app built while learning angular 4 with integration to Google Firebase and Authentication. 

1. `git clone .`

2. `npm install`

3. create a google firebase account `https://firebase.google.com/`

4. go to `https://console.firebase.google.com/u/0/` and create project

5. On the project overview page click `Add Firebase To Your Web APP`

6. copy all the keys inside `var config`

```javascript
var config = {
    apiKey: "...",
    authDomain: "...",
    databaseURL: "...",
    projectId: "...",
    storageBucket: "...",
    messagingSenderId: "..."
  };
```

7. On your local project files copy `src/app/env/env-tpl.ts` to `src/app/env/env.ts` and add your keys

9. Back to Google Firebase, go to `Authentication` > `Users` then add a new user. Take note of this user as this will be used as the login for the app.

10. `Authentication` > `Sign-In Method` and enable `Email/Password`

11. Go to `Database` > `Rules` tab and paste the configuration below

```javascript
{
  "rules": {
    ".read": "true",
    ".write": "auth != null",
    "pages": {
    	".indexOn": "active"  
    }    
  }
}
```
12. Run `ng serve --open`
