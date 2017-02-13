/**
 * A user of this site
 * @param {string} userId The id of this user in the database
 * @param {string} email The email address of this user
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
function User(userId, email, firstName, lastName, streetNo, streetName, city, state, zip, isUserAdmin, isNewsAdmin) {
    this.userId = ko.observable(userId);
    this.email = ko.observable(email);
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


//TODO Validation


function UserListViewModel() {
    var self = this;

    self.users = ko.observableArray([
        new User(1, "brianalbin3@gmail.com", "Brian", "Albin", "6793", "Old Waterloo Road", "Elkridge", "Maryland", "21075", true, true ),
        new User(2, "lucidrain929@gmail.com", "Yuzhong", "Chen", "6793", "Old Waterloo Road", "Elkridge", "Maryland", "21075", false, false )
    ]);

    self.selectedUserToEdit = ko.observable();
    self.newUser = ko.observable();

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
    self.addUser = function() {
        /*
        // TODO: Is there a better way to do this?
        self.users.push( new User(-1,
                                   $("input[name=email]").val(),
                                   $("input[name=firstName]").val(),
                                   $("input[name=lastName]").val(),
                                   $("input[name=addressStreetNo]").val(),
                                   $("input[name=addressStreetName]").val(),
                                   $("input[name=addressCity]").val(),
                                   $("select[name=addressState]").val(),
                                   $("input[name=addressZip]").val(),
                                   $("input[name=isUserAdminCheckbox]").is(':checked'),
                                   $("input[name=isNewsAdminCheckbox]").is(':checked') ) );
        */
        toggleMenu();
    };

   /**
    * Edit a user's data
    * @param {User} user The user whos data will be edited
    */
    self.editUser = function(user) {
        if (user == ko.utils.unwrapObservable(self.selectedUserToEdit) ) {
            self.selectedUserToEdit(null);
        }
        else {
            self.selectedUserToEdit(user);
        }
    };
}

ko.applyBindings(new UserListViewModel());