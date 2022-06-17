import { TestBed } from '@angular/core/testing';

import { ERROR_LOADING_PROJECTS, ProjectService } from './project.service';
import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment.prod';
import { MOCK_PROJECTS } from './mock-projects';

describe('ProjectService', () => {
  let service: ProjectService;
  let httpClient: HttpClient;
  let httpTestingController: HttpTestingController;
  let projectsUrl: string;

  beforeEach(() => {
    TestBed.configureTestingModule({ imports: [HttpClientTestingModule] });
    service = TestBed.inject(ProjectService);
    httpClient = TestBed.inject(HttpClient);
    httpTestingController = TestBed.inject(HttpTestingController);
    projectsUrl = environment.backendUrl + '/projects/';
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should list projects', () => {
    service.list().subscribe((data) => {
      expect(data).toEqual(MOCK_PROJECTS);
    });

    const request = httpTestingController.expectOne(projectsUrl);
    request.flush(MOCK_PROJECTS);
  });

  it('should return a user friendly error when listing projects', () => {
    service.list().subscribe({
      next: (data) => {
        fail('expected an error');
      },
      error: (error) => {
        expect(error).toEqual(ERROR_LOADING_PROJECTS);
      },
    });

    const request = httpTestingController.expectOne(projectsUrl);
    const body = 'The requested URL was not found on the server.';
    request.flush(body, { status: 404, statusText: 'Not Found' });
  });

  afterEach(() => httpTestingController.verify());
});
