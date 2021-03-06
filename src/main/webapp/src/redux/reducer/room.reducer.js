// @flow
import type {
  AddPlayerAction,
  JoinRoomAction,
  RoomAction,
  ValidateRoomAction,
  ValidateRoomFailedAction,
} from '../action/room.action'
import {
  ADD_PLAYER,
  JOIN_ROOM,
  VALIDATE_ROOM,
  VALIDATE_ROOM_FAILED,
} from '../action/room.action'

import type { Player } from '../../domain/Player.type'

export type RoomState = {
  +uuid: string,
  +name: string,
  +validated: boolean,
  +validateError: string,
  +players: Player[],
}

export const initialRoomState: RoomState = {
  uuid: '',
  name: '',
  validated: false,
  validateError: '',
  players: [],
}

export default (
  state: RoomState = initialRoomState,
  action: RoomAction
): RoomState => {
  switch (action.type) {
    case VALIDATE_ROOM:
      return {
        ...state,
        validated: false,
      }
    case VALIDATE_ROOM_FAILED:
      const validateRoomFailedAction = ((action: any): ValidateRoomFailedAction)

      return {
        ...state,
        uuid: validateRoomFailedAction.uuid,
        validateError: VALIDATE_ROOM_FAILED,
      }
    case JOIN_ROOM:
      const joinRoomAction = ((action: any): JoinRoomAction)

      return {
        ...state,
        uuid: joinRoomAction.uuid,
        name: joinRoomAction.name,
        validated: true,
      }
    case ADD_PLAYER:
      const addPlayerAction = ((action: any): AddPlayerAction)
      const { id, name } = addPlayerAction

      const newPlayers = state.players.slice()
      newPlayers.push({ id, name })
      newPlayers.sort((a: Player, b: Player) => a.id - b.id)

      return {
        ...state,
        players: newPlayers,
      }
    default:
      return state
  }
}
