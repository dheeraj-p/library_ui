### To Create a Working Version

- [x] Implement feature to borrow books
- [x] Fetch and display currently reading book.
- [x] Onboard new user on signin
- [x] Create screen to display printable QR codes of book
- [x] Add border around QR code
- [x] Add title in the QR code
- [x] Protect Admin only routes
- [x] Add a proper app loading screen (first load)
- [ ] Figure out a way to create common snackbar for showing message (or a common messaging mechanism throughout the app)
- [ ] Add a common loading screen for API calls
- [ ] Trim values before sending to API calls
- [x] Add scanner and UI to return book
- [ ] Display "all books" in a lazy-loading manner (use pagination internally)
- [ ] Show full details of book in a new screen including, who all are reading that book
- [ ] Add search field in "All books" screen to search by name
- [x] Only allow TW domain in authentication
- [ ] Return cancel signal for API calls in useEffect hook
- [ ] Create proper empty and error placeholders for screens where list of books are being rendered.
- [ ] Create screen to change user roles
- [x] Avoid using `navigate` function from react-router-dom (They suggest something else). Also check why? (Migrating to tanstack router)
- [ ] Implement code splitting using Tanstack lazy routes
- [x] Move auth, api related code to a common directory
- [ ] Separate out firebase app/auth from auth module (dependency inversion)
- [x] Make the login screen beautiful
- [ ] Find a good background for login screen
- [x] Fix app bar back button for dashboard routes (Don't show back button)
- [ ] Remove duplication from "All Books" page and "Currently Reading" page (if possible)
- [ ] Admin feature to scan any book and fetch the information about book
- [x] Admin feature to see all borrowed books
- [ ] Display a generic Error component for loader failures

### For Future

- [ ] Refactor API Client to avoid duplication
- [ ] Refactor screens and figure out how react router can be used effectively (Probably use router loaders to fetch the initial config before actually rendering the application). (Migrating to tanstack router)
  - [x] Migrate existing app to tanstack
  - [x] Create different routes for dashboard sections (all-books, currently-reading, request)
  - [ ] Use loaders to fetch data for loading books
- [x] Avoid fetching user role and initial authentication data on Admin Panel.
