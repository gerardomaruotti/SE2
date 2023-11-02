TEMPLATE FOR RETROSPECTIVE (Team ##)
=====================================

The retrospective should include _at least_ the following
sections:

- [process measures](#process-measures)
- [quality measures](#quality-measures)
- [general assessment](#assessment)

## PROCESS MEASURES 

### Macro statistics

- Number of stories committed vs. done
  <br>Stories committed: 2
  <br>Stories done: 2
- Total points committed vs. done
  <br>Points committed: 6
  <br>Points done: 6 
- Nr of hours planned vs. spent (as a team)
  <br>Hours planned: 35h 30m
  <br>Hours spent: 51h 20m

**Remember** a story is done ONLY if it fits the Definition of Done:
 
- Unit Tests passing
- Integration Test passing
- Code review completed
- Code present on VCS
- End-to-End tests performed
- Documentation completed


> Please refine your DoD if required (you cannot remove items!) 

### Detailed statistics

| Story  | # Tasks | Points | Hours est. | Hours actual |
|--------|---------|--------|------------|--------------|
| #0 Admin configure counter   |      6   |    3   |    10h 30m        |     15h 20m         | 
|    | #0 GUI implementation | --- | 1h 30m | 5h |
|    | #1 Write unit test | --- | 1h 30m | 2h |
|    | #2 Write integration test | --- | 1h 30 | 2h |
|    | #3 frontend selection | --- | 3h | 2h |
|    | #4 update documentation | --- | 1h | 1h 20m |
|    | #5 define client APIs | --- | 2h | 3h |
| #1 Ticket request      |   6      |    3    |     7h       |      11h 45m        |
|    | #0 Admin frontend | --- | 30m | 3h |
|    | #1 Write unit test | --- | 1h | 2h |
|    | #2 Write integration test | --- | 1h | 2h |
|    | #3 GUI implementation | --- | 1h 30m | 1h |
|    | #4 Update documentation | --- | 1h | 45m |
|    | #5 Define Administator APIs | --- | 2h | 3h |
   

> place technical tasks corresponding to story `#0` and leave out story points (not applicable in this case)

- Hours per task average, standard deviation (estimate and actual)
<br><br> - Task #0: 
<br>Hours per task average (estimate) = 1h 45m
<br>Hours per task average (actual) = 2h 30m
<br>Standard deviation (estimate) = 0.63h
<br>Standard deviation (actual) = 1.2h
<br><br> - Task #1: 
<br>Hours per task average (estimate) = 1h 10m
<br>Hours per task average (actual) = 1h 57m
<br>Standard deviation (estimate) = 0.47h
<br>Standard deviation (actual) = 0.87h
<br><br>- General: 
<br>Hours per task average (estimate) = 1h 27m
<br>Hours per task average (actual) = 2h 15m
<br>Standard deviation (estimate) = 0.62h
<br>Standard deviation (actual) = 1.09h

- Total task estimation error ratio: sum of total hours estimation / sum of total hours spent - 1
<br><br> - Task #0: -0.31 
<br><br> - Task #1: -0.4
<br><br> - General: -0.35

  
## QUALITY MEASURES 

- Unit Testing:
  - Total hours estimated: 4h 30m 
  - Total hours spent: 6h
  - Nr of automated unit test cases: 17
  - Coverage (if available): 100% statement coverage
- E2E testing: (integration)
  - Total hours estimated: 4h 30m 
  - Total hours spent: 7h
- Code review 
  - Total hours estimated : 2h
  - Total hours spent: 1h
  


## ASSESSMENT

- What caused your errors in estimation (if any)?
> Initially, we tried to estimate fewer hours, considering the possibility of encountering issues or making incorrect estimates. We underestimated the frontend development, which took more hours than expected due to several ongoing changes. Managing the APIs also took more time than anticipated because the need arose to create additional APIs that were not initially planned, or to modify the database. Lastly, creating a suitable environment for testing server functionalities turned out to be more challenging than expected and consumed several extra hours.

- What lessons did you learn (both positive and negative) in this sprint?
>We have learned greater adaptability in responding to needs from other team members. Furthermore, we have realized how essential communication among ourselves is to enhance mutual productivity. We also understood the importance of testing and how crucial it is to anticipate it as early as possible. Finally, we recognized how crucial thorough upfront planning can be.

- Which improvement goals set in the previous retrospective were you able to achieve? 
  
- Which ones you were not able to achieve? Why?

- Improvement goals for the next sprint and how to achieve them (technical tasks, team coordination, etc.)

  > 1) Greater comunication. 
  > 2) Better initial planning.

- One thing you are proud of as a Team!!
<br>Great adaptability and excellent teamwork.