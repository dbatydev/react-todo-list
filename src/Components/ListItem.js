import React from "react";
import PropTypes from "prop-types";
import EditListItem from "./editListItem.js";

class ListItem extends React.Component {
  getStyle = () => {
    return {
      textDecoration: this.props.item.completed ? "line-through" : "none",
      opacity: this.props.item.completed ? "0.4" : "1",
      background: this.props.item.completed ? "whitesmoke" : "white"
    };
  };

  constructor(props) {
    super(props);

    this.state = {
      newContent: ""
    };

    this.getData = this.getData.bind(this);
  }

  getData(val) {
    //console.log("the parent" + val);
    this.setState({
      newContent: val
    });
  }

  render() {
    return (
      <li
        style={this.getStyle()}
        data-menu-item={this.props.item.id}
        id={`menu-item-${this.props.item.id}`}
        className="list-group-item"
        key={this.props.item.id}
      >
        <span>
          <i className="dragHandle fas fa-ellipsis-v " />
        </span>
        <span id={`menu-item-value-${this.props.item.id}`}>
          {this.props.item.value}
        </span>
        <div className="text-right">
          <i
            className={
              this.props.item.completed
                ? "far fa-check-square"
                : "far fa-square"
            } /*"far fa-check-square"*/
            onClick={this.props.completeItem.bind(this, this.props.item)}
          />
          <i
            className="far fa-trash-alt"
            onClick={this.props.removeItem.bind(this, this.props.item)}
          />

          <i
            id=""
            className="fas fa-pencil-alt"
            onClick={this.props.editItem.bind(this, this.props.item)}
            //onClick={this.handleClick}
          />

          {this.props.editingItem === this.props.item.id ? (
            <i
              onClick={this.props.saveItem.bind(this, [
                this.state.newContent,
                this.props.item
              ])}
              className="fas fa-save"
            ></i>
          ) : null}

          {this.props.editingItem === this.props.item.id ? (
            <i
              onClick={this.props.cancelEdit.bind(this, this.props.item)}
              className="fas fa-times"
            ></i>
          ) : null}
        </div>
        <div>
          {this.props.editingItem === this.props.item.id ? (
            <EditListItem sendData={this.getData} item={this.props} />
          ) : null}
        </div>
      </li>
    );
  }
}
//proptypes
ListItem.propTypes = {
  item: PropTypes.object.isRequired
};

export default ListItem;
