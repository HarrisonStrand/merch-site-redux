import itemListReducer from '../../reducers/item-list-reducer';

describe('itemListReducer', () => {

  const currentState = {
    1: {category: 'vinyl',
    name: 'album one',
    description: 'it is an album',
    quantity: 25,
    id: 1 },
    2: {category: 'vinyl',
    name: 'album two',
    description: 'it is also an album',
    quantity: 30,
    id: 2 }
  } 

	let action;
	const itemData = {
		category: 'shirt',
		name: 'main logo',
		description: 'band shirt 1',
		quantity: 50,
		id: 1
	};

  test('Should return default state if there is no action type passed into the reducer', () => {
    expect(itemListReducer({}, { type: null })).toEqual({});
  });

	test('Should successfully add a new Item data to masterItemList', () => {
		const { category, name, description, quantity, id } = itemData;
		action = {
			type: 'ADD_ITEM',
			category: category,
			name: name,
			description: description,
			quantity: quantity,
			id: id
		};

		expect(itemListReducer({}, action)).toEqual({
			[id] : {
				category: category,
				name: name,
				description: description,
				quantity: quantity,
				id: id
			}
		});
	});

  test('Should succesfully delete an item', () => {
    action = {
      type: 'DELETE_ITEM',
      id: 1
    };
    expect(itemListReducer(currentState, action)).toEqual({
      2: {category: 'vinyl',
      name: 'album two',
      description: 'it is also an album',
      quantity: 30,
      id: 2}
    });
  });

});