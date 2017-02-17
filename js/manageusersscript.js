// TODO: Validation
// TODO: ONLY USE SINGLE QUOTES FOR JAVASCRIPT?
// TODO: CHECKBOXES
// TODO: Use knockout visible instead of toggleMenu

/**
 * A user of this site
 * @param {string} userId The id of this user in the database
 * @param {string} email The email address of this user
 * @param {string} password The password of this user
 * @param {string} firstName User's first name
 * @param {string} lastName User's last name
 * @param {string} streetNo Street number of this user's address
 * @param {string} streetName Street name of this user's address
 * @param {string} city City of this user's address
 * @param {string} state State of this user's address
 * @param {string} zip Zip code of this user's address (5 character string)
 * @param {boolean} isUserAdmin If the user is admin of users (can add/delete/modify users)
 * @param {boolean} isNewsAdmin If the user is admin of News (TODO)
 */
function User(userId, email, password, firstName, lastName, streetNo, streetName, city, state, zip, isUserAdmin, isNewsAdmin) {
    this.userId = ko.observable(userId);
    this.email = ko.observable(email);
    this.password = ko.observable(password);
    this.firstName = ko.observable(firstName);
    this.lastName = ko.observable(lastName);
    this.streetNo = ko.observable(streetNo);
    this.streetName = ko.observable(streetName);
    this.city = ko.observable(city);
    this.state = ko.observable(state);
    this.zip = ko.observable(zip);
    this.isUserAdmin = ko.observable(isUserAdmin);
    this.isNewsAdmin = ko.observable(isNewsAdmin);
};


function UserListViewModel() {
    var self = this;

    self.users = ko.observableArray([
        new User(1, "brianalbin3@gmail.com", "123456", "Brian", "Albin", "6793", "Old Waterloo Road", "Elkridge", "Maryland", "21075", true, true ),
        new User(2, "lucidrain929@gmail.com", "123456", "Yuzhong", "Chen", "6793", "Old Waterloo Road", "Elkridge", "Maryland", "21075", false, false )
    ]);

    self.selectedUserToEdit = ko.observable();
    self.addingUser = ko.observable(false);

    self.newUser = ko.observable( new User() );

    self.availableStates = ["Alabama", "Alaska", "Arizona", "Arkansas", "California", "Colorado", "Connecticut", "Delaware", "Florida", "Georgia", "Hawaii", "Idaho", "Illinois", "Indiana", "Iowa", "Kansas", "Kentucky", "Louisiana", "Maine", "Maryland", "Masachusetts", "Michigan", "Minnesota", "Mississippi", "Missouri", "Montana", "Nebraska", "Nevada", "New Hampshire", "New Jersey", "New Mexico", "New York", "North Carolina", "North Dakota", "Ohio", "Oklahoma","Oregon", "Pennsylvania", "Rhode Island", "South Carolina", "South Dakota", "Tennessee", "Texas", "Utah", "Vermont", "Virginia", "Washington", "West Virginia", "Wisconsin", "Wyoming"];

   /**
    * Deletes a user
    * @param {User} user The user to delete
    */
    self.deleteUser = function(user) {
        self.users.remove( user );
    };

   /**
    * Add a user.
    */
    self.addUser = function(user) {
        self.users.push( ko.utils.unwrapObservable(self.newUser()) );
        self.newUser( new User() );

        self.addingUser(false);
    };

   /**
    * Edit a user's data
    * @param {User} user The user whos data will be edited
    */
    self.editUser = function(user) {

        if (user == ko.utils.unwrapObservable(self.selectedUserToEdit()) ) {
            self.selectedUserToEdit(null);
        }
        else {
            self.selectedUserToEdit(user);
        }
    };

// TODO: Consider renaming two below functions

   /**
    * Sets addingUser to true
    */
    self.setAddingUser = function() {
        self.addingUser(true);
    };

   /**
    * Sets addingUser to false
    */
    self.unsetAddingUser = function() {
        self.addingUser(false);
    };
}

ko.applyBindings(new UserListViewModel());