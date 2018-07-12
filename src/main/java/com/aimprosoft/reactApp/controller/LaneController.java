package com.aimprosoft.reactApp.controller;

import com.aimprosoft.reactApp.model.Card;
import com.aimprosoft.reactApp.model.Lane;
import com.aimprosoft.reactApp.model.request.AddUpdateLane;
import com.aimprosoft.reactApp.repository.LaneRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Objects;
import java.util.Optional;
import java.util.stream.Collectors;

@RestController
public class LaneController {

    @Autowired
    private LaneRepository repository;

    @GetMapping("/lanes")
    public List<Lane> lanes() {
        return repository.findAll();
    }

    @RequestMapping(value = "/saveCard", method = RequestMethod.POST)
    public String saveOrUpdateCard(@RequestBody AddUpdateLane req) {

        try {

            Optional<Lane> lane = repository.findById(req.getLaneId());
            if (!lane.isPresent()) return "KO";
            Lane persistedLane = lane.get();
            List<Card> cards = persistedLane.getCards();
            List<Card> newCards;
            Optional<Card> newCard = cards.stream()
                    .filter(c -> Objects.equals(c.getId(), req.getCard().getId())).findFirst();

            if (newCard.isPresent()) {
                newCards = cards.stream()
                        .map(c -> {
                            c.setId(req.getCard().getId());
                            c.setTitle(req.getCard().getTitle());
                            c.setLabel(req.getCard().getLabel());
                            c.setDescription(req.getCard().getDescription());
                            c.setPriority(req.getCard().getPriority());
                            return c;
                        })
                        .collect(Collectors.toList());
            } else {
                cards.add(req.getCard());
                newCards = cards;
            }

            persistedLane.setCards(newCards);
            repository.save(persistedLane);
            return "OK";
        } catch (Exception e) {
            return "KO";
        }
    }

}
