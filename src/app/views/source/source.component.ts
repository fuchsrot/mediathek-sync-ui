import { Component, Input, OnInit } from '@angular/core';
import { SourceFormComponent, SourceFormDto } from '../../components';
import { ActivatedRoute } from '@angular/router';
import { Store } from '@ngxs/store';
import { LoadSources, SourcesState } from '../../store';
import { find, first, map, tap } from 'rxjs';
import { toSignal } from '@angular/core/rxjs-interop';

@Component({
  selector: 'app-source',
  standalone: true,
  imports: [
    SourceFormComponent
  ],
  templateUrl: './source.component.html',
  styleUrl: './source.component.scss'
})
export class SourceComponent implements OnInit {

  source$ = this.store.select(SourcesState.getSources).pipe(map(sources => {
    const {params} = this.activatedRoute.snapshot;
    const id = params['id']
    console.log(id)
    return sources.find(source => source.id === id)
   }));

   source = toSignal(this.source$);

  constructor(
    private readonly activatedRoute: ActivatedRoute,
    private readonly store: Store
  ) {}

  onFormResult(event: Event) {
    
  }
  
  ngOnInit(): void {
    //TODO Rout Guard ??
    const sourcesCount = this.store.selectSnapshot(SourcesState.getSources).length
    console.log(sourcesCount)
    if (sourcesCount === 0) {
      this.store.dispatch(new LoadSources())
    }
  }
}
