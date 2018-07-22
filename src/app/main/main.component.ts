import {Component, OnInit} from '@angular/core';
import {AngularFireDatabase} from 'angularfire2/database';
import {Observable} from 'rxjs/internal/Observable';
import {} from '@types/googlemaps';
import {Place} from './Place';
import {AuthService} from '../auth.service';

@Component({
    selector: 'app-main',
    templateUrl: './main.component.html',
    styleUrls: ['./main.component.css']
})
export class MainComponent implements OnInit {
    map: any;
    marker: any;
    markers = [];
    list: Place[] = [
        {type: 'pharmacy'},
        {type: 'school'},
        {type: 'gas station'},
        {type: 'restaurants'}
    ];
    myLocation: any;
    service: any;
    places = [];
    userId: string;

    constructor(private db: AngularFireDatabase, private _aS: AuthService) {
        this._aS.authInfo.subscribe(user => this.userId = user.uid);
    }

    ngOnInit() {
        this.initMap();
    }

    initMap() {
        this.map = new google.maps.Map(document.getElementById('map'), {
            center: {lat: -34.397, lng: 150.644},
            zoom: 8
        });
        this.map.addListener('click', (event) => {
            this.addMarker(event.latLng);
        });

        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition((position) => {
                const pos = {
                    lat: position.coords.latitude,
                    lng: position.coords.longitude
                };
                this.map.setCenter(pos);
                this.map.setZoom(13);
                this.marker = new google.maps.Marker({position: pos, map: this.map, title: 'Your location!'});
                this.markers.push(this.marker);
            }, (err) => {
                console.log(err);
            });
        } else {
            // Browser doesn't support Geolocation
            console.log('Browser doesn\'t support Geolocation');
        }

        this.map.addListener('center_changed', () => {
            this.myLocation = this.map.getCenter();
        });
            this.service = new google.maps.places.PlacesService(this.map);
    }

    //--------------------------------------------------------------------------
    addMarker(location) {
        const marker = new google.maps.Marker({
            position: location,
            map: this.map
        });
        this.markers.push(marker);
    }

    // Places service

    showNearByPlace(type) {
        for (let i = 0; i < this.places.length; i++) {
            this.places[i].setMap(null);
        }
        this.places = [];
        console.log(type);
        this.service.nearbySearch({
            location: this.myLocation,
            radius: 2000,
            type: type
        }, (results, status) => {
            if (status === google.maps.places.PlacesServiceStatus.OK) {
                for (let i = 0; i < results.length; i++) {
                    this.createMarker(results[i]);
                }
            }
        });
    }

    createMarker(place) {
        let placeLoc = place.geometry.location;
        let marker = new google.maps.Marker({
            map: this.map,
            position: place.geometry.location
        });
        this.places.push(marker)
    }


    /* Managing markers in firebaseDB */

    saveMarkers() {
        this.markers.map((marker) => {
            const pos = {lat: marker.position.lat(), lng: marker.position.lng()};
            this.db.list(this.userId + '/markers').push(pos);
        });
    }

    showDbMarkers() {
        this.db.list(this.userId + '/markers')
            .valueChanges()
            .subscribe(markers => markers.map(pos => {
                const latLng = {lat: pos['lat'], lng: pos['lng']};
                const marker = new google.maps.Marker({
                    position: latLng,
                    map: this.map
                });
                this.markers.push(marker);
                }));
    }

    clearMapMarkers(){
        this.markers.map( marker => {
            marker.setMap(null);
        });
        this.markers = [];
    }

    clearDbMarkers() {
        this.db.list(this.userId + 'markers').remove();
        this.clearMapMarkers();
        this.markers = [];
    }
}
