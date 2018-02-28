# react-beautiful-dnd-mobx

When to use mobx + react-beautiful-dnd, it doesn't work as expected if you just copy their sample.

## their sample

```jsx
  render() {
    return (
      <DragDropContext onDragEnd={this.onDragEnd}>
        <Droppable droppableId="droppable" direction="horizontal">
          {(provided, snapshot) => (
            <div
              ref={provided.innerRef}
              style={getListStyle(snapshot.isDraggingOver)}
              {...provided.droppableProps}
            >
              {this.state.items.map((item, index) => (
                <Draggable key={item.id} draggableId={item.id} index={index}>

```

## you would chage like this for mobx (this won't work properly) 

```jsx

  @mobx.observable items = [{id: "...", content: "..."}]

...
...


  render() {
    return (
      <DragDropContext onDragEnd={this.onDragEnd}>
        <Droppable droppableId="droppable" direction="horizontal">
          {(provided, snapshot) => (
            <div
              ref={provided.innerRef}
              style={getListStyle(snapshot.isDraggingOver)}
              {...provided.droppableProps}
            >
              {
                // mobx observable object here
              }
              {this.items.map((item, index) => (
                <Draggable key={item.id} draggableId={item.id} index={index}>

```

The problem here is `this.items` (mobx observable object) is in a function call `(provided, snapshot) => ()`.  When this function is called, `this.items` is not being observed, so that it breaks the react cycles.


## solution
https://github.com/atlassian/react-beautiful-dnd/issues/156  

Extract the function call content into a class, and add `@observer` to it.  
https://github.com/github0013/react-beautiful-dnd-mobx/blob/master/src/DraggableInternal.tsx#L7  
Then call the component with props. * `items={this.items.dropPointA}` is mobx observable object  
https://github.com/github0013/react-beautiful-dnd-mobx/blob/master/src/App.tsx#L49  

