
so this application is spring-boot angular based.

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
      
