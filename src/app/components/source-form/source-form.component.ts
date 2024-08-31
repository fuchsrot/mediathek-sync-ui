import { Component, EventEmitter, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatSlideToggle } from '@angular/material/slide-toggle';
import { MatInputModule } from '@angular/material/input';
import { Source } from '../../store';

export interface SourceFormDto {
  title: string,
  url: string,
  autoDownload: boolean
}

@Component({
  selector: 'app-source-form',
  standalone: true,
  imports: [
    MatButtonModule,
    MatSlideToggle,
    MatInputModule,
    ReactiveFormsModule
  ],
  templateUrl: './source-form.component.html',
  styleUrl: './source-form.component.scss'
})
export class SourceFormComponent implements OnChanges {
 
  @Input()
  source?: Source;
  
  sourceForm = new FormGroup({
    'title': new FormControl('',[Validators.required]),
    'url': new FormControl('', [Validators.required]),
    'autoDownload': new FormControl()
  })

  formResult = new EventEmitter<SourceFormDto>()

  onSaveClick() {
    this.formResult.emit({
      title: this.sourceForm.get('title')!.value!,
      url: this.sourceForm.get('url')!.value!,
      autoDownload: this.sourceForm.get('autoDownload')!.value
    })
  }

  ngOnChanges(): void {
    if(this.source) {
      this.sourceForm.get('title')?.setValue(this.source.title)
      this.sourceForm.get('url')?.setValue(this.source.url)
      this.sourceForm.get('autoDownload')?.setValue(true) // TODO
    }
  }
}
