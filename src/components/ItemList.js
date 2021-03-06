import React from "react";
import Item from "./Item";
import PropTypes from 'prop-types';


function ItemList(props) {

	let itemArr = [];
	
	for (const item in props.itemList) {
		if (props.filterVar === 'ALL') {
			itemArr.push(props.itemList[item]);
		} else if (props.itemList[item].category === props.filterVar) {
			itemArr.push(props.itemList[item]);
		}
	}

	return (
		<>
			<div className = "itemList">
			<button className= 'btn btn-info' onClick={() => props.changeFilterType('SHIRT') }>Shirts</button>
			<button className= 'btn btn-info' onClick={() => props.changeFilterType('POSTER') }>Posters</button>
			<button className= 'btn btn-info' onClick={() => props.changeFilterType('VINYL') }>Vinyl</button>
			<button className= 'btn btn-info' onClick={() => props.changeFilterType('ALL') }>See All Items</button>
			<hr/>
			{Object.values(itemArr).map((item) =>
				<Item
					whenItemClicked = { props.onItemSelection }
					category = {item.category}
					name = {item.name}
					description = {item.description}
					quantity = {item.quantity}
					id={item.id}
					key = {item.id} />
					)}
					</div>
		</>
	);
}


ItemList.propTypes = {
  itemList: PropTypes.object,
	onItemSelection: PropTypes.func,
	changeFilterType: PropTypes.func,
	filterVar: PropTypes.string
};

export default ItemList;