package com.aimprosoft.reactApp.model.request;

import com.aimprosoft.reactApp.model.Card;
import lombok.Data;

@Data
public class AddUpdateLane {

    private String laneId;
    private Card card;

}
