import { Component, AfterViewInit, ViewChild, ElementRef } from '@angular/core';
import { Loader } from '@googlemaps/js-api-loader';
import {} from 'googlemaps';

@Component({
  selector: 'app-maps',
  standalone: true,
  templateUrl: './maps.component.html',
  styleUrls: ['./maps.component.scss']
})
export class MapsComponent implements AfterViewInit {
  title = 'angular-gmap';

  @ViewChild('mapContainer') gmap!: ElementRef;

  
  locations: { lat: number, lng: number, title: string, status: string }[] = [
    { lat: 35.3078805, lng: -120.6604171, title: "California Coastal National Monument", status: "active" },
    { lat: 34.052235, lng: -118.243683, title: "Los Angeles", status: "inactive" }, 
    { lat: 37.774929, lng: -122.419418, title: "San Francisco", status: "active" },  
    { lat: 40.712776, lng: -74.005974, title: "New York", status: "inactive" },      
    
  ];

  map!: google.maps.Map;
  lat = 35.3078805;
  lng = -120.6604171;
  coordinates = new google.maps.LatLng(this.lat, this.lng);

  mapOptions: google.maps.MapOptions = {
    center: this.coordinates,
    zoom: 4, 
    mapTypeId: "roadmap"
  };

  
  activeIcon = {
    url: 'http://maps.google.com/mapfiles/ms/icons/green-dot.png',  
  };
  inactiveIcon = {
    url: 'http://maps.google.com/mapfiles/ms/icons/red-dot.png',   
  };

  ngAfterViewInit() {
    if (this.gmap) {
      this.mapInitializer();
    } else {
      console.log("Error in ngAfterViewInit");
    }
  }

  mapInitializer() {
    if (this.gmap?.nativeElement) {
      this.map = new google.maps.Map(this.gmap.nativeElement, this.mapOptions);

      
      this.locations.forEach(location => {
        const marker = new google.maps.Marker({
          position: new google.maps.LatLng(location.lat, location.lng),
          map: this.map,
          icon: location.status === 'active' ? this.activeIcon : this.inactiveIcon,  
        });

       
        const infoWindow = new google.maps.InfoWindow({
          content: `
          <h3>Status: ${location.status}</h3> 
          <h3>${location.title}</h3>`,
        });

        
        marker.addListener('mouseover', () => {
          infoWindow.open(this.map, marker);
        });

        
        marker.addListener('mouseout', () => {
          infoWindow.close();
        });
      });
    } else {
      console.error('Map container not found.');
    }
  }
}
