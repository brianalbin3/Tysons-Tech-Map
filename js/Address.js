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
 * Checks if this address values are equal to another address values
 * @param {Address} The address to compare this addresses values to
 * @return true if the two addresses have equal properties, false otherwise
 */
Address.prototype.equals = function(otherAddress) {
    if ( ko.utils.unwrapObservable(this.streetNo) === ko.utils.unwrapObservable(otherAddress.streetNo) &&
         ko.utils.unwrapObservable(this.streetName) === ko.utils.unwrapObservable(otherAddress.streetName) &&
         ko.utils.unwrapObservable(this.suite) === ko.utils.unwrapObservable(otherAddress.suite) &&
         ko.utils.unwrapObservable(this.city) === ko.utils.unwrapObservable(otherAddress.city) &&
         ko.utils.unwrapObservable(this.state) === ko.utils.unwrapObservable(otherAddress.state) &&
         ko.utils.unwrapObservable(this.zip) === ko.utils.unwrapObservable(otherAddress.zip) ) {

        return true;
    }

    return false;
};
