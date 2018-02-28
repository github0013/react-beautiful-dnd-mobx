import { DroppableProvided, DroppableStateSnapshot } from "react-beautiful-dnd"

export interface ItemProps {
  id: string
  content: string
}

export interface DraggableInternalProps {
  items: ItemProps[]
  provided: DroppableProvided
  snapshot: DroppableStateSnapshot
}
