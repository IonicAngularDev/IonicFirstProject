import { NgModule } from '@angular/core';
import { FootCardComponent } from './foot-card/foot-card';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
//import { IonicModule } from 'ionic-angular';

@NgModule({
	declarations: [FootCardComponent],
	imports: [IonicModule],
	exports: [FootCardComponent]
})

export class ComponentsModule {}
