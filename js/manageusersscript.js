// TODO: Validation

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
 * @param {boolean} isNewsAdmin If the user is admin of News
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

/**
 * Copys all attributes of an other user to this user
 * @param {User} otherUser The user to copy the attributes of
 */
User.prototype.copy = function(otherUser) {
    this.userId( ko.utils.unwrapObservable(otherUser.userId) );
    this.email( ko.utils.unwrapObservable(otherUser.email) );
    this.password( ko.utils.unwrapObservable(otherUser.password) );
    this.firstName( ko.utils.unwrapObservable(otherUser.firstName) );
    this.lastName( ko.utils.unwrapObservable(otherUser.lastName) );
    this.streetNo( ko.utils.unwrapObservable(otherUser.streetNo) );
    this.streetName( ko.utils.unwrapObservable(otherUser.streetName) );
    this.city( ko.utils.unwrapObservable(otherUser.city) );
    this.state( ko.utils.unwrapObservable(otherUser.state) );
    this.zip( ko.utils.unwrapObservable(otherUser.zip) );
    this.isUserAdmin( ko.utils.unwrapObservable(otherUser.isUserAdmin) );
    this.isNewsAdmin( ko.utils.unwrapObservable(otherUser.isNewsAdmin) );
};

/**
 * Checks if this user's values are equal to another user's values
 * @param {User} Determines if this user's properties are equal the user passed in
 * @return true if the two users have equal properties, false otherwise
 */
User.prototype.equals = function(otherUser) {
    if ( ko.utils.unwrapObservable(this.userId) === ko.utils.unwrapObservable(otherUser.userId) &&
         ko.utils.unwrapObservable(this.email) === ko.utils.unwrapObservable(otherUser.email) &&
         ko.utils.unwrapObservable(this.password) === ko.utils.unwrapObservable(otherUser.password) &&
         ko.utils.unwrapObservable(this.firstName) === ko.utils.unwrapObservable(otherUser.firstName) &&
         ko.utils.unwrapObservable(this.lastName) === ko.utils.unwrapObservable(otherUser.lastName) &&
         ko.utils.unwrapObservable(this.streetNo) === ko.utils.unwrapObservable(otherUser.streetNo) &&
         ko.utils.unwrapObservable(this.streetName) === ko.utils.unwrapObservable(otherUser.streetName) &&
         ko.utils.unwrapObservable(this.city) === ko.utils.unwrapObservable(otherUser.city) &&
         ko.utils.unwrapObservable(this.state) === ko.utils.unwrapObservable(otherUser.state) &&
         ko.utils.unwrapObservable(this.zip) === ko.utils.unwrapObservable(otherUser.zip) &&
         ko.utils.unwrapObservable(this.isUserAdmin) === ko.utils.unwrapObservable(otherUser.isUserAdmin) &&
         ko.utils.unwrapObservable(this.isNewsAdmin) === ko.utils.unwrapObservable(otherUser.isNewsAdmin) ) {

        return true;
    }

    return false;
};

function UserModel() {
    var self = this;

    self.users = ko.observableArray([
        new User(1, 'brianalbin3@gmail.com', '123456', 'Brian', 'Albin', '6793', 'Old Waterloo Road', 'Elkridge', 'Maryland', '21075', true, true ),
        new User(2, 'lucidrain929@gmail.com', '123456', 'Yuzhong', 'Chen', '6793', 'Old Waterloo Road', 'Elkridge', 'Maryland', '21075', false, false )
    ]);

   /**
    * Deletes a user
    * @param {Sser}
    */
    self.addUser = function(user) {
        self.Users.push(user);
    };

   /**
    * Deletes a user
    * @param {Sser} user A reference to the user in users
    */
    self.deleteUser = function(user) {
        self.users.remove( user );
    };

    /**
     * Sends the changes to this user to the database
     * @param {User} user A reference to the user in users
     */
    self.saveUser = function(user) {
        // TODO
    };
};

var userModel = new UserModel();

function UserListViewModel(userModel) {
    var self = this;

    self.users = userModel.users;

    self.addingUser = ko.observable(false);
    self.newUser = ko.observable( new User() );

    self.confirmDeleteMenuOpen = ko.observable(false);
    self.selectedUserToDelete = null;

    self.confirmEditMenuOpen = ko.observable(false);
    self.selectedUserToEditOldValues;
    self.selectedUserToEdit = ko.observable(null);

    self.availableStates = ['Alabama', 'Alaska', 'Arizona', 'Arkansas', 'California', 'Colorado', 'Connecticut', 'Delaware', 'Florida', 'Georgia', 'Hawaii', 'Idaho', 'Illinois', 'Indiana', 'Iowa', 'Kansas', 'Kentucky', 'Louisiana', 'Maine', 'Maryland', 'Masachusetts', 'Michigan', 'Minnesota', 'Mississippi', 'Missouri', 'Montana', 'Nebraska', 'Nevada', 'New Hampshire', 'New Jersey', 'New Mexico', 'New York', 'North Carolina', 'North Dakota', 'Ohio', 'Oklahoma','Oregon', 'Pennsylvania', 'Rhode Island', 'South Carolina', 'South Dakota', 'Tennessee', 'Texas', 'Utah', 'Vermont', 'Virginia', 'Washington', 'West Virginia', 'Wisconsin', 'Wyoming'];

   /**
    * Add a user
    */
    self.addUser = function() {
        userModel.addUser(ko.utils.unwrapObservable(self.newUser()));

        self.newUser( new User() );

        self.addingUser(false);
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

   /**
    * Called when the user presses the delete user button.
    * Closes the menu and deletes the selected user.
    * @param {User} user The user to potentially delete
    */
    self.deleteUserButtonPressed = function(user) {
        self.selectedUserToEdit(null);

        self.selectedUserToDelete = user;
        self.confirmDeleteMenuOpen(true);
    }

   /**
    * Called when the user presses the cancel button on the confirm delete user menu.
    * Closes the confirm delete user menu
    */
    self.cancelDeleteSelectedUserButtonPressed = function() {
        self.confirmDeleteMenuOpen(false);
        self.selectedUserToDelete = null;
    };

   /**
    * Called when the user presses the confirm button on the confirm delete user menu.
    * Closes the menu and deletes the selected user.
    */
    self.confirmDeleteSelectedUserButtonPressed = function() {
        self.confirmDeleteMenuOpen(false);
        userModel.deleteUser( self.selectedUserToDelete );
        self.selectedUserToDelete = null;
    };

   /**
    * Returns the appropriate class name for the delete button
    * @param {user} user The user for this delete button
    * @return {String} classname the delete button should be
    */
    self.getDeleteButtonClass = function(user) {
        return ko.computed(function() {
            return (self.selectedUserToDelete() == user) ? "delete-item-btn-active" : "delete-item-btn";
        });
    };

   /**
    * Called when the edit user button is pressed.
    * Lets the user edit this user's values, or opens confirm save menu if this user is already being edited
    * @param {User} user The user to edit
    */
    self.editUserButtonPressed = function(user) {
        self.selectedUserToDelete(null);

        if ( self.selectedUserToEdit() == null ) {

            self.selectedUserToEditOldValues = new User();
            self.selectedUserToEditOldValues.copy(user);

            self.selectedUserToEdit(user);
        }
        else if ( self.selectedUserToEdit() == user && ko.utils.unwrapObservable(self.selectedUserToEdit).equals(self.selectedUserToEditOldValues) === false ) {
            self.confirmEditMenuOpen(true);
        }
        else if ( self.selectedUserToEdit() == user && ko.utils.unwrapObservable(self.selectedUserToEdit).equals(self.selectedUserToEditOldValues) === true ) {
            self.selectedUserToEditOldValues = null;
            self.selectedUserToEdit(null);
        }
        else if ( self.selectedUserToEdit() != user )
        {
            // TODO: What do I want it to do? Maybe nothing?
        }
    };

   /**
    * Closes the confirm edit changes menu and saves the user's new values
    */
    self.confirmEditSelectedUserButtonPressed = function() {
        userModel.saveUser( ko.utils.unwrapObservable(self.selectedUserToEdit()) );

        self.selectedUserToEditOldValues = null;
        self.selectedUserToEdit(null);
        self.confirmEditMenuOpen(false);
    };

   /**
    * Closes the confirm edit changes menu and resets user's values to what they were before
    */
    self.cancelEditSelectedUserButtonPressed = function() {
        ko.utils.unwrapObservable(self.selectedUserToEdit).copy(self.selectedUserToEditOldValues);

        self.selectedUserToEditOldValues = null;
        self.selectedUserToEdit(null);
        self.confirmEditMenuOpen(false);
    };

   /**
    * Returns the appropriate class name for the edit button
    * @param {User} user The user for this edit button
    * @return {String} classname the edit button should be
    */
    self.getEditButtonClass = function(user) {
        return ko.computed(function() {
            return (self.selectedUserToEdit() == user) ? "edit-item-btn-active" : "edit-item-btn";
        });
    };

};

ko.applyBindings(new UserListViewModel(userModel));