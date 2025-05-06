# User Stories

## User Management

### As a new user

- I want to create an account with my username and email
- So that I can access the booking system
- Acceptance Criteria:
  - Username must be unique
  - Email must be valid and unique
  - System should return a unique user ID

### As a registered user

- I want to view my profile information
- So that I can verify my account details
- Acceptance Criteria:
  - Should display username and email
  - Should show account creation date
  - Should show last update date

### As a registered user

- I want to update my profile information
- So that I can keep my details current
- Acceptance Criteria:
  - Should be able to update username
  - Should be able to update email
  - Should maintain uniqueness constraints
  - Should update the last modified timestamp

### As a registered user

- I want to delete my account
- So that I can remove my data from the system
- Acceptance Criteria:
  - Should remove all user data
  - Should remove all associated bookings
  - Should confirm deletion success

## Booking Management

### As a registered user

- I want to create a new booking
- So that I can schedule my appointments
- Acceptance Criteria:
  - Should specify start time
  - Should specify end time
  - Should be able to add notes
  - Should automatically set status as pending
  - Should validate time slots
  - Should prevent overlapping bookings

### As a registered user

- I want to view all my bookings
- So that I can manage my schedule
- Acceptance Criteria:
  - Should display all bookings chronologically
  - Should show booking status
  - Should show booking details (time, notes)
  - Should show creation and update timestamps

### As a registered user

- I want to view a specific booking
- So that I can check its details
- Acceptance Criteria:
  - Should show all booking information
  - Should show associated user information
  - Should show booking status
  - Should show creation and update timestamps

### As a registered user

- I want to update my booking details
- So that I can modify my appointments
- Acceptance Criteria:
  - Should be able to update booking status
  - Should be able to update notes
  - Should maintain booking history
  - Should update the last modified timestamp

### As a registered user

- I want to cancel a booking
- So that I can remove unwanted appointments
- Acceptance Criteria:
  - Should change booking status to cancelled
  - Should maintain booking record
  - Should update the last modified timestamp

### As a registered user

- I want to delete a booking
- So that I can remove it from the system
- Acceptance Criteria:
  - Should completely remove the booking
  - Should confirm deletion success

## System Requirements

### As a system administrator

- I want to view all users
- So that I can manage user accounts
- Acceptance Criteria:
  - Should display all registered users
  - Should show user creation dates
  - Should show user status

### As a system administrator

- I want to view all bookings
- So that I can monitor system usage
- Acceptance Criteria:
  - Should display all bookings
  - Should show booking status
  - Should show associated users
  - Should show creation and update timestamps

## Future Enhancements

### As a registered user

- I want to receive email notifications
- So that I can stay informed about my bookings
- Acceptance Criteria:
  - Should notify on booking creation
  - Should notify on booking updates
  - Should notify on booking cancellation

### As a registered user

- I want to set recurring bookings
- So that I can schedule regular appointments
- Acceptance Criteria:
  - Should allow setting frequency
  - Should allow setting end date
  - Should create multiple bookings

### As a registered user

- I want to share my booking with others
- So that they can view my schedule
- Acceptance Criteria:
  - Should generate shareable links
  - Should allow setting access permissions
  - Should maintain privacy controls

### As a registered user

- I want to set booking reminders
- So that I don't miss my appointments
- Acceptance Criteria:
  - Should allow setting reminder time
  - Should send notification at reminder time
  - Should allow multiple reminders
