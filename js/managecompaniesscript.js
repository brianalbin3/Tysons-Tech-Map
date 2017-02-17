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

   /**
    * Deletes a company
    * @param {Company} user The company to delete
    */
    self.deleteCompany = function(company) {

        var numAddresses = self.addresses.length;
        for (let i = 0; i < numAddresses; i++) {
            //TODO
        }

        self.users.remove( company );
    };

    //TODO: Add Company

   /**
    * Edit a company's data
    * @param {Company} user The user whos data will be edited
    */
    self.editCompany = function(user) {
        if (company == ko.utils.unwrapObservable(self.selectedCompanyToEdit) ) {
            self.selectedCompanyToEdit(null);
        }
        else {
            self.selectedCompanyToEdit(user);
        }
    };

};


ko.applyBindings(new CompanyListViewModel());