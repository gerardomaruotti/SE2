# SE2 - Office Queue Management
# Server side

## API Server

- GET `/api/employee`
  - request parameters: none
  - response body content: list of employees identificated by id, name, surname and role 
- GET `/api/services`
  - request parameters: none
  - response body content: list of the services including id, type of the service and the time to serve it
- POST `/api/service`
  - request body content: a sevice Object, which contains the service type and its time 
  (it inserts a new service)
- POST `/api/helpdesk`
  - request body content: a helpdesk Object, which contains the service that we want to serve and the officer 
  (it inserts a new service)
- POST `/api/ticket`
  - request body content: contains the service we want to serve and the number of the help desk which it belongs to
  (it inserts a new ticket)


## Database Tables

- Table `employee` - contains the information of the employees (id_employee, name, surname, role)
- Table `service` - contains the list of services (id_service, service_type, service_time)
- Table `helpdesk` - contains the list of helpdesks (id_helpdesk, service, officer)
- Table `ticket` - contains all the tickets  (id_ticket, helpdesk, customer_number)


# Client side