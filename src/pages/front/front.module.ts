//import { FootCardComponent } from './../../components/foot-card/foot-card';
import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { FrontPage } from './front';
import { FooterPage } from './../footer/footer';

@NgModule({
  declarations: [
    FrontPage,
    FooterPage,
  ],
  imports: [
    IonicPageModule.forChild(FrontPage),
    FooterPage,
  ],
})
export class FrontPageModule {}
