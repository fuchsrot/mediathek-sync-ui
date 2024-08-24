import { Component } from '@angular/core';
import { RouterModule } from '@angular/router'
import {MatButtonModule} from '@angular/material/button';
import { MatListModule} from '@angular/material/list';

@Component({
  selector: 'app-sources',
  standalone: true,
  imports: [ 
    MatButtonModule,
    MatListModule,
    RouterModule
   ],
  templateUrl: './sources.component.html',
  styleUrl: './sources.component.scss'
})
export class SourcesComponent {

}
