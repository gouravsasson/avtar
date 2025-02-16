import React from 'react'
import { DailyProvider, useCallObject } from '@daily-co/daily-react'
import { createStore, Provider } from 'jotai';
import Video from './component/Video';

function App() {
  const jotaiStore = createStore();
  const callObject = useCallObject();
  
  return (
    <Provider store={jotaiStore}>
      <DailyProvider callObject={callObject} jotaiStore={jotaiStore}>
        <Video />
      </DailyProvider>
    </Provider>
  )
}

export default App