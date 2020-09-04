/*
* Title: app.component.ts
* Author: Jeff Shepherd
* Modified by:
* Date: 9/1/2020
* Description: app component
*/

import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent {
  title = 'bobs-computer-repair';

  constructor(private fb: FormBuilder) {}

}
