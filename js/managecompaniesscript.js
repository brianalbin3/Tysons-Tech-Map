/**
 * An address
 */
function Address(streetNo, streetName, suite, city, state, zip) {
    this.streetNo = ko.observable(streetNo);
    this.streetName = ko.observable(streetName);
    this.suite = ko.observable(suite);
    this.city = ko.observable(city);
    this.state = ko.observable(state);
    this.zip = ko.observable(zip);
};

// TODO: Test below

/**
 * Copys all attributes of an other address to this address
 * @param {Address} otherAddress The address to copy the attributes of
 */
Address.prototype.copy = function(otherAddress) {
    this.streetNo( ko.utils.unwrapObservable(otherAddress.streetNo) );
    this.streetName( ko.utils.unwrapObservable(otherAddress.streetName) );
    this.suite( ko.utils.unwrapObservable(otherAddress.suite) );
    this.city( ko.utils.unwrapObservable(otherAddress.city) );
    this.state( ko.utils.unwrapObservable(otherAddress.state) );
    this.zip( ko.utils.unwrapObservable(otherAddress.zip) );
};

/**
 * A tech company
 * @param {number} companyId The id of this company in the database
 * @param {string} name The name of this company
 * @param {string} webSite The URL for this company's web site
 * @param {string} logoImage The image logo file for the company
 * @param {string} streetNo Street number of this company's address
 * @param {string} streetName Street name of this company's address
 * @param {string} suite Suite No for this company's address
 * @param {string} city City of this company's address
 * @param {string} state State of this company's address
 * @param {string} zip Zip code of this company's address (5 character string)
 */
 function Company(companyId, name, webSite, logoImageFile, streetNo, streetName, suite, city, state, zip) {
    this.companyId = ko.observable(companyId);
    this.name = ko.observable(name);
    this.webSite = ko.observable(webSite);
    this.logoImageFile = ko.observable(logoImageFile);

    this.addresses = new ko.observableArray();

    if ( streetNo !== undefined && streetNo !== null &&
         streetName !== undefined && streetName !== null &&
         city !== undefined && city !== null &&
         state !== undefined && state !== null &&
         zip !== undefined && zip !== null )
    {
        this.addresses.push(new Address(streetNo, streetName, suite, city, state, zip));
    }
};

/**
 * Copys all attributes of an other company to this company
 * @param {Company} otherCompany The company to copy the attributes of
 */
Company.prototype.copy = function(otherCompany) {
    this.companyId( ko.utils.unwrapObservable(otherCompany.companyId) );
    this.name( ko.utils.unwrapObservable(otherCompany.name) );
    this.webSite( ko.utils.unwrapObservable(otherCompany.webSite) );
    this.logoImageFile( ko.utils.unwrapObservable(otherCompany.logoImageFile) );

    this.addresses.removeAll();

    for (let i = otherCompany.addresses().length -1; i >= 0; i-- ) {
        let addr = new Address();
        addr.copy( ko.utils.unwrapObservable(otherCompany.addresses()[i] ) );
        this.addresses.push(addr);
    }
};

/**
 * Checks if this company's non-address values are equal to another company's non-address values
 * @param {Company} The company to compare this company's non address values to
 * @return true if the two companies have equal non-address properties, false otherwise
 */
Company.prototype.hasSameNonAddressValues = function(otherCompany) {

        if ( ko.utils.unwrapObservable(this.companyId) === ko.utils.unwrapObservable(otherCompany.companyId) &&
            ko.utils.unwrapObservable(this.name) === ko.utils.unwrapObservable(otherCompany.name) &&
            ko.utils.unwrapObservable(this.webSite) === ko.utils.unwrapObservable(otherCompany.webSite) &&
            ko.utils.unwrapObservable(this.logoImageFile) === ko.utils.unwrapObservable(otherCompany.logoImageFile) ) {

            return true;
        }

        return false;
};

function CompanyListViewModel() {
    var self = this;

    self.companies = ko.observableArray([
        new Company(1, 'Booz Allen Hamilton', 'www.boozallen.com', 'TODO', '283', 'Greensboro Dr', 'McLean', 'Virginia', '22102' ),
        new Company(2, 'SAIC', 'www.saic.com', 'TODO', '1710', 'SAIC Dr', 'McLean', 'Virginia', '22102' )
    ]);

    self.addingCompany = ko.observable(false);
    self.newCompany = ko.observable( new Company() );

    self.confirmDeleteMenuOpen = ko.observable(false);
    self.selectedCompanyToDelete = ko.observable(null); // TODO: Does this need to be observable?

    self.confirmEditMenuOpen = ko.observable(false);
    self.selectedCompanyToEditOldValues;
    self.selectedCompanyToEdit = ko.observable(null);

   /**
    * Add a Company
    */
    self.addCompany = function(company) {
        self.companies.push( ko.utils.unwrapObservable(self.newCompany()) );
        self.newCompany( new Company() );

        self.addingCompany(false);
    };

// TODO: Consider renaming two below functions

   /**
    * Sets addingCompany to true
    */
    self.setAddingCompany = function() {
        self.addingCompany(true);
    };

   /**
    * Sets addingCompany to false
    */
    self.unsetAddingCompany = function() {
        self.addingCompany(false);
    };

   /**
    * Called when the user presses the delete company button.
    * Closes the menu and deletes the selected company.
    * @param {Company} company The company to potentially delete
    */
    self.deleteCompanyButtonPressed = function(company) {
        self.selectedCompanyToDelete(company);
        self.confirmDeleteMenuOpen(true);
    }

   /**
    * Called when the user presses the cancel button on the confirm delete company menu.
    * Closes the confirm delete company menu
    */
    self.cancelDeleteSelectedCompanyButtonPressed = function() {
        self.confirmDeleteMenuOpen(false);
        self.selectedCompanyToDelete(null);
    };

   /**
    * Called when the user presses the confirm button on the confirm delete company menu.
    * Closes the menu and deletes the selected company.
    */
    self.confirmDeleteSelectedCompanyButtonPressed = function() {
        self.confirmDeleteMenuOpen(false);
        self.companies.remove( ko.utils.unwrapObservable(self.selectedCompanyToDelete()) );
    };

   /**
    * Called when the edit company button is pressed.
    * Lets the user edit this companys's values, or opens confirm save menu if this company is already being edited
    * @param {Company} company The company to edit
    */
    self.editCompanyButtonPressed = function(company) {

        if ( self.selectedCompanyToEdit() == null ) {

            self.selectedCompanyToEditOldValues = new Company();
            self.selectedCompanyToEditOldValues.copy(company);

            self.selectedCompanyToEdit(company);
        }
        else if ( self.selectedCompanyToEdit() == company && ko.utils.unwrapObservable(self.selectedCompanyToEdit).hasSameNonAddressValues(self.selectedCompanyToEditOldValues) === false  ) {
            self.confirmEditMenuOpen(true);
        }
        else if ( self.selectedCompanyToEdit() == company && ko.utils.unwrapObservable(self.selectedCompanyToEdit).hasSameNonAddressValues(self.selectedCompanyToEditOldValues) === true ) {
            self.selectedCompanyToEditOldValues = null;
            self.selectedCompanyToEdit(null);
        }
        else if ( self.selectedCompanyToEdit() != company )
        {
            // TODO: What do I want it to do? Maybe nothing?
        }
    };

   /**
    * Closes the confirm edit changes menu and saves the company's new values
    */
    self.confirmEditSelectedCompanyButtonPressed = function() {
        self.selectedCompanyToEditOldValues = null;
        self.selectedCompanyToEdit(null);
        self.confirmEditMenuOpen(false);
    };

   /**
    * Closes the confirm edit changes menu and resets the company's values to what they were before
    */
    self.cancelEditSelectedCompanyButtonPressed = function() {
        ko.utils.unwrapObservable(self.selectedCompanyToEdit).copy(self.selectedCompanyToEditOldValues);

        self.selectedCompanyToEditOldValues = null;
        self.selectedCompanyToEdit(null);
        self.confirmEditMenuOpen(false);
    };

   /**
    * Returns the appropriate class name for the edit button
    * @param {Company} company The company for this edit button
    * @return {String} classname the edit button should be
    */
    self.getEditButtonClass = function(company) {
        return ko.computed(function() {
            return (self.selectedCompanyToEdit() == company) ? "edit-item-btn-active" : "edit-item-btn";
        });
    };
};


ko.applyBindings(new CompanyListViewModel());