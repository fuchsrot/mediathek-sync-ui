import { Action, Selector, State, StateContext } from "@ngxs/store";
import { Media, MediaStateModel } from "./media.model";
import { Injectable } from "@angular/core";
import { LoadMedia, SetMediaStatus, SetSourceFilter, SetStatusFilter, SetTitleFilter } from "./media.actions";
import { Observable, tap } from "rxjs";
import { ApiService } from "../../services/api.service";

@State<MediaStateModel>({
    name: "mediaState",
    defaults: {
        media: [],
        filter: undefined
    }
})
@Injectable()
export class MediaState {

    constructor(private apiService: ApiService) { }

    @Selector()
    static getMedia(state: MediaStateModel): Media[] {
        return state.media.filter(media => {
            if (state.filter?.source) {
                return state.filter?.source === media.source.id;
            }
            return true
        }).filter(media => {
            if (state.filter?.status) {
                return state.filter?.status === media.status;
            }
            return true
        }).filter(media => {
            if (state.filter?.title) {
                return media.title.toLocaleUpperCase().includes(state.filter?.title.toLocaleUpperCase());
            }
            return true
        });
    }

    @Action(LoadMedia)
    loadTasks(ctx: StateContext<MediaStateModel>): Observable<Media[]> {
        return this.apiService.loadMedia().pipe(tap(media => ctx.patchState({ media: [...media] })))
    }

    @Action(SetSourceFilter)
    setSourceFilter(ctx: StateContext<MediaStateModel>, {source}: SetSourceFilter): void {
        const {filter} = ctx.getState();
        ctx.patchState({filter: {...filter, source}});
    }

    @Action(SetStatusFilter)
    setStatusFilter(ctx: StateContext<MediaStateModel>, {status}: SetStatusFilter): void {
        const {filter} = ctx.getState();
        ctx.patchState({filter: {...filter, status}});
    }

    @Action(SetTitleFilter)
    setTitleFilter(ctx: StateContext<MediaStateModel>, {title}: SetTitleFilter): void {
        const {filter} = ctx.getState();
        ctx.patchState({filter: {...filter, title}});
    }

    @Action(SetMediaStatus)
    setMediaStatus(ctx: StateContext<MediaStateModel>, action: SetMediaStatus): void {
        const {media} = ctx.getState();
        const index = media.findIndex(({id}) => id === action.id)
        if (index > -1) {
            media[index].status = action.status 
            ctx.patchState({media: [...media]});
        }
    }
}