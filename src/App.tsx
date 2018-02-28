import * as React from "react"
import { DragDropContext, Droppable } from "react-beautiful-dnd"

import * as mobx from "mobx"
import { observer } from "mobx-react"

import DraggableInternal from "./DraggableInternal"

import "./App.scss"
@observer
export default class App extends React.Component {
  @mobx.observable
  items = {
    dropPointA: [
      { id: "1", content: "abcd" },
      { id: "2", content: "123" },
      { id: "3", content: "abcd123" }
    ],
    dropPointB: []
  }

  onDragEnd = result => {
    if (!result.destination) {
      // dropped outside the list
      return
    }

    const startIndex = result.source.index
    const endIndex = result.destination.index
    const sourceArray = this.items[result.source.droppableId]
    const destinationArray = this.items[result.destination.droppableId]
    const [removed] = sourceArray.splice(startIndex, 1)

    if (result.source.droppableId == result.destination.droppableId) {
      sourceArray.splice(endIndex, 0, removed)
      this.items[result.destination.droppableId] = sourceArray
    } else {
      destinationArray.splice(endIndex, 0, removed)
      this.items[result.source.droppableId] = sourceArray
      this.items[result.destination.droppableId] = destinationArray
    }
  }

  render() {
    return (
      <DragDropContext onDragEnd={this.onDragEnd}>
        <Droppable droppableId="dropPointA" direction="horizontal">
          {(provided, snapshot) => (
            <DraggableInternal
              items={this.items.dropPointA}
              provided={provided}
              snapshot={snapshot}
            />
          )}
        </Droppable>

        <Droppable droppableId="dropPointB">
          {(provided, snapshot) => (
            <DraggableInternal
              items={this.items.dropPointB}
              provided={provided}
              snapshot={snapshot}
            />
          )}
        </Droppable>
      </DragDropContext>
    )
  }
}
