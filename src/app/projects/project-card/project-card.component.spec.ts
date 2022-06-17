import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { RouterTestingModule } from '@angular/router/testing';
import { TruncateStringPipe } from 'src/app/shared/truncate-string.pipe';
import { Project } from '../shared/project.model';

import { ProjectCardComponent } from './project-card.component';

describe('ProjectCardComponent', () => {
  let component: ProjectCardComponent;
  let fixture: ComponentFixture<ProjectCardComponent>;
  let nameHeading: HTMLElement;
  let descriptionParagraph: HTMLElement;
  let budgetParagraph: HTMLElement;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ProjectCardComponent, TruncateStringPipe],
      imports: [RouterTestingModule],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProjectCardComponent);
    component = fixture.componentInstance;
    component.project = new Project(
      1,
      'Mission Impossible',
      'This is really difficult.',
      'assets/placeimg_500_300_arch7.jpg',
      5,
      new Date(2015, 1, 2),
      30100,
      true,
      false
    );

    nameHeading = fixture.nativeElement.querySelector('h5');
    descriptionParagraph = fixture.nativeElement.querySelector('p');

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should display project when passed', () => {
    expect(nameHeading.textContent).toContain(component.project?.name);
    expect(descriptionParagraph.textContent).toContain(
      component.project?.description
    );
  });

  it('should emit a project when edit button is clicked 2', () => {
    component.edit.subscribe((event) => {
      expect(event.editingProject).toBe(component.project);
    });

    let editButtonDebugElement = fixture.debugElement.query(By.css('button'));
    editButtonDebugElement.triggerEventHandler('click', {
      preventDefault: () => {},
    });
  });
});
