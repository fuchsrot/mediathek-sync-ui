import { Component, OnInit } from '@angular/core';
import { Store } from '@ngxs/store';
import { LoadMedia, Media, MediaState } from '../../store';
import {toSignal} from '@angular/core/rxjs-interop'
import { MatListModule } from '@angular/material/list';
import { MatButtonModule } from '@angular/material/button'
import { MatIconModule } from '@angular/material/icon'
import {MatTooltipModule} from '@angular/material/tooltip';
import {MatSelectModule} from '@angular/material/select';
import {MatInputModule} from '@angular/material/input';

@Component({
  selector: 'app-media',
  standalone: true,
  imports: [MatListModule, MatButtonModule, MatIconModule, MatTooltipModule, MatSelectModule, MatInputModule],
  templateUrl: './media.component.html',
  styleUrl: './media.component.scss'
})
export class MediaComponent implements OnInit {

  private media$ = this.store.select(MediaState.getMedia)

  media = toSignal(this.media$);

  constructor(private readonly store: Store) { 
  }

  mapItemLine(media: Media): string {
    return `${media.status} | ${media.source.title} | ${media.creator}`;
  }

  canBeDownloaded(media: Media): boolean {
    return media.status === 'NEW';  
  }

  canBeDeleted(media: Media): boolean {
    return media.status === 'NEW' || media.status === 'SCHEDULED' || media.status === 'DOWNLOADED';  
  }

  ngOnInit(): void {
    this.store.dispatch(new LoadMedia())
  }

}
