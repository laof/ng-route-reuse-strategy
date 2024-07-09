import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-page1',
  templateUrl: './page1.component.html',
  styleUrls: ['./page1.component.scss'],
})
export class Page1Component {
  constructor(private rout: Router) {}

  goto() {
    this.rout.navigateByUrl('/page2');
  }
}
