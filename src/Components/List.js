import React from "react";
import ListItem from "./ListItem.js";
import PropTypes from "prop-types";
import { ReactSortable } from "react-sortablejs";
//const SortableOptions = [{ option: "forceFallback", value: "true" }];

class List extends React.Component {
  constructor(props) {
    super(props);
    this.getData = this.getData.bind(this);
  }

  dragging = (evt) => {
    //evt.oldIndex; // element index within parent
    let t = document.getElementsByClassName("dragHandle");
    t[evt.oldIndex].style.cursor = "grabbing";
  };

  onEnd = (evt) => {
    //var itemEl = evt.item; // dragged HTMLElement
    /*   evt.to; // target list
    evt.from; // previous list
    evt.oldIndex; // element's old index within old parent
    evt.newIndex; // element's new index within new parent
    evt.oldDraggableIndex; // element's old index within old parent, only counting draggable elements
    evt.newDraggableIndex; // element's new index within new parent, only counting draggable elements
    evt.clone; // the clone element
    evt.pullMode; // when item is in another sortable: `"clone"` if cloning, `true` if moving
   */
    let t = document.getElementsByClassName("dragHandle");
    t[evt.newIndex].style.cursor = "grab";
  };

  getData(val) {
    this.props.sendData(val);
  }

  render() {
    return (
      <div>
        <div className="text-right" />
        <input
          type="text"
          className="input"
          //onChange={this.filterList}
          onChange={this.props.filterList}
          placeholder="Search..."
          id="SearhBox"
        />
        <i id="toggle" className="fas fa-th" onClick={this.props.layout} />
        <i
          /*onClick={this.clearSearch}*/ onClick={this.props.clearSearch}
          id="closeIcon"
          className="fas fa-times"
        />

        <ul className="list-group">
          <ReactSortable
            list={this.props.items}
            //setList={newState => this.setState({ filtered: newState })}
            setList={this.props.reorder.bind(this)}
            group="groupName"
            animation={200}
            delayOnTouchStart={true}
            delay={2}
            handle=".dragHandle"
            touchStartThreshold="4"
            ghostClass="ghost"
            chosenClass="chosen"
            forceFallback="true"
            onStart={this.dragging}
            onEnd={this.onEnd}
            dragClass="dragging"
          >
            {this.props.items.map((item) => (
              <ListItem
                item={item}
                removeItem={this.props.removeItem}
                editItem={this.props.editItem}
                key={item.id}
                completeItem={this.props.completeItem}
                editingItem={this.props.editingItem}
                cancelEdit={this.props.cancelEdit}
                saveItem={this.props.saveItem}
                sendData={this.getData}
              />
            ))}
          </ReactSortable>
        </ul>
      </div>
    );
  }
}

//proptypes
List.propTypes = {
  items: PropTypes.array.isRequired
};

export default List;
