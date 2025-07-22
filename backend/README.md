# Models

## User Model (both walkers and owners)

* `id`: a unique identifier for each user (e.g., a MongoDB ObjectID)
* `email`: the user's email address, used for authentication purposes
* `password`: the user's password, hashed for security reasons
* `role`: either "walker" or "owner", indicating the type of user account created
* `profile`: an object containing basic profile information about the user, such as their name and phone number
* `isVerified`: a boolean value indicating whether the user's email address has been verified (e.g., through a confirmation email)
* `ratings`: an array of rating objects, each containing a rating from a specific walker or owner for the user's dog walking service
* `createdAt`: the date and time the user account was created

## Dog Model

* `id`: a unique identifier for each dog (e.g., a MongoDB ObjectID)
* `ownerId`: the ID of the user who is the owner of this dog
* `name`: the name of the dog
* `breed`: the breed of the dog
* `age`: the age of the dog
* `size`: the size of the dog (e.g., "small", "medium", or "large")
* `temperament`: the temperament of the dog (e.g., "friendly", "energetic", or "calm")
* `medicalNotes`: any medical notes about the dog, including their allergies and health conditions
* `specialInstructions`: any special instructions for the dog's walkers, such as "do not let dog out of leash" or "make sure dog has access to water"
* `photos`: an array of photo URLs for the dog's profile picture and any other relevant photos
* `emergencyContact`: the contact information for the dog's emergency contact, if applicable

## Walk Request Model

* `id`: a unique identifier for each walk request (e.g., a MongoDB ObjectID)
* `ownerId`: the ID of the user who is making the walk request
* `dogIds`: an array of IDs for the dogs being walked
* `walkerId`: the ID of the dog walker assigned to this walk request
* `scheduledTime`: the date and time the walk session is scheduled for
* `duration`: the length of the walk session (e.g., "1 hour", "2 hours", etc.)
* `specialInstructions`: any special instructions for the walk session, such as "do not let dog out of leash" or "make sure dog has access to water"
* `status`: the status of the walk request (e.g., "pending", "accepted", "rejected", etc.)
* `pickupLocation`: the location where the dogs will be picked up for their walk session
* `pricing`: the pricing information for the walk session, including any discounts or promotions applied

## Walk Session Model

* `id`: a unique identifier for each walk session (e.g., a MongoDB ObjectID)
* `walkRequestId`: the ID of the walk request that this walk session is associated with
* `startTime`: the date and time the walk session started
* `endTime`: the date and time the walk session ended
* `route`: the route taken by the dogs during their walk session, including any stops or detours
* `photos`: an array of photo URLs for the dog's profile picture and any other relevant photos
* `notes`: any notes from the walker about the dogs' behavior or performance during the walk session
* `distance`: the total distance covered by the dogs during their walk session
* `status`: the status of the walk session (e.g., "pending", "in progress", "completed", etc.)
