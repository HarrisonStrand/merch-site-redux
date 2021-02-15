import React from "react";
import Item from "./Item";
import PropTypes from 'prop-types';

function ItemList(props) {
	return (
		<>
			<hr/>
			{Object.values(props.itemList).map((item) =>
				<Item
					whenItemClicked = { props.onItemSelection }
					whenCategoryClicked = {props.onFilterByCategory}
					category = {item.category}
					name = {item.name}
					description = {item.description}
					quantity = {item.quantity}
					id={item.id}
					key = {item.id} />
					)}
		</>
	);
}

ItemList.propTypes = {
  itemList: PropTypes.object,
	onItemSelection: PropTypes.func,
	onFilterByCategory: PropTypes.func
};

export default ItemList;