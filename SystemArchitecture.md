# CCNY Bus Tracker Architecture

# High-level Component Diagram
![Screen Shot 2024-04-08 at 4 21 39 PM](https://github.com/jaytrivedi2002/ccny-bus-track/assets/90216265/450e70b4-cfe1-4e23-b8b8-698cfbe6acec)
The frontend using React Js is composed of two mid-tier frontend services, one for users and their profiles, and another for the bus tracking feed for the 3 different bus stops. Both of these services's functionalities can then be linked to their respective backend services, which is carried out with Node js. For the users, this is handled with Supabase, which will both store the users in its built in Postgres database and use an API to send an email to the user to verify their account upon registration. As for the bus tracking feed, this is done through fetching its coordinates from MongoDB.


# Entity Diagram
![Screen Shot 2024-04-08 at 4 22 24 PM](https://github.com/jaytrivedi2002/ccny-bus-track/assets/90216265/78b24deb-5f98-4d92-969b-408a2a2807f5)
For our users, we have two distinct tables with distinct attributes. Note that the bold and italic attributes represent the primary key, while the italic attributes represent the unique key. The EMPL Id and Driver Number represent the primary keys of their respective tables, while the Email is a unique key for each table. Both of these entities have a one-to-many tracking relationship with the buses, as one student/driver can track multiple buses. For the bus entity, the bus number is the primary key here.

# Call Sequence Diagram
![Screen Shot 2024-04-08 at 4 21 58 PM](https://github.com/jaytrivedi2002/ccny-bus-track/assets/90216265/6738763e-ea21-432f-acae-5669e88eb777)
The sequence diagram above represents the process for registering as a user. The user will first fill in the registration form with account info constraints(such as EMPL ID not being 8 characters, password being at least a certain amount of characters, etc). If these constraints are not met, the UI will specify the error back to the user. Once a valid registration is returned, the registration form will parse this data to the registration manager, Postgres DB, to see if an account was already created under that email/EMPL ID. If account is already created, user will be notified. Otherwise, Supabase  will send an email to the userin order to verify this account. Once the user verifies his account, this new account will be successfully created imported into the database, and be redirected to the login.
