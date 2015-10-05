Template.customers.events({
  'click [data-action=open]': function (event, template) {
    Session.set('selectedCustomer', this);
  },

  'click [data-action=remove]': function (event, template) {
    if (confirm('Do you really want to remove this customer?')) {
      Customers.remove({ _id: this._id });
    }
  },

  'keyup [data-action=search]': _.debounce(function(event, template) {
    event.preventDefault();
    Session.set('searchQuery', template.find('[data-action=search]').value);
  }, 300)
});

Template.customers.helpers({
  customers: () => {
    if (Session.get('searchQuery') !== undefined && Session.get('searchQuery').length !== 0) {
      const query = Session.get('searchQuery');
      return Customers.find({ $or: [ { name: new RegExp(query, 'i') }, { position: new RegExp(query, 'i') }, { company: new RegExp(query, 'i') } ] }, { sort: { name: 1 } });
    }
    return Customers.find({}, { sort: { name: 1 } });
  }
});
