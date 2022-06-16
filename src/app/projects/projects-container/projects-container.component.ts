import {
  Component,
  OnInit,
  OnDestroy,
  ChangeDetectionStrategy,
} from '@angular/core';
import { Project } from '../shared/project.model';
import { ProjectService } from '../shared/project.service';
import { Subject, Observable, Subscription } from 'rxjs';
import { debounceTime, distinctUntilChanged, switchMap } from 'rxjs/operators';
import { Store, select } from '@ngrx/store';

import { load, save } from '../shared/state/project.actions';
import {
  getProjects,
  getError,
  getLoading,
  getSaving,
} from '../shared/state/project.reducer';
import { State } from 'src/app/reducers';

@Component({
  selector: 'app-projects-container',
  templateUrl: './projects-container.component.html',
  styleUrls: ['./projects-container.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProjectsContainerComponent implements OnInit {
  projects$!: Observable<Project[]>;
  errorMessage$!: Observable<string>;
  loading$!: Observable<boolean>;
  saving$!: Observable<boolean>;
  private searchTerms = new Subject<string>();

  constructor(private store: Store<State>) {}

  ngOnInit() {
    this.projects$ = this.store.pipe(select(getProjects));
    this.errorMessage$ = this.store.pipe(select(getError));
    this.loading$ = this.store.pipe(select(getLoading));
    this.saving$ = this.store.pipe(select(getSaving));
    this.store.dispatch(load());
  }

  onSearch(term: string) {
    this.searchTerms.next(term);
  }

  onSaveListItem(event: any) {
    const project: Project = event.item;
    this.store.dispatch(save({ project }));
  }
}
