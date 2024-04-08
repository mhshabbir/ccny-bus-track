### CCNY Bus Tracker Architecture


### Highlevel Component Digram
![image](https://github.com/mhshabbir/ccny-bus-track/assets/83360044/8b1011a6-56a9-49df-8bd0-c6e9968e1e3a)
The web client has 2 features:
  1. To login the user which is managed by Supabase API
  2. To get bus information which is received at the client's end through an express.js API. The express API receives data from MongoDB.

### Relationship Diagram
![image](https://github.com/mhshabbir/ccny-bus-track/assets/83360044/c6c052eb-0ba4-4539-adc0-012ed9a6e9ce)
The application is not related to any entities. Our features dont require entities to be connected.

### Flow Diagram
![image](https://github.com/mhshabbir/ccny-bus-track/assets/83360044/df2671c1-91e3-4991-8fdb-3e19dde2eef7)
![image](https://github.com/mhshabbir/ccny-bus-track/assets/83360044/dfa6c644-15c8-47ce-9e09-87b0f634ae80)
Signup and Login flows
When user signs up, the supabase sends a confirmation email.
Once the email is comfirmed the supabase creates tokens as users logins in.
Once the token session time expires the token is deleted from session storage.

