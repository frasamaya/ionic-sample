import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { PhotoLibrary } from '@ionic-native/photo-library/ngx';

@Component({
  selector: 'app-folder',
  templateUrl: './folder.page.html',
  styleUrls: ['./folder.page.scss'],
})
export class FolderPage implements OnInit {
  public folder: string;
  loading:any = false;
  public image : any = [
    {
      "description":"Lady with a red umbrella",
      "image":"http://www.imageafter.com/dbase/images/objects/b19objects166.jpg"
    },
    {
      "description":"Flowers and some fruits",
      "image":"http://www.freeimageslive.com/galleries/home/playroom/pics/objects00016g.jpg"
    },
    {
      "description":"Beautiful scenery",
      "image":"http://fc03.deviantart.net/fs71/i/2013/082/6/c/png_candle_by_moonglowlilly-d5z1n6w.png"
    },
    {
      "description":"Some kind of bird",
      "image":"http://www.imageafter.com/dbase/images/objects_household/b11objects_household005.jpg"
    },
    {
      "description":"The attack of dragons",
      "image":"http://www.imageafter.com/dbase/images/objects_household/b13objects_household036.jpg"
    }
    
  ];
  constructor(private photoLibrary: PhotoLibrary, private activatedRoute: ActivatedRoute) { }

  ngOnInit() {
    this.folder = this.activatedRoute.snapshot.paramMap.get('id');
  }
  download(url){
  	this.loading = true;
  	this.photoLibrary.saveImage(url, "My Albums").then(() => {
  		this.loading = false;
  		alert('Image has been saved successfully')
  	}, (err) => {
      console.log('Request Error: ', err);
      this.loading = false;
      alert('Failed to download. Please change permission to All Photos')
      this.photoLibrary.requestAuthorization({write: true})
        .then((value) => {
            console.log('Request Success: ', value);
        }, (err) => {
            console.log('Request Error: ', err);
      }).catch((err) => {
          console.log('Catch error: ', err);
      });
    }).catch((err) => {
      console.log('Catch error: ', err);
    });
  }
}
