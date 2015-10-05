Template.activitiesForm.events({
  'submit form': function (event, template) {
    event.preventDefault();

    const body = template.find('#body').value;

    Activities.insert({ body: template.find('#body').value, createdAt: new Date(), customerId: Session.get('selectedCustomer')._id });
    template.find('#body').value = '';
  },

  'click [data-action=remove]': function (event, template) {
    if (confirm('Do you really want to remove this activity?')) {
      Activities.remove({ _id: this._id });
    }
  }
});

Template.activitiesForm.helpers({
  activities: () => {
    return Activities.find({ customerId: Session.get('selectedCustomer')._id }, { sort: { createdAt: -1 } });
  },

  activitiesAvailable: () => {
    return Activities.find({
      customerId: Session.get('selectedCustomer')._id
    }).count();
  },

  isCustomerSelected: () => {
    const selectedCustomer = Session.get('selectedCustomer');
    return selectedCustomer !== undefined && selectedCustomer._id;
  },

  formattedCreatedAt: (createdAt) => {
    return moment(createdAt).format('L LT');
  }
});
