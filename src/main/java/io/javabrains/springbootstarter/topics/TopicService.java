package io.javabrains.springbootstarter.topics;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

//@Service is a business service which is being initialized or instance is being created by
//spring framework and is being registered and will be available by the class who invokes it
//by marking the annotation to the properties as autowired i.e. called dependency injection.
@Service
public class TopicService {
	
	@Autowired
	private TopicRepository topicRepository;
	
	private List<Topics> topics = new ArrayList<>(Arrays.asList(
				new Topics("Spring","Spring Framework","Spring Framework Description"),
				new Topics("Java","Core Java","Core Java Description"),
				new Topics("Javascript","Javascript","Javascript Description")
				));
	
	public List<Topics> getAllTopics(){
		List<Topics> topics = new ArrayList<>();
		topicRepository.findAll()
		.forEach(topics::add);
		return topics;
	}
	
	public Optional<Topics> getSingleTopic(String id) {
		//return topics.stream().filter(t->t.getId().equals(id)).findFirst().get();
		return topicRepository.findById(id);
	
	}

	public void addTopic(Topics topic) {
		// TODO Auto-generated method stub
		topicRepository.save(topic);
	}

	public void updateTopic(Topics topic, String id) {
		// TODO Auto-generated method stub
		topicRepository.save(topic);
	}

	public void deleteTopic(String id) {
		// TODO Auto-generated method stub
		topicRepository.deleteById(id);
		
	}
}
