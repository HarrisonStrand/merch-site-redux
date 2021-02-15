export default (state = {}, action) => {
	const { category, name, description, quantity, id } = action;
	switch (action.type) {
		case 'ADD_ITEM':
			return Object.assign({}, state, {
				[id]: {
					category: category,
					name: name,
					description: description,
					quantity: quantity,
					id: id
				}
			});
    case 'DELETE_ITEM':
      let newState = {...state};
      delete newState[id];
      return newState;
			default:
				return state;
	}
};