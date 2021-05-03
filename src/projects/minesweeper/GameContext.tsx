import React from 'react'
import GameBoard from './Model'
import * as config from './config'

const Context = React.createContext(new GameBoard(config.Rows, config.Columns, config.Bombs))

export const Provider = Context.Provider
export const useBoard = () => React.useContext(Context)