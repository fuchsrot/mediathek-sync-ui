import { Component, OnInit } from '@angular/core';
import { Store } from '@ngxs/store';
import { CreateTask, LoadMedia, LoadSources, Media, MediaState, SetMediaStatus, SetSourceFilter, SetStatusFilter, SetTitleFilter, SourcesState, Type } from '../../store';
import {toSignal} from '@angular/core/rxjs-interop'
import { MatListModule } from '@angular/material/list';
import { MatButtonModule } from '@angular/material/button'
import { MatIconModule } from '@angular/material/icon'
import {MatTooltipModule} from '@angular/material/tooltip';
import {MatSelectChange, MatSelectModule} from '@angular/material/select';
import {MatInputModule} from '@angular/material/input';
import {CommonModule} from '@angular/common'
import { ActivatedRoute, Params, Router } from '@angular/router';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms'
import { pairwise } from 'rxjs';

@Component({
  selector: 'app-media',
  standalone: true,
  imports: [
    MatListModule,
    MatButtonModule,
    MatIconModule,
    MatTooltipModule,
    MatSelectModule,
    MatInputModule,
    CommonModule,
    ReactiveFormsModule
  ],
  templateUrl: './media.component.html',
  styleUrl: './media.component.scss'
})
export class MediaComponent implements OnInit {

  private media$ = this.store.select(MediaState.getMedia)

  media = toSignal(this.media$);

  private sources$ = this.store.select(SourcesState.getSources)

  sources = toSignal(this.sources$);

  filterForm = new FormGroup({
    source: new FormControl(),
    status: new FormControl(),
    title: new FormControl()
  })

  sourceSelectSubscription = this.filterForm.get('source')?.valueChanges.subscribe(source => {
    this.router.navigate([], {
      relativeTo: this.activatedRoute,
      queryParams: {source},
      queryParamsHandling: 'merge'
    })
  })

  statusSelectSubscription = this.filterForm.get('status')?.valueChanges.subscribe(status => {
    console.log('status: ' + status)
    this.router.navigate([], {
      relativeTo: this.activatedRoute,
      queryParams: {status},
      queryParamsHandling: 'merge'
    })
  })

  titleInputSubscription = this.filterForm.get('title')?.valueChanges.subscribe(title => {
    console.log('title: ' + title)
    const encodedTitle = title !== '' ? encodeURI(title) : null
    console.log('encodedTitle: ' + encodedTitle)
    this.router.navigate([], {
      relativeTo: this.activatedRoute,
      queryParams: {'title': encodedTitle},
      queryParamsHandling: 'merge'
    })
  })

  constructor(
    private readonly store: Store,
    private readonly activatedRoute: ActivatedRoute,
    private readonly router: Router
  ) {
    activatedRoute.queryParams.subscribe((params: Params) => {
      const source = params['source'];
      const title = params['title'];
      const status = params['status'];
      // source
      this.filterForm.get('source')?.setValue(source)
      this.store.dispatch(new SetSourceFilter(source));
    
      // status
      this.filterForm.get('status')?.setValue(status, {emitEvent: false})
      this.store.dispatch(new SetStatusFilter(status));
     
      // title
      const decodedUri = title ? decodeURI(title) : ''
      this.filterForm.get('title')?.setValue(decodedUri, {emitEvent: false})
      this.store.dispatch(new SetTitleFilter(decodedUri));
      
    })
  }


  mapItemLine(media: Media): string {
    return `${media.status} | ${media.source.title} | ${media.creator}`;
  }

  canBeDownloaded(media: Media): boolean {
    return media.status === 'NEW';  
  }

  canBeDeleted(media: Media): boolean {
    return media.status === 'NEW' || media.status === 'DOWNLOADED';  
  }

  onDownloadClick(mediaId: string) {
    this.store.dispatch([new CreateTask(mediaId, Type.DOWNLOAD_MEDIA), new SetMediaStatus(mediaId, 'SCHEDULED')])
  }

  onDeleteClick(mediaId: string) {
    this.store.dispatch([new CreateTask(mediaId, Type.DELETE_FILE), new SetMediaStatus(mediaId, 'SCHEDULED')])
  }


  ngOnInit(): void {
    this.store.dispatch([new LoadMedia(), new LoadSources()]);
  }

}
