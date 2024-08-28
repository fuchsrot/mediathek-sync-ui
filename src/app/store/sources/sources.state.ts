import { Action, Selector, State, StateContext } from "@ngxs/store";
import { Source, SourcesStateModel } from "./sources.model";
import { Injectable } from "@angular/core";
import { LoadSources } from "./sources.actions";
import { Observable, tap } from "rxjs";
import { ApiService } from "../../services/api.service";


@State<SourcesStateModel>({
    name: "sourcesState",
    defaults: {
        sources: []
    }
})
@Injectable()
export class SourcesState {

    constructor(private apiService: ApiService) { }

    @Selector()
    static getSources(state: SourcesStateModel): Source[] {
        return state.sources;
    }

    @Action(LoadSources)
    loadSources(ctx: StateContext<SourcesStateModel>): Observable<Source[]> {
        console
        return this.apiService.loadSources().pipe(tap(sources => ctx.patchState({ sources: [...sources] })))
    }
}