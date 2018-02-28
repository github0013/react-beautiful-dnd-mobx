import * as React from "react"
import { Draggable } from "react-beautiful-dnd"
import { CSSProperties } from "react"
import { DraggableInternalProps, ItemProps } from "./interfaces"

import { observer } from "mobx-react"
@observer
export default class DraggableInternal extends React.Component<
  DraggableInternalProps,
  {}
> {
  draggingDropPointCss(isDraggingOver): CSSProperties {
    return {
      background: isDraggingOver ? "lightblue" : "lightgrey"
    }
  }

  draggingItemCss(isDragging: boolean, draggableStyle): CSSProperties {
    return {
      background: isDragging ? "lightgreen" : "grey",
      ...draggableStyle
    }
  }

  render() {
    const { provided, snapshot, items } = this.props
    return (
      <div
        ref={provided.innerRef}
        className="drop-point"
        style={this.draggingDropPointCss(snapshot.isDraggingOver)}
      >
        {items.map((item: ItemProps, index) => (
          <Draggable key={item.id} draggableId={item.id} index={index}>
            {(provided, snapshot) => (
              <div>
                <div
                  ref={provided.innerRef}
                  {...provided.draggableProps}
                  {...provided.dragHandleProps}
                  className="item"
                  style={this.draggingItemCss(
                    snapshot.isDragging,
                    provided.draggableProps.style
                  )}
                >
                  {item.content}
                </div>
                {provided.placeholder}
              </div>
            )}
          </Draggable>
        ))}
        {provided.placeholder}
      </div>
    )
  }
}
