# Ionic Sample Project


## Features

- Pop up permission photos on first open
- Download image to photo album
- Open this app when found url scheme or registered domain

## Plugin

This project user these following plugin

- [Photo library wkwebview](https://www.npmjs.com/package/cordova-plugin-photo-library-wkwebview) - To download image to photo album and popup permission
- [Ionic Deeplink Plugin](https://ionicframework.com/docs/native/deeplinks) - To open apps from URL

## Open Popup Permission
On `app.component.ts` add this script to show popup permission

```sh
this.photoLibrary.requestAuthorization({write: true})
    .then((value) => {
        console.log('Request Success: ', value);
    }, (err) => {
        console.log('Request Error: ', err);
    }).catch((err) => {
        console.log('Catch error: ', err);
    });
```
## Download Image to Photos
On `folder.page.ts` add this script to download image

```sh
download(url){
    //show loading
  	this.loading = true;
  	
  	//save image to 'My Albums'
  	this.photoLibrary.saveImage(url, "My Albums").then(() => {
  		this.loading = false;
  		alert('Image has been saved successfully')
  	}, (err) => {
      console.log('Request Error: ', err);
      this.loading = false;
      
      //Show alert on failed download
      alert('Failed to download. Please change permission to All Photos')
      
      //Redirect to permission setting
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
```

## Open app while URL scheme founded

For installation you need to refer on their github (https://github.com/ionic-team/ionic-plugin-deeplinks)
```sh
cordova plugin add ionic-plugin-deeplinks
--variable URL_SCHEME=faqihamruddin --variable DEEPLINK_SCHEME=https --variable DEEPLINK_HOST=faqihamruddin.com
--variable ANDROID_PATH_PREFIX=/
```
`URL_SCHEME` - the custom URL scheme you'd like to use for your app. This lets your app respond to links like myapp://blah
`DEEPLINK_SCHEME` - the scheme to use for universal/app links. Defaults to 'https' in 1.0.13. 99% of the time you'll use https here as iOS and Android require SSL for app links domains.
`DEEPLINK_HOST` - the host that will respond to deeplinks. For example, if we want example.com/product/cool-beans to open in our app, we'd use example.com here.

> Important : You need to refer to ios setting (https://github.com/ionic-team/ionic-plugin-deeplinks#ios-configuration). You also need to have apple developer account

On `app.component.ts` add this script to subscribe URL. You can use it to open certain page on your app
```
this.deeplinks.route({
        '/about-us': HomePage,
        '/products/:productId': HelpPage
    }).subscribe((match) => {
        // match.$route - the route we matched, which is the matched entry from the arguments to route()
        // match.$args - the args passed in the link
        // match.$link - the full link data
        console.log('Successfully matched route', match);
    },
    (nomatch) => {
        // nomatch.$link - the full link data
        console.error('Got a deeplink that didn\'t match', nomatch);
    });
```
Your website (i.e. example.org) must provide this both files.
>/apple-app-site-association
/.well-known/apple-app-site-association

The content should contain your app.
```
{
  "applinks": {
    "apps": [],
    "details": [
      {
        "appID": "8EY9J4F5LN.com.frasamaya.sample",
        "paths": [
          "NOT \/api\/*",
          "*"
        ]
      }
    ]
  }
}
```
This means that all your requests - except /api - will be redirected to your app. Please replace 8EY9J4F5LN with your TEAM ID and com.frasamaya.sample with your Bundle-ID. (the id="" of your <widget />)

The last step is you need to place this url scheme on your page
```
<script>
    setTimeout(function(){ window.location="faqihamruddin://stackoverflow"; }, 1000);
</script>
```
change `faqihamruddin` with your registered URL_SCHEME, and stackoverflow with parameter you want to catch on your app
