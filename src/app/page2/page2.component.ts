import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-page2',
  templateUrl: './page2.component.html',
  styleUrls: ['./page2.component.sass']
})
export class Page2Component {
  constructor(private rout: Router) {}

  back() {
    this.rout.navigateByUrl('/page1');
  }
}
