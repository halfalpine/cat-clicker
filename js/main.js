$(function() {

  let data = {
    lastCat: null,
    currentCat: 0,
    admin: false,
    cats: [{
      id: 0,
      url: 'images/cat1.jpg',
      name: 'Liam',
      clicks: 0
    }, {
      id: 1,
      url: 'images/cat2.jpg',
      name: 'Noah',
      clicks: 0
    }, {
      id: 2,
      url: 'images/cat3.jpg',
      name: 'Ethan',
      clicks: 0
    }, {
      id: 3,
      url: 'images/cat4.jpg',
      name: 'Mason',
      clicks: 0
    }, {
      id: 4,
      url: 'images/cat5.jpg',
      name: 'Lucas',
      clicks: 0
    }, {
      id: 5,
      url: 'images/cat6.jpg',
      name: 'Logan',
      clicks: 0
    }, {
      id: 6,
      url: 'images/cat7.jpg',
      name: 'Oliver',
      clicks: 0
    }, {
      id: 7,
      url: 'images/cat8.jpg',
      name: 'Jackson',
      clicks: 0
    }, {
      id: 8,
      url: 'images/cat9.jpg',
      name: 'Aiden',
      clicks: 0
    }, {
      id: 9,
      url: 'images/cat10.jpg',
      name: 'Jacob',
      clicks: 0
    }]
  };

  let octopus = {
    selectCat: function(num) {
      data.lastCat = data.currentCat;
      data.currentCat = num;
      if (data.lastCat !== data.currentCat) {
        view.renderCat(data.cats[num], data.lastCat, data.currentCat);
      }
    },
    clickCat: function() {
      data.cats[data.currentCat].clicks++;
      view.renderClick(data.cats[data.currentCat].clicks);
    },
    toggleAdmin: () => view.renderAdmin(),

    validateAdmin: function() {
      octopus.saveAdmin();
    },
    saveAdmin: function() {
      // Functions to update each of the relevant data fields
      let i = data.currentCat;
      data.cats[i].name = $('#name-input').val() || data.cats[i].name;
      data.cats[i].url = $('#url-input').val() || data.cats[i].url;
      data.cats[i].clicks = $('#clicks-input').val() || data.cats[i].clicks;
      view.renderCat(data.cats[i], data.lastCat, i);
      view.renderClear();
    },
    init: function() {
      view.init();
    }
  };

  let view = {
    init: function() {
      // Populate list of cats
      let items = [];
      $.each(data.cats, function(index, item) {
        items.push('<li data-id="' + item.id + '" class="cat-item"><img class="small-cat-pic" src="' + item.url + '" alt="cat icon"/><span class="cat-name"> ' + item.name + '</span></li>');
      });
      $('#cat-list').html(items.join(''));

      // Populate the big-cat view
      $('li').eq(0).addClass('cat-border');
      $('#big-cat-pic').attr('src', data.cats[0].url);
      $('#big-cat-name').html(data.cats[0].name);
      $('#ticker').html(data.cats[0].clicks);

      // Add listener for click on .cat-name, call selectCat
      $('.cat-item').on('click', function() {
        let catNum = $(this).data('id');
        octopus.selectCat($(this).data('id'));
      });

      // Add event listener for current cat, call clickCat
      $('#big-cat-pic').on('click', octopus.clickCat);

      // Add event listener for admin controls
      $('#admin-button, #cancel-button').on('click', octopus.toggleAdmin);
      $('#save-button').on('click', octopus.validateAdmin);
    },

    renderCat: function(catObj, lastCatNum, currentCatNum) {
      $('li').eq(lastCatNum).removeClass('cat-border');
      $('li').eq(currentCatNum).addClass('cat-border');
      $('#big-cat-pic').attr('src', catObj.url);
      $('#big-cat-name').text(catObj.name);
      $('#ticker').text(catObj.clicks);

    },
    renderClick: function(num) {
      $('#ticker').text(num);
    },

    renderAdmin: function(showAdmin) {
      $('#admin-form').toggle();
    },

    renderClear: function() {
      $('#name-input').val('');
      $('#url-input').val('');
      $('#clicks-input').val('');
    }
  }

ko.applyBindings(data);
octopus.init();
}());
