package com.aimprosoft.reactApp.model;


import lombok.Data;
import org.springframework.data.annotation.Id;

import java.io.Serializable;
import java.util.List;

@Data
public class Lane implements Serializable {

    @Id
    private String _id;
    private String id;
    private String title;
    private String label;
    private List<Card> cards;


    public Lane() {
    }

    public Lane(String id, String _id, String title, String label, List<Card> cards) {
        this._id = _id;
        this.id = id;
        this.title = title;
        this.label = label;
        this.cards = cards;
    }
}
