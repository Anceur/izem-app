import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';

@Component({
  selector: 'app-pageone',
  standalone: true,
  imports: [CommonModule, IonicModule],
  templateUrl: './pageone.component.html',
  styleUrls: ['./pageone.component.scss'],
})

export class PageoneComponent implements OnInit {
  constructor() {}
  ngOnInit() {}
}
