package io.javabrains.springbootstarter.topics;

import org.springframework.data.repository.CrudRepository;


public interface TopicRepository extends CrudRepository<Topics,String> {

	//CrudRepository is an interface which contain all the methods i.e. update,delete,create
	//insert which is required for topic instance to perform DML manipulation in SQL.
	
}
