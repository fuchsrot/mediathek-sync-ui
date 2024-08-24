import { Component } from '@angular/core';
import {MatInputModule} from '@angular/material/input';
import {MatButtonModule} from '@angular/material/button';
import {MatFormFieldModule} from '@angular/material/form-field';
import {FormsModule} from '@angular/forms';

@Component({
  selector: 'app-add-source',
  standalone: true,
  imports: [
    MatInputModule,
    MatFormFieldModule,
    FormsModule,
    MatButtonModule
  ],
  templateUrl: './add-source.component.html',
  styleUrl: './add-source.component.scss'
})
export class AddSourceComponent {

}
