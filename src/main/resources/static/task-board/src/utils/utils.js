export const deleteLaneCards = (laneId, cardId, lane) => {
    if (lane.id == laneId) {
        lane.cards = lane.cards.filter(card => card.id !== cardId);
    }
    return lane;
};

export const moveLaneCards = (newLane, lane) => {
    if (lane.id !== newLane.laneId) return lane;
    lane.cards = newLane.cards;
    return lane;
};
export const filterLaneCards = (filter, lane) => {
    if (!filter) return lane;
    lane.cards = lane.cards.filter(laneCard => laneCard.title.toUpperCase().includes(filter.toUpperCase()));
    return lane;
};

export const getCardToUpdate = (laneId, cardId, lanes) => {
    const lane = lanes.find(lane => lane.id === laneId);
    let card = {};
    if (lane) {
        card = lane.cards.find(card => card.id === cardId);
    }

    return card;
};

export const addOrUpdateLaneCard = (laneId, cardId, card, lane) => {
    if (lane.id == laneId) {
        lane.cards = [...lane.cards.filter(laneCard => laneCard.id !== cardId), card];
    }
    return lane;
};

export const validate = values => {
    const errors = {};
    if (!values.id) {
        errors.id = 'Required'
    }
    if (!values.title) {
        errors.title = 'Required'
    }
    if (!values.priority) {
        errors.priority = 'Required'
    }
    if (values.priority) {
        if (!isNumber(values.priority)) {
            errors.priority = 'Is not a number'
        }
    }
    return errors
};

const isNumber = number => {
    return !isNaN(parseFloat(number)) && isFinite(number);
};