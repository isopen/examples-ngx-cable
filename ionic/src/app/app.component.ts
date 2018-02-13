import { Component } from '@angular/core';
import { Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { TabsPage } from '../pages/tabs/tabs';

import { NgXCable, Broadcaster } from 'ngx-cable';

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  rootPage:any = TabsPage;

  constructor(
    platform: Platform,
    statusBar: StatusBar,
    splashScreen: SplashScreen,
    ngcable: NgXCable,
    broadcaster: Broadcaster
  ) {
    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      statusBar.styleDefault();
      splashScreen.hide();

      const back_ws_host = 'ws://localhost:28080';

      broadcaster.on(back_ws_host)
        .subscribe(
          response => {
            console.log(response);
          }
        );

      ngcable.connect(back_ws_host);

      const params = {
        channel: back_ws_host,
        room: '1'
      };

      ngcable.subscribe(params);

      params['room'] = '2';

      ngcable.subscribe(params);

    });
  }
}
