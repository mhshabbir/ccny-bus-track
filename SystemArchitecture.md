# CCNY Bus Tracker Architecture

## High Level View
!System Architecture[systemArchitecture.jpg]

The **User Interface** is where users interact with the application. They can see the bus tracks, estimated time of arrival, and weather information. They can also log in to access user-specific features.

The **Application Server** is the backend of the application. It communicates with the User Interface, Database, MapBox API, and Weather API. It processes user requests, updates the database, and retrieves data from the database and APIs.

The **Database** stores information about the buses and their current and previous locations. The Application Server updates and retrieves this information as needed.

The **MapBox API** is used by the application to display maps on the User Interface. The Application Server retrieves the current and previous bus locations from the Database and updates the MapBox API to reflect these locations on the map.


## Entities and Relationships
!ER Diagram[erDiagram.jpg]

### Bus Entity
This entity represents the buses being tracked. It has `BusID`, coordinates for `CurrentLocation`, and `PreviousLocation`, as well as the `NextStop`, and `LastStop`.

### Stop Entity
This entity represents the stops (school and stations). It has attributes like `StopID`, the `StopName`, `Location` as coordinates.

### Bus-Stop Relationship
A bus is associated with two stops - the last stop that it visited (`LastStop`) and the next stop it will visit (`NextStop`). This is a one-to-one relationship as each bus is associated with one `LastStop` and one `NextStop`. On the other hand, a stop can be associated with multiple buses (the buses that have this stop as their `LastStop` or `NextStop`). So, from the perspective of the Stop entity, this is a one-to-many relationship.

In this relationship, `NextStop` and `LastStop` in the Bus entity are foreign keys referencing `StopID` in the Stop entity.


## Call Sequence for Map Tracking Feature
!Call Sequence Diagram[callSeq.jpg]
1. **User Interaction**: The user selects a bus to track on the User Interface (UI).
2. **UI to Server Request**: The UI sends a request to the Application Server, including the `BusID` of the selected bus.
3. **Server to Database Query**: The Application Server queries the Database for the current location of the selected bus using the `BusID`.
4. **Database to Server Response**: The Database retrieves the current location of the selected bus and sends this data back to the Application Server.
5. **Server to MapBox API Request**: The Application Server sends a request to the MapBox API to update the bus icon on the map using the current location data.
6. **MapBox API to Server Response**: The MapBox API updates the bus icon on the map and sends the updated map data back to the Application Server.
7. **Server to UI Response**: The Application Server sends the updated map data to the UI.
8. **UI Update**: The UI updates the map to display the current location of the selected bus.
