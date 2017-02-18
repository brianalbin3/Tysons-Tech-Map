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

    this.addresses = new ko.observableArray([new Address(streetNo, streetName, suite, city, state, zip)]);
};

function CompanyListViewModel() {
    var self = this;

    self.companies = ko.observableArray([
        new Company(1, 'Booz Allen Hamilton', 'www.boozallen.com', 'TODO', '283', 'Greensboro Dr', 'McLean', 'Virginia', '22102'  ),
        new Company(2, 'SAIC', 'www.saic.com', 'TODO', '1710', 'SAIC Dr', 'McLean', 'Virginia', '22102' )
    ]);

    self.selectedCompanyToEdit = ko.observable();

    self.addingCompany = ko.observable(false);
    self.newCompany = ko.observable( new Company() );

   /**
    * Deletes a company
    * @param {Company} company The company to delete
    */
    self.deleteCompany = function(company) {

        var numAddresses = self.addresses.length;
        for (let i = 0; i < numAddresses; i++) {
            //TODO
        }

        self.companies.remove( company );
    };

   /**
    * Add a Company
    */
    self.addCompany = function(company) {
        self.companies.push( ko.utils.unwrapObservable(self.newCompany()) );
        self.newCompany( new Company() );

        self.addingCompany(false);
    };

   /**
    * Edit a company's data
    * @param {Company} company The company whos data will be edited
    */
    self.editCompany = function(company) {
        if (company == ko.utils.unwrapObservable(self.selectedCompanyToEdit()) ) {
            self.selectedCompanyToEdit(null);
        }
        else {
            self.selectedCompanyToEdit(company);
        }
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

};


ko.applyBindings(new CompanyListViewModel());