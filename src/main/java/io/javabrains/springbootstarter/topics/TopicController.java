package io.javabrains.springbootstarter.topics;


import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class TopicController {

	@Autowired //used to inject the topic service as the property of topic controller
	private TopicService topics;
	
	@RequestMapping("/api/topics")
	public List<Topics> allTopics() {
		return topics.getAllTopics();
	}
	
	//Access single topic through url with variable in the path
	
	@RequestMapping("/api/topics/{id}")
	public Optional<Topics> getSingleId(@PathVariable String id) { //Path variable is used to map the id into the parameter of the getSingleId
		return topics.getSingleTopic(id);				 //in order to know that it refers to the id of url path in function
	}
	
	//Post method to create an topic object that will be added to the list once the URL path
	//is hit from postman app of chrome.
	
	@RequestMapping(method=RequestMethod.POST,value="/api/topics")
	public void addTopic(@RequestBody Topics topic) { //Convert JSON directly by spring to topic object automatically ..i.e. speciality of spring
		topics.addTopic(topic);
	}
	
	//Put method to update the content of topics object based on id passed in url path
	@RequestMapping(method=RequestMethod.PUT,value="/api//topics/{id}")
	public void updateTopic(@RequestBody Topics topic,@PathVariable String id) {
		topics.updateTopic(topic,id);
	}
	
	@RequestMapping(method=RequestMethod.DELETE,value="/api/topics/{id}")
	public void deleteTopic(@PathVariable String id) {
		topics.deleteTopic(id);
	}
}
