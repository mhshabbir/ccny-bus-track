# CCNY Bus Tracker Architecture

!System Architecture

The **User Interface** is where users interact with the application. They can see the bus tracks, estimated time of arrival, and weather information. They can also log in to access user-specific features.

The **Application Server** is the backend of the application. It communicates with the User Interface, Database, MapBox API, and Weather API. It processes user requests, updates the database, and retrieves data from the database and APIs.

The **Database** stores information about the buses and their current and previous locations. The Application Server updates and retrieves this information as needed.

The **MapBox API** is used by the application to display maps on the User Interface. The Application Server retrieves the current and previous bus locations from the Database and updates the MapBox API to reflect these locations on the map.
