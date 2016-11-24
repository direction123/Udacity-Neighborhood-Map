var raw_place_list = [
    {
        name: "McKay's",
        lat: 34.019718,
        lng: -118.280888
    },
    {
        name: "Soy Japanese Grill & Roll",
        lat: 34.023426,
        lng: -118.279665
    },
    {
        name: "Taco Bell",
        lat: 34.026808,
        lng: -118.276319
    },
    {
        name: "BCD Tofu House",
        lat: 34.063911,
        lng: -118.302605
    },
    {
        name: "Kobawoo Restaurant",
        lat: 34.062560,
        lng: -118.291189
    },
    {
        name: "Road to Seoul",
        lat: 34.050827,
        lng: -118.309214
    }
];

var place = function (data) {
	var self = this;
    self.name = data.name;
    self.lat = data.lat;
    self.lng = data.lng;
    this.marker = ko.observable();
};

var map;
function initMap() {
	map = new google.maps.Map(document.getElementById('map'), {
	  center: {lat: 34.043911, lng: -118.302605},
	  zoom: 13
	});
	ko.applyBindings(new placeListModel());
}

var placeListModel = function () {
	var self = this;
	//input in the search bar
	self.search_input= ko.observable("");
	//initialize all places
	self.place_list = ko.observableArray([]);
   	raw_place_list.forEach(function (place_item) {
   		self.place_list.push(new place(place_item));
    });

   	//add google map related properties to places
    var marker;
    var infoWindow;
    self.place_list().forEach(function (place_item) {
        marker = new google.maps.Marker({
          position: new google.maps.LatLng(Number(place_item.lat), Number(place_item.lng)),
          map: map
        });
        place_item.marker = marker;

        infoWindow = new google.maps.InfoWindow();
	  	google.maps.event.addListener(marker, 'click', function(){
	  		infoWindow.open(map, this);
	  		infoWindow.setContent(place_item.name);
	  	});
    });

    //initialize all visible places
    self.visible_place_list = ko.observableArray([]);
    self.place_list().forEach(function (place_item) {
        self.visible_place_list.push(place_item);
    });
    //filter places with input in the search bar
    self.filter_places = function() {
    	//set all visible markers not visible
    	self.visible_place_list().forEach(function (place_item) {
    		place_item.marker.setVisible(false);
	    });
	    //remove all visible places
    	self.visible_place_list.removeAll();
    	//add current visible palces
    	var search_input = self.search_input().toLowerCase();
    	self.place_list().forEach(function (place_item) {
    		if (place_item.name.toLowerCase().indexOf(search_input) !== -1) { 
    			self.visible_place_list.push(place_item);
    		}
	    });
	    self.visible_place_list().forEach(function (place_item) {
	        place_item.marker.setVisible(true);
	    });
    };
};
 







