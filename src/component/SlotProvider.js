import React from "react"
import PropTypes from "prop-types"

function getDisplayName(component) {
  return component.displayName || component.name || 'component'
}

const slotProviderHoC = (WrappedComponent) => {
  return class extends React.Component {
    static displayName = `SlotProvider(${getDisplayName(WrappedComponent)})`

    static childContextTypes = {
      requestAddOnRenderer: PropTypes.func
    }

    // 用于缓存每个<AddOn />的内容
    addOnRenderers = {}

    // 通过Context为子节点提供接口
    getChildContext() {
      const requestAddOnRenderer = (name) => {
        if (!this.addOnRenderers[name]) {
          return undefined
        }
        return () => (
          this.addOnRenderers[name]
        )
      }

      return {
        requestAddOnRenderer
      }
    }

    render() {
      console.log(this.props)
      const {
        children,
        ...restProps
      } = this.props
      if (children) {
        // 以k-v的方式缓存<AddOn />的内容
        const arr = React.Children.toArray(children);
        console.log(arr)
        const nameChecked = []
        this.addOnRenderers = {}
        arr.forEach(item => {
          const itemType = item.type
          if (itemType.displayName === 'AddOn') {
            const slotName = item.props.slot || '$$default'
            // 确保内容唯一性
            if (nameChecked.findIndex(item => item === slotName) !== -1) {
              throw new Error(`Slot(${slotName}) has been occupied`)
            }
            this.addOnRenderers[slotName] = item.props.children
            nameChecked.push(slotName)
          }
        })
      }

      return (<WrappedComponent {...restProps} />)
    }
  }
}

export const SlotProvider = slotProviderHoC;
