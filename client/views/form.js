Template.form.events({
  'submit form': function (event, template) {
    event.preventDefault();

    const customer = {
      name: template.find('form [data-id=name]').value,
      position: template.find('form [data-id=position]').value,
      company: template.find('form [data-id=company]').value,
      phone: template.find('form [data-id=phone]').value,
      email: template.find('form [data-id=email]').value,
      website: template.find('form [data-id=website]').value,
      street: template.find('form [data-id=street]').value,
      postalCode: template.find('form [data-id=postal-code]').value,
      locality: template.find('form [data-id=locality]').value
    };

    if (!this._id) {
      Customers.insert({
        name: customer.name,
        position: customer.position,
        company: customer.company,
        phone: customer.phone,
        email: customer.email,
        website: customer.website,
        street: customer.street,
        postalCode: customer.postalCode,
        locality: customer.locality,
        modifiedAt: new Date()
      })
    } else {
      Customers.update(
        { _id : this._id },
        { $set:
          {
            name: customer.name,
            position: customer.position,
            company: customer.company,
            phone: customer.phone,
            email: customer.email,
            website: customer.website,
            street: customer.street,
            postalCode: customer.postalCode,
            locality: customer.locality,
            modifiedAt: new Date()
          }
        });
    }

    template.find('form [data-id=name]').value = '';
    template.find('form [data-id=position]').value = '';
    template.find('form [data-id=company]').value = '';
    template.find('form [data-id=phone]').value = '';
    template.find('form [data-id=email]').value = '';
    template.find('form [data-id=website]').value = '';
    template.find('form [data-id=street]').value = '';
    template.find('form [data-id=postal-code]').value = '';
    template.find('form [data-id=locality]').value = '';

    Session.set('selectedCustomer', {});

    window.scrollTo(0, 0);
  },

  'click button': function (event, template) {
    Session.set('selectedCustomer', {});
  }
});

Template.form.helpers({
  selectedCustomer: () => {
    return Session.get('selectedCustomer');
  },

  isCustomerSelected: () => {
    const selectedCustomer = Session.get('selectedCustomer');
    return selectedCustomer !== undefined &&  selectedCustomer._id;
  }
});
