import React from 'react'

const AuxilaryComponent = WrappedComponent => {
  class HOC extends React.Component {
    render() {
      return <WrappedComponent />
    }
  }
  return HOC
}

export default AuxilaryComponent;