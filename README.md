The application is spring-boot angular based.

first run postgres docker instance on port 5432 by command.

    docker run -p 5432:5432 postgres:12
   
wherever your postgres is running, add that VM ipaddress in 
application.yml file


and spring-boot server is 5000
    
    run that OnlineLockerApplication.main method from IntelliJ
    

angular UI application is running on 4200
   ________
    
    ! for first time, need to install node dependencies
    
       cd ui
       npm install
   
   ________
   ! and for launching that
   
       cd ui
       npm start
   
   ________

#############################################################

Naming conventions and project architecture used in this project.

    - there are 2 projects api and ui.
    - api folder is spring boot maven project
    - For defining resource endpoints, we have named the files as EntityController where entity is a 
        database level table name.
    - For performing CRUD operation, EntityRepository class name is used. It internally uses Hibernate 
        EntityManager to execute database queries.
    - A class which solves a level of difficulties, we name that class as Service. Like FileService which 
        helps us in saving, getting and removing from OS file system.
    - inside com.locker package, every folder internally classes which belong to that specific context.
        like "user" package will contain the User entity controller, repository, entity.
    - Inside a particular class, the methods are named in a verb form. like uploadFile() will upload a file to 
        server's directory.
    - Since we have used spring-boot dependency injection framework, spring-boot takes care of 
        instantiating and injecting the @Services dependencies into other classes via @Autowired annotation.
    - 
    
    - ui folder is angular 5 project
    - Inside /ui/src/app is there will store every component designing.
    - File are arranged in functionality wise folders. dashboard folder will contain
        uploading/viewing of files
    - decision folder contains the top menubar and secured component loader for the application. 
    
 
    


      
