import { Component } from '@angular/core';
import { PhotoLibrary } from '@ionic-native/photo-library/ngx';
import { Deeplinks } from '@ionic-native/deeplinks/ngx';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {
  public appPages = [
    { title: 'Inbox', url: '/folder/Inbox', icon: 'mail' },
    { title: 'Outbox', url: '/folder/Outbox', icon: 'paper-plane' },
    { title: 'Favorites', url: '/folder/Favorites', icon: 'heart' },
    { title: 'Archived', url: '/folder/Archived', icon: 'archive' },
    { title: 'Trash', url: '/folder/Trash', icon: 'trash' },
    { title: 'Spam', url: '/folder/Spam', icon: 'warning' },
  ];
  public labels = ['Family', 'Friends', 'Notes', 'Work', 'Travel', 'Reminders'];
  constructor(private photoLibrary: PhotoLibrary, private deeplinks: Deeplinks) {

    this.photoLibrary.requestAuthorization({write: true})
      .then((value) => {
          console.log('Request Success: ', value);
      }, (err) => {
          console.log('Request Error: ', err);
    }).catch((err) => {
        console.log('Catch error: ', err);
    });

    this.deeplinks.route({
     }).subscribe(match => {
     console.log('Successfully matched route', match);
     }, nomatch => {
       console.error('Got a deeplink that didn\'t match', nomatch);
     })
  }
}
