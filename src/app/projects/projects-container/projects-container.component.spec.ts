import {
  ComponentFixture,
  fakeAsync,
  TestBed,
  tick,
} from '@angular/core/testing';
import { Observable, of } from 'rxjs';
import { Project } from '../shared/project.model';
import { MOCK_PROJECTS } from '../shared/mock-projects';
import { ProjectsContainerComponent } from './projects-container.component';
import { ProjectService } from '../shared/project.service';
import { Component, Input } from '@angular/core';

class ProjectServiceStub {
  listByName(name: string): Observable<Project[]> {
    return of(MOCK_PROJECTS);
  }
}

@Component({
  selector: 'app-project-list',
  template: '',
})
class ProjectListStubComponent {
  @Input()
  projects: Project[] = [];
}

describe('ProjectsContainerComponent', () => {
  let component: ProjectsContainerComponent;
  let fixture: ComponentFixture<ProjectsContainerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ProjectsContainerComponent, ProjectListStubComponent],
      providers: [{ provide: ProjectService, useClass: ProjectServiceStub }],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProjectsContainerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have projects', async () => {
    await fixture.whenStable();
    expect(component.projects.length).toEqual(7);
  });

  it('should have projects 2', fakeAsync(() => {
    component.ngOnInit();
    tick(300); //debounce time
    expect(component.projects.length).toEqual(7);
  }));
});
