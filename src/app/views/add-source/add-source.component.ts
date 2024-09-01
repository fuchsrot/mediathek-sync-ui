import { Component } from '@angular/core';
import { SourceFormComponent, SourceFormDto } from '../../components'

@Component({
  selector: 'app-add-source',
  standalone: true,
  imports: [
    SourceFormComponent
  ],
  templateUrl: './add-source.component.html',
  styleUrl: './add-source.component.scss'
})
export class AddSourceComponent {

  onFormResult(event: Event) {
    
  }
}
