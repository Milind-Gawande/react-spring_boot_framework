# react-spring_boot_framework
Normal Application build with react and spring boot.
Users can see the live project by following the below link:
http://react-springboot-react-springboot.193b.starter-ca-central-1.openshiftapps.com/

Hi guys,

I have made a simple application on React as frontend and Spring boot framework as backend.
Each and every persons inputs are welcome if you see any error/exception in the application.

Application smoothly runs on (desktop) firefox and chrome browser as i had used display:flex.
There are flex webkits for other browser which I had not specified in the css file that would support cross-browser
compatability. You can experiment with it and also can share with others if you can.
Currently the layouts are fixed. Will keep on updating the code for liquid layout so that if the window get re-size, the elements
inside it will change it dimension with respective to it.



INSTALLATION STEPS TO DEPLOY THE APPLICATION ON COMPUTER:

Pre-requisites: JDK should be already installed on your computer. Without it, the following command will be useless.

1. Download the apache-maven binary zip file from the below link:
   http://maven.apache.org/download.cgi
   
2. Once download the zip file. Extract it.

   Set the below environment variables:
   
   M2_HOME :   H:\apache-maven-3.5.4-bin\apache-maven-3.5.4
   MAVEN_HOME: H:\apache-maven-3.5.4-bin\apache-maven-3.5.4
   PATH:       %M2_HOME%\bin
   
3. Now open the Command Prompt.
   
   Check the version of maven by entering the command:
   mvn -version

   
 4. Once you follow all the above steps. Download the zip file of react-spring_boot project from github. Unzip the file on your computer
    Now open the command prompt and change the directory to the path where the src(folders) etc are present. 
	Ex: {cd C:\Users\sony vaio\Desktop\STS_proj\github\react-spring_boot}
	
	Once the path is changed. Execute the following command
	1. mvn clean install
	
	2. Once you run the command {mvn clean install}, wait till the message with BUILD SUCCESSFUL display on command prompt.
	3. A jar file(e.g. courseapi-database-0.0.1-SNAPSHOT.jar) will get created in the target folder.
	4. After build get successful. Run the following command on the same path where you run the command(mvn clean install)
	   
	   java -jar target/courseapi-database-0.0.1-SNAPSHOT.jar 
	   
	5. You will see the message "Tomcat started on port:8080" displayed on command prompt.
	6. Now open either chrome or firefox browser on your computer and enter the url (http://localhost:8080) on address bar.
	7. Application will get loaded. You can play with it.
	8. There is a form(that doesnot use form tag) to fill which had three inputs and also drop down to update the id. 
	   Check what happen after the form is submitted. Does the UI get updated 
	   dynamically. I have applied some regular expression on input validation to check if the criteria gets satisfied before proceeding to next step.
	   
	   
IMPORTANT NOTES:
1. Embedded database(Derby) is being used which will be reset or drops the table internally if user kill the application and restart again. 
   Data will be flush out and wont be displayed if the application tomcat is restarted.
2. I have also developed the same react-application that is integrated with node.js(backend) and connected with external (SQL Server). 
   INSTALLATION steps for it are mention in its respective document. You can visit on the following link:
   https://github.com/Milind-Gawande/react-node



	   
	   
	   
