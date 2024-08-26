import { Action, State, StateContext } from "@ngxs/store";
import { Media, MediaStateModel } from "./media.model";
import { Injectable } from "@angular/core";
import { LoadMedia } from "./media.actions";
import { Observable, tap } from "rxjs";

@State<MediaStateModel>({
    name: "mediaState",
    defaults: {
        media: []
    }
})
@Injectable()
export class MediaState {

    @Action(LoadMedia)
    loadTasks(ctx: StateContext<MediaStateModel>): Observable<Media[]> {
        return this.apiService.loadMedia().pipe(tap(media => ctx.patchState({ media: [...media] })))
    }
}