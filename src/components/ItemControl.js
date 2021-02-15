import React from 'react';
import NewItemForm from './NewItemForm';
import ItemList from './ItemList';
import ItemDetail from './ItemDetail';
import EditItemForm from './EditItemForm';
import PropTypes from "prop-types";

// We add connect functionality to our file that already contains state
import { connect } from 'react-redux';
import Item from './Item';

class ItemControl extends React.Component {

	constructor(props) {
		super(props);
		this.state = {
			formVisibleOnPage: false,
			selectedItem: null,
			editing: false
		};
	}

	// using dispatch links the state handling (function below) to our reducer to handle the action of the function
	// what is happening below is matching the state to the reducer through the action
	// In both cases, we deconstruct this.props to get the dispatch function.
	// If necessary, we deconstruct any objects that need to be used in the action. (We do this for editing a ticket but not for deleting a ticket since deleting a ticket only needs an id in addition to the action's type.)
	// Next, we define the action itself. Defining all these actions may not seem very DRY, but we'll learn a nifty technique to clean our actions up in a future lesson.
	// Once the action is defined, we can dispatch() it.
  handleAddingNewItemToList = (newItem) => {
    const { dispatch } = this.props;
    const { category, name, description, quantity, id } = newItem;
    const action = {
      type: 'ADD_ITEM',
			category: category,
			name: name,
			description: description,
			quantity: quantity,
			id: id
    }
    dispatch(action);
    this.setState({formVisibleOnPage: false});
  }

	handleChangingSelectedItem = (id) => {
    const selectedItem = this.props.masterItemList[id];
    this.setState({selectedItem: selectedItem});
  }

	handleDeletingItem = (id) => {
		const { dispatch } = this.props;
		const action = {
			type: 'DELETE_ITEM',
			id: id
		}
		dispatch(action);
		this.setState({selectedItem: null});
	}

	handleEditClick = () => {
		this.setState({editing: true});
	}

	// we use ADD_ITEM to edit our Item as well. 
	//if it's a new id, the item will be added to the list, if the id already exists, the existing item will be replaced
	handleEditingItemInList = (itemToEdit) => {
		const { dispatch } = this.props;
		const { id, category, name, description, quantity } = itemToEdit;
		const action = {
			type: 'ADD_ITEM',
			id: id,
			category: category,
			name: name,
			description: description,
			quantity: quantity
		}
		dispatch(action);
		this.setState({
			editing: false,
			selectedItem: null
		});
	}

	handlePurchasingItemInList = () => {
		const selectedItem = this.state.selectedItem; // selects Item that is currently selected and viewed in the details page
		const newQuantity = Object.assign({}, selectedItem, {quantity: selectedItem.quantity - 1}); // targets the selectedItem and its quantity, and assigns it the new quantity
		const newItemList = this.state.masterItemList
			.filter(item => item.id !== this.state.selectedItem.id)
			.concat(newQuantity); // updates the Item list
		this.setState({ 
				masterItemList: newItemList,
				selectedItem: newQuantity
		});
}

	handleClick = () => {
			if (this.state.selectedItem != null) {
				this.setState({
					formVisibleOnPage: false,
					selectedItem: null,
					editing: false
				});
			} else {
					this.setState(prevState => ({
				formVisibleOnPage: !prevState.formVisibleOnPage
			}));
		}
	}

	render(){
		let currentlyVisibleState = null;
		let buttonText = null;
		if (this.state.editing ) {      
			currentlyVisibleState = 
			<EditItemForm 
			item = {this.state.selectedItem}
			onEditItem = {this.handleEditingItemInList}/>
			buttonText = "Return to Item List";
		} else if (this.state.selectedItem != null) {
			currentlyVisibleState = 
			<ItemDetail
				item = {this.state.selectedItem} 
				onClickingDelete = {this.handleDeletingItem}
				onClickingEdit = {this.handleEditClick} 
				onClickingPurchase = {this.handlePurchasingItemInList}/>
				buttonText = "Return to Item List";
		} else if (this.state.formVisibleOnPage) {
				currentlyVisibleState = <NewItemForm 
				onNewItemCreation = {this.handleAddingNewItemToList}
				onEditItem = {this.handleEditingItemInList}/>
				buttonText = "Return to Item List";
    } else {
				currentlyVisibleState = <ItemList 
				itemList = {this.props.masterItemList}
				onItemSelection={this.handleChangingSelectedItem}/>;
				buttonText = "Add Item";
    }
		return (
			<>
			{currentlyVisibleState}
			<button onClick={this.handleClick}>{buttonText}</button>
			</>
		)
	}
}

ItemControl.propTypes = {
	masterItemList: PropTypes.object
}

// we define how the mapStateToProps function should look
// It will always have the folling format
const mapStateToProps = state => {
	return {
		// Key-value pairs of state to be mapped from Redux to React component go here.
		masterItemList: state
	}
}
// Then we need to pass our newly-defined mapStateToProps function into the connect() function:
// This ensures the ItemControl component has the mapStateToProps functionality when connect() redefines the component.

// connect() redefines our entire ItemControl component as a new ItemControl component with additional functionality included
// this adds useful tools like dispatch() and mapStateToProps()
// connect is a higher-order-component. It takes an existing component and returns it so it can be used elsewhere in an application.
// connect gives us the ability to deconstruct props with dispatch to add, edit, and delete items.
ItemControl = connect(mapStateToProps)(ItemControl);

export default ItemControl;