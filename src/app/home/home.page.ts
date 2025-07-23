import { Component } from '@angular/core';
import { NavController } from '@ionic/angular';
import { IonHeader, IonToolbar, IonTitle, IonContent, IonIcon, IonBadge, IonFabButton, IonFab, IonText, IonCardContent, IonCard, IonButtons, IonButton, IonLabel, IonChip, IonProgressBar, IonApp } from '@ionic/angular/standalone';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
  imports: [IonApp, IonProgressBar, IonChip, IonLabel, IonButton, IonButtons, IonCard, IonCardContent, IonText, IonFab, IonFabButton, IonBadge, IonIcon, IonHeader, IonToolbar, IonTitle, IonContent],
})
export class HomePage {
  progressValue: number = 0;
  bufferValue: number = 0.1;

  constructor(private navCtrl: NavController) {
    this.simulateProgress();
  }

  simulateProgress() {
    const interval = setInterval(() => {
      if (this.progressValue < 1) {
        this.progressValue += 0.01;
        this.bufferValue = Math.min(1, this.progressValue + 0.1);
      } else {
        clearInterval(interval);
        // التنقل إلى الصفحة التالية عند انتهاء التحميل
        this.navigateToNextPage();
      }
    }, 100); // every 100ms
  }

  navigateToNextPage() {
    // التنقل باستخدام NavController
    this.navCtrl.navigateForward('/page');
    
    // أو يمكنك استخدام navigateRoot للانتقال إلى الصفحة الجذر:
    // this.navCtrl.navigateRoot('/main');
  }
}