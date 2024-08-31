import { Component, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router'
import {MatButtonModule} from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule} from '@angular/material/list';
import { Store } from '@ngxs/store';
import { LoadSources, SourcesState } from '../../store';
import {toSignal} from '@angular/core/rxjs-interop'


@Component({
  selector: 'app-sources',
  standalone: true,
  imports: [ 
    MatButtonModule,
    MatListModule,
    RouterModule,
    MatIconModule
   ],
  templateUrl: './sources.component.html',
  styleUrl: './sources.component.scss'
})
export class SourcesComponent implements OnInit {

  private sources$ = this.store.select(SourcesState.getSources)

  sources = toSignal(this.sources$)

  constructor(private readonly store: Store) {
  }

  onDeleteClick(arg0: string) {
    throw new Error('Method not implemented.');
  }

  ngOnInit(): void {
    this.store.dispatch(new LoadSources())
  }

}
