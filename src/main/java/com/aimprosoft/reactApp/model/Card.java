package com.aimprosoft.reactApp.model;

import lombok.Data;
import org.springframework.data.annotation.Id;

import java.io.Serializable;

@Data
public class Card implements Serializable {

    @Id
    private String _id;
    private String id;
    private String title;
    private String label;
    private String description;
    private Integer priority;

    public Card() {
    }

    public Card(String id, String title, String label, String description, Integer priority) {
        this.id = id;
        this.title = title;
        this.label = label;
        this.description = description;
        this.priority = priority;
    }
}
