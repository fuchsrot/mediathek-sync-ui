import { Action, Selector, State, StateContext } from "@ngxs/store";
import { Media, MediaStateModel } from "./media.model";
import { Injectable } from "@angular/core";
import { LoadMedia } from "./media.actions";
import { Observable, tap } from "rxjs";
import { ApiService } from "../../services/api.service";

@State<MediaStateModel>({
    name: "mediaState",
    defaults: {
        media: []
    }
})
@Injectable()
export class MediaState {

    constructor(private apiService: ApiService) { }

    @Selector()
    static getMedia(state: MediaStateModel): Media[] {
        console.log(state)
        return state.media;
    }

    @Action(LoadMedia)
    loadTasks(ctx: StateContext<MediaStateModel>): Observable<Media[]> {
        return this.apiService.loadMedia().pipe(tap(media => ctx.patchState({ media: [...media] })))
    }
}