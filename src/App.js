import React, { Component } from "react";
import Header from "./Components/Header";
import List from "./Components/List";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      list: [
        {
          id: 1,
          value: "one",
          completed: false,
          content: "content for body note one"
        },
        {
          id: 2,
          value: "two",
          completed: false,
          content: "content for body note two"
        },
        {
          id: 3,
          value: "three",
          completed: true,
          content: "content for body note three"
        },
        {
          id: 4,
          value: "four",
          completed: false,
          content: "content for body note four"
        }
      ],
      filtered: [],
      trash: [],
      layout: false,
      editingItem: 0
    };
  }

  componentDidMount() {
    this.setState({
      filtered: this.state.list
    });
  }

  /**==============================================================
   * reorder()
   * Saves reorder state
   ================================================================*/
  reorder = (e) => {
    this.setState({
      filtered: e
      /*list: e*/
    });
  };

  /**==============================================================
   * filterList()
   * Search/filters user input
   ================================================================*/
  filterList = (e) => {
    document.getElementById("closeIcon").style.display = "inline-block";
    const searchVal = e.target.value.toLowerCase();
    //const orginalList = this.state.list;

    let newList = this.state.filtered
      .filter((x) => x.value.toLowerCase().includes(searchVal))
      .map((str) => {
        return str;
      });

    if (searchVal.length < 1) {
      console.log("emptyi");
      /* newList = orginalList;
      document.getElementById("closeIcon").style.display = "none";*/
      this.clearSearch();
    } else {
      if (newList.length < 1) {
        newList = [{ id: 0, value: "No Items Found" }];
      }
      this.setState({
        filtered: newList
      });
    }
  };

  /**==============================================================
   * clearSearch()
   * resets search input and state
   ================================================================*/
  clearSearch = (s) => {
    console.log(this.state.list);
    document.getElementById("closeIcon").style.display = "none";
    document.getElementById("SearhBox").value = "";
    this.setState({
      filtered: this.state.list
    });
  };

  /**==============================================================
   * completeItem()
   * Marks item as complete
   ================================================================*/
  completeItem = (e) => {
    const oldList = this.state.filtered;
    let index = oldList.findIndex((el) => {
      return el.id === e.id;
    });

    oldList[index].completed = !oldList[index].completed;

    this.setState({
      filtered: oldList
    });
  };

  /**==============================================================
   * addListItem()
   * 
   ================================================================*/
  addListItem = (e) => {
    //list items
    let list = this.state.filtered;

    //if key pressed and not enter key then return
    if (e.key && e.key !== "Enter") {
      return;
    }

    /**
     * create new object
     * gets the highest id in the list items and adds 1
     **/
    let newItem = {
      //id: Math.random(),
      id: Math.max.apply(
        Math,
        this.state.list.map(function (o) {
          return o.id + 1;
        })
      ),
      value: document.getElementById("addInput").value,
      completed: false
    };

    //add the new item obj to the list
    list.push(newItem);

    //set the state
    this.setState({
      addListItem: list
    });
    //empty the input box
    document.getElementById("addInput").value = "";
  };

  /**==============================================================
   * removeItem()
   ================================================================*/
  removeItem = (e) => {
    const oldList = this.state.filtered;
    let t = oldList.findIndex((el) => {
      return el.id === e.id;
    });

    let obj = { id: e.id, title: oldList[t].value };
    this.state.trash.push(obj);

    //console.log(this.state.trash);

    oldList.splice(
      oldList.findIndex((el) => {
        return el.id === e.id;
      }),
      1
    );

    // Set state to list
    this.setState({
      filtered: oldList
    });
  };

  /**==============================================================
  * ChangeLayout()
  ================================================================*/
  ChangeLayout = () => {
    Array.from(document.getElementsByClassName("list-group-item")).map((r) =>
      r.classList.toggle("grid-square")
    );

    if (this.state.layout === true) {
      document.getElementById("toggle").classList.add("fa-th");
      document.getElementById("toggle").classList.remove("fa-th-list");
    } else {
      document.getElementById("toggle").classList.add("fa-th-list");
      document.getElementById("toggle").classList.remove("fa-th");
    }

    //let t = (this.state.layout = !this.state.layout);

    /*this.setState({
      layout: (this.state.layout = !this.state.layout)
    });*/
  };

  /**==============================================================
  * editItem()
  * 
  * Sets the state for the current item being edited to the ID of the
  * list item that was clicked. the ID is passed in as a bound prop
  * to thie function. 
  ================================================================*/
  editItem = (e) => {
    this.setState({
      editingItem: e.id
    });
  };
  /*-------------------- end editItem() ----------------------*/

  cancelEdit = () => {
    this.setState({
      editingItem: 0
    });
    //console.log(this.state.editingItem);
  };

  /**
   * saveItem()
   *
   * @param {*object} e
   */
  saveItem = (e) => {
    let id = e[1].id;
    let newContent = e[1].content;

    //left off here we need to do the same thing for the title that we did with the content

    //if content lenth then set it to the passed in content from the list compnent
    //else dont set content so it remains the same. important cause it will set
    //content to "".
    if (e[0].length) {
      newContent = e[0];
    }

    const oldList = this.state.filtered;
    //get the index of the item in the array
    let t = oldList.findIndex((el) => {
      return el.id === id;
    });

    //update the content obj value
    oldList[t].content = newContent;

    // Set state to list
    this.setState({
      filtered: oldList
    });

    //cancel editing
    this.cancelEdit();
  };

  handleChange = (e) => {
    this.setState({ NewListItemInput: e.target.value });
  };

  render() {
    return (
      <div className="content">
        <Header items={this.state.list} delete={this.removeItem} />
        <div className="container">
          <section className="section">
            <List
              items={this.state.filtered}
              removeItem={this.removeItem}
              saveItem={this.saveItem}
              filterList={this.filterList}
              clearSearch={this.clearSearch}
              addListItem={this.addListItem}
              completeItem={this.completeItem}
              reorder={this.reorder}
              layout={this.ChangeLayout}
              editItem={this.editItem}
              editingItem={this.state.editingItem}
              cancelEdit={this.cancelEdit}
            />
          </section>
          <hr />
          <section className="section">
            <input
              ref="test"
              type="text"
              className="input"
              id="addInput"
              placeholder="Add new list item"
              onKeyDown={this.addListItem}
              onChange={this.handleChange}
            />
            <button
              className="button is-info"
              ref="rest"
              onClick={this.addListItem}
            >
              Add Item
            </button>
          </section>
        </div>
      </div>
    );
  }
}
export default App;
