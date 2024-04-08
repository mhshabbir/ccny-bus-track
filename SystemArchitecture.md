# CCNY Bus Tracker Architecture

## High Level View
!System Architecture

The **User Interface** is where users interact with the application. They can see the bus tracks, estimated time of arrival, and weather information. They can also log in to access user-specific features.

The **Application Server** is the backend of the application. It communicates with the User Interface, Database, MapBox API, and Weather API. It processes user requests, updates the database, and retrieves data from the database and APIs.

The **Database** stores information about the buses and their current and previous locations. The Application Server updates and retrieves this information as needed.

The **MapBox API** is used by the application to display maps on the User Interface. The Application Server retrieves the current and previous bus locations from the Database and updates the MapBox API to reflect these locations on the map.


## Entities

### Bus Entity

This entity represents the buses being tracked. It might have attributes like `BusID`, `CurrentLocation`, `PreviousLocation`, `NextStop`, and `LastStop`.

### Stop Entity

This entity represents the stops (school and stations). It might have attributes like `StopID`, `StopName`, `Location`.

## Relationships

### Bus-Stop Relationship

A bus is associated with two stops - the last stop that it visited (`LastStop`) and the next stop it will visit (`NextStop`). This is a one-to-one relationship as each bus is associated with one `LastStop` and one `NextStop`. On the other hand, a stop can be associated with multiple buses (the buses that have this stop as their `LastStop` or `NextStop`). So, from the perspective of the Stop entity, this is a one-to-many relationship.

In this relationship, `NextStop` and `LastStop` in the Bus entity are foreign keys referencing `StopID` in the Stop entity.
