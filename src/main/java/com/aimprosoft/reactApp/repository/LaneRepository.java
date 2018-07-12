package com.aimprosoft.reactApp.repository;

import com.aimprosoft.reactApp.model.Lane;
import org.springframework.data.mongodb.repository.MongoRepository;


public interface LaneRepository extends MongoRepository<Lane, String> {

//    public Lane findByFirstName(String firstName);
//
//    public List<Lane> findByLastName(String lastName);


}